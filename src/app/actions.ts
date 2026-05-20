"use server";

import { Resend } from "resend";
import { z } from "zod";

const WaitlistSchema = z.object({
  email: z
    .string()
    .trim()
    .pipe(
      z.email({ error: "Por favor, ingresá un correo electrónico válido." }),
    ),
});

const resend = new Resend(process.env.RESEND_API_KEY);

export type ActionState = {
  success: boolean;
  message: string;
};

export async function subscribeToWaitlist(
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const validatedFields = WaitlistSchema.safeParse({
    email: formData.get("email") as string,
  });

  if (!validatedFields.success) {
    return {
      success: false,
      message: validatedFields.error.issues[0].message,
    };
  }

  const { email } = validatedFields.data;

  try {
    const { error: contactError } = await resend.contacts.create({
      email: email,
    });

    if (contactError) {
      console.error("Error al crear contacto:", contactError);
      return {
        success: false,
        message: `Error de Resend: ${contactError.message}`,
      };
    }

    // const { error: emailError } = await resend.emails.send({
    //   from: "Tu Proyecto <onboarding@resend.dev>",
    //   to: email,
    //   subject: "¡Ya estás en la lista de espera!",
    //   html: "<p>Gracias por sumarte. Te vamos a avisar apenas la plataforma esté 100% funcional y lista para buscar alquileres!. </p>",
    // });

    // if (emailError) {
    //   console.error("Error enviando email:", emailError);
    //   return {
    //     success: false,
    //     message: `Contacto guardado, pero falló el envío del mail: ${emailError.message}`,
    //   };
    // }

    return {
      success: true,
      message: "¡Gracias por anotarte!",
    };
  } catch (error) {
    console.error("Error fatal:", error);
    return {
      success: false,
      message: "Ocurrió un error inesperado en el servidor.",
    };
  }
}
