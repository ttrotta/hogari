import { Leaf } from "lucide-react";

type MessageLeafProps = {
  content: string;
  author_name: string;
  created_at: string;
};

export function MessageLeaf({ content, author_name, created_at }: MessageLeafProps) {
  const date = new Date(created_at).toLocaleDateString("es-AR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="group flex items-start gap-3 rounded-2xl border border-orange-200/50 bg-white/80 px-5 py-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
      <Leaf className="mt-0.5 h-5 w-5 shrink-0 text-brand-orange" />
      <div className="min-w-0 flex-1">
        <p className="text-sm leading-relaxed text-gray-700">{content}</p>
        <div className="mt-2 flex items-center gap-2 text-xs text-gray-400">
          <span className="font-medium text-gray-500">{author_name}</span>
          <span>&middot;</span>
          <time dateTime={created_at}>{date}</time>
        </div>
      </div>
    </div>
  );
}
