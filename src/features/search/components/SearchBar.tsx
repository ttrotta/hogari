export function SearchBar() {
  return (
    <div className="relative w-full">
      {/* TODO: Natural language search input with autocomplete */}
      <input
        type="text"
        placeholder="Buscar por zona, universidad o dirección..."
        className="w-full rounded-full border border-gray-200 bg-white px-6 py-3 text-sm shadow-sm transition-shadow focus:shadow-md focus:outline-none"
      />
    </div>
  );
}
