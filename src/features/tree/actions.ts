"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { pool } from "@/lib/db/client";

export async function postMessage(formData: FormData) {
  const content = formData.get("content") as string;
  const authorName = (formData.get("author_name") as string) || "Anonymous";

  if (!content || content.trim().length === 0) {
    return { error: "El mensaje no puede estar vacío." };
  }

  if (content.length > 500) {
    return { error: "El mensaje es demasiado largo (máximo 500 caracteres)." };
  }

  const headerStore = await headers();
  const ip = headerStore.get("x-forwarded-for")?.split(",")[0]?.trim()
    || headerStore.get("x-real-ip")
    || "unknown";

  const client = await pool.connect();
  try {
    const { rows: recent } = await client.query(
      `SELECT created_at FROM tree_messages WHERE ip_address = $1 ORDER BY created_at DESC LIMIT 1`,
      [ip],
    );

    if (recent.length > 0) {
      const lastPosted = new Date(recent[0].created_at).getTime();
      const oneHour = 60 * 60 * 1000;
      if (Date.now() - lastPosted < oneHour) {
        return { error: "Solo puedes publicar un mensaje por hora." };
      }
    }

    await client.query(
      `INSERT INTO tree_messages (content, author_name, ip_address) VALUES ($1, $2, $3)`,
      [content.trim(), authorName.trim() || "Anonymous", ip],
    );

    revalidatePath("/complaint-tree");
    return { success: true };
  } catch (err) {
    console.error("Error posting tree message:", err);
    return { error: "Error al publicar el mensaje. Intentalo de nuevo." };
  } finally {
    client.release();
  }
}

export async function getMessages(): Promise<{ id: string; content: string; author_name: string; created_at: string }[]> {
  const client = await pool.connect();
  try {
    const { rows } = await client.query(
      `SELECT id, content, author_name, created_at FROM tree_messages ORDER BY created_at DESC LIMIT 50`,
    );
    return rows.map((r) => ({
      ...r,
      created_at: r.created_at.toISOString(),
    }));
  } catch (err) {
    console.error("Error fetching tree messages:", err);
    return [];
  } finally {
    client.release();
  }
}
