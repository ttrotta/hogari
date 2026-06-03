import { findPropertyById } from "@/features/properties/queries";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, MapPin, BedDouble, Bath, Maximize2, ExternalLink } from "lucide-react";
import { PropertyGallery } from "@/features/properties/components/PropertyGallery";
import { PropertyMap } from "@/features/properties/components/PropertyMap";

export default async function PropertyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const property = await findPropertyById(id);

  if (!property) {
    notFound();
  }

  const typeTranslation: Record<string, string> = {
    apartment: "Departamento",
    house: "Casa",
    ph: "PH",
    studio: "Monoambiente",
  };

  const formattedPrice =
    property.currency === "USD"
      ? `u$s ${property.price.toLocaleString()}`
      : `$ ${property.price.toLocaleString()}`;

  const formattedExpenses =
    property.expenses > 0
      ? property.currency === "USD"
        ? `u$s ${property.expenses.toLocaleString()}`
        : `$ ${property.expenses.toLocaleString()}`
      : "Sin expensas";

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 md:px-8">
      <div className="mb-4">
        <Link
          href="/search"
          className="hover:text-primary-dark inline-flex items-center gap-1 text-sm font-medium text-gray-500 transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
          Volver a la búsqueda
        </Link>
      </div>

      <div className="flex flex-col gap-6">
        <PropertyGallery imageUrls={property.imageUrls} title={property.title} />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="bg-primary-light text-primary-dark rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider">
                  {typeTranslation[property.propertyType] || property.propertyType}
                </span>
                <span className="bg-gray-100 text-gray-600 rounded-full px-3 py-1 text-xs font-medium">
                  Origen: {property.source}
                </span>
              </div>
              <h1 className="text-2xl font-extrabold text-gray-900 md:text-3xl leading-snug">
                {property.title}
              </h1>
              <div className="mt-2 flex items-center gap-1.5 text-sm text-gray-500">
                <MapPin className="h-4 w-4 shrink-0 text-gray-400" />
                <span>{property.address}, {property.neighborhood}</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 rounded-2xl border border-gray-100 bg-gray-50/50 p-4 text-center">
              <div className="flex flex-col items-center justify-center p-2">
                <BedDouble className="h-6 w-6 text-gray-500 mb-1" />
                <span className="text-sm font-bold text-gray-900">{property.rooms}</span>
                <span className="text-[11px] text-gray-400 font-medium uppercase tracking-wide">Ambientes</span>
              </div>
              <div className="flex flex-col items-center justify-center p-2 border-x border-gray-200/60">
                <Bath className="h-6 w-6 text-gray-500 mb-1" />
                <span className="text-sm font-bold text-gray-900">{property.bathrooms}</span>
                <span className="text-[11px] text-gray-400 font-medium uppercase tracking-wide">Baños</span>
              </div>
              <div className="flex flex-col items-center justify-center p-2">
                <Maximize2 className="h-6 w-6 text-gray-500 mb-1" />
                <span className="text-sm font-bold text-gray-900">{property.area} m²</span>
                <span className="text-[11px] text-gray-400 font-medium uppercase tracking-wide">Superficie</span>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-2">Descripción</h2>
              <div className="prose max-w-none text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                {property.description || "Sin descripción disponible."}
              </div>
            </div>

            {property.amenities && property.amenities.length > 0 && (
              <div>
                <h2 className="text-lg font-bold text-gray-900 mb-3">Comodidades y Servicios</h2>
                <div className="flex flex-wrap gap-2">
                  {property.amenities.map((amenity, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 hover:bg-gray-200 transition-colors text-gray-800 rounded-lg px-3 py-1.5 text-xs font-semibold"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-3">Ubicación</h2>
              <PropertyMap property={property} />
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-[88px] flex flex-col gap-4 rounded-3xl border border-gray-100 bg-white p-6 shadow-md">
              <div>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">Precio de Alquiler</span>
                <div className="text-3xl font-black text-gray-900 mt-1">{formattedPrice}</div>
              </div>

              <div className="border-t border-gray-100 pt-4 flex flex-col gap-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Expensas</span>
                  <span className="font-semibold text-gray-800">{formattedExpenses}</span>
                </div>
                {property.expenses > 0 && (
                  <div className="flex justify-between text-sm border-t border-gray-50 pt-2 font-bold text-gray-900">
                    <span>Total Estimado</span>
                    <span>
                      {property.currency === "USD" ? "u$s" : "$"}{" "}
                      {(property.price + property.expenses).toLocaleString()}
                    </span>
                  </div>
                )}
              </div>

              <a
                href={property.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary hover:bg-primary-dark text-white text-center font-bold py-3.5 px-4 rounded-xl shadow-xs transition-colors mt-4 flex items-center justify-center gap-2"
              >
                Ver publicación original
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
