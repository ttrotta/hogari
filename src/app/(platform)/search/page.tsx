import { PropertyList } from "@/features/properties/components/PropertyList";
import { PropertyFilters } from "@/features/properties/components/PropertyFilters";
import { SearchBar } from "@/features/search/components/SearchBar";
import { MapView } from "@/features/map/components/MapView";

export default function SearchPage() {
  return (
    <div className="flex h-screen">
      {/* Left: Search + Property List */}
      <div className="flex w-full flex-col gap-4 overflow-y-auto p-6 md:w-1/2">
        <SearchBar />
        <PropertyFilters />
        <PropertyList />
      </div>

      {/* Right: Map */}
      <div className="hidden md:block md:w-1/2">
        <MapView />
      </div>
    </div>
  );
}
