import { TreeVisual } from "@/components/tree/TreeVisual";
import { MessageForm } from "@/components/tree/MessageForm";
import { MessageLeaf } from "@/components/tree/MessageLeaf";
import { getMessages } from "@/features/tree/actions";
import { TreePine, MessageCircle } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function ComplaintTreePage() {
  const messages = await getMessages();

  return (
    <div className="bg-section-warm min-h-screen">
      {/* Hero */}
      <section className="w-full px-6 pt-24 pb-12 text-center md:px-12 lg:pt-32 lg:pb-16">
        <div className="mx-auto max-w-3xl">
          <span className="text-primary-dark mb-4 inline-block text-sm font-bold tracking-widest uppercase">
            Comunidad
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
            Árbol de{" "}
            <span className="text-gradient-orange">Quejas</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-600">
            Un espacio para expresar lo que no funciona en el mundo inmobiliario.
            Cada queja es una hoja en este árbol. El pájaro escucha.
          </p>
        </div>
      </section>

      {/* Tree */}
      <section className="w-full px-6 pb-8 md:px-12">
        <TreeVisual />
      </section>

      {/* Messages */}
      <section className="w-full px-6 pb-16 md:px-12">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8 flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-brand-orange" />
            <h2 className="text-lg font-bold text-gray-900">
              Hojas en el árbol ({messages.length})
            </h2>
          </div>

          {messages.length === 0 ? (
            <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-orange-200/50 px-6 py-16 text-center">
              <TreePine className="h-10 w-10 text-orange-300" />
              <p className="text-sm text-gray-400">
                El árbol aún no tiene hojas. Sé el primero en dejar tu mensaje.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {messages.map((msg) => (
                <MessageLeaf
                  key={msg.id}
                  content={msg.content}
                  author_name={msg.author_name}
                  created_at={msg.created_at}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Form */}
      <section className="w-full bg-section-orange px-6 py-16 md:px-12">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-2 text-2xl font-extrabold tracking-tight text-gray-900">
            Agregá tu hoja
          </h2>
          <p className="mb-8 text-sm leading-relaxed text-gray-500">
            Compartí tu queja, frustración o crítica sobre el mercado inmobiliario.
            Un mensaje por hora.
          </p>
          <MessageForm />
        </div>
      </section>
    </div>
  );
}
