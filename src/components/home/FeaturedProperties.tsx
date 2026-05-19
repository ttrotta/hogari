import { MapPin, BedDouble, Bath, Maximize } from "lucide-react";

const mockProperties = [
  {
    id: 1,
    title: "Departamento moderno en Palermo",
    location: "Palermo, Buenos Aires",
    price: "$450.000",
    beds: 2,
    baths: 1,
    sqft: 65,
    image:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Luminoso monoambiente",
    location: "Belgrano, Buenos Aires",
    price: "$320.000",
    beds: 1,
    baths: 1,
    sqft: 40,
    image:
      "https://images.unsplash.com/photo-1502672260266-1c1e2f936888?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Casa con jardín y pileta",
    location: "San Isidro, GBA Norte",
    price: "$1.200.000",
    beds: 4,
    baths: 3,
    sqft: 250,
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Penthouse con vista al río",
    location: "Puerto Madero, Buenos Aires",
    price: "$2.500.000",
    beds: 3,
    baths: 3,
    sqft: 180,
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 5,
    title: "Ph reciclado a nuevo",
    location: "Villa Crespo, Buenos Aires",
    price: "$380.000",
    beds: 2,
    baths: 1,
    sqft: 75,
    image:
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 6,
    title: "Amplio piso céntrico",
    location: "Recoleta, Buenos Aires",
    price: "$850.000",
    beds: 3,
    baths: 2,
    sqft: 120,
    image:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=800&auto=format&fit=crop",
  },
];

export function FeaturedProperties() {
  return (
    <section className="bg-primary-light relative z-10 w-full pt-32 pb-20">
      {/* Wave shape divider at the top */}
      <div className="absolute top-0 left-0 w-full translate-y-[-99%] transform overflow-hidden leading-0">
        <svg
          viewBox="0 0 1440 320"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          className="text-primary-light h-[150px] w-full md:h-[250px]"
          preserveAspectRatio="none"
        >
          <path d="M0,128L48,138.7C96,149,192,171,288,160C384,149,480,107,576,106.7C672,107,768,149,864,165.3C960,181,1056,171,1152,149.3C1248,128,1344,96,1392,80L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12">
        <div className="mb-12 text-center md:text-left">
          <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
            Propiedades Destacadas
          </h2>
          <p className="mt-4 text-gray-700">
            Encontrá el lugar perfecto para vos.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {mockProperties.map((prop) => (
            <div
              key={prop.id}
              className="group overflow-hidden rounded-2xl bg-white shadow-sm transition-all hover:shadow-xl"
            >
              <div className="relative h-64 w-full overflow-hidden sm:h-56">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={prop.image}
                  alt={prop.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="text-brand-purple absolute top-4 right-4 rounded-full bg-white px-3 py-1 text-sm font-bold shadow-sm">
                  {prop.price}{" "}
                  <span className="text-xs font-normal text-gray-500">
                    / mes
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="mb-2 flex items-center text-sm text-gray-500">
                  <MapPin className="mr-1 h-4 w-4" />
                  {prop.location}
                </div>
                <h3 className="mb-4 text-xl font-bold text-gray-900">
                  {prop.title}
                </h3>

                <div className="flex items-center justify-between border-t border-gray-100 pt-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <BedDouble className="text-brand-purple h-4 w-4" />
                    <span>{prop.beds} Hab</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Bath className="text-brand-purple h-4 w-4" />
                    <span>{prop.baths} Baños</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Maximize className="text-brand-purple h-4 w-4" />
                    <span>{prop.sqft} m²</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
