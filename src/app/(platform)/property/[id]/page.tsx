export default function PropertyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // TODO: Fetch property by ID and render detail view
  void params;

  return (
    <div className="mx-auto max-w-4xl p-6">
      <h1 className="text-2xl font-bold text-gray-900">Detalle de propiedad</h1>
      <p className="mt-2 text-sm text-gray-400">
        Property detail page placeholder
      </p>
    </div>
  );
}
