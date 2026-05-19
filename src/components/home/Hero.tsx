import Image from "next/image";

export function Hero() {
  return (
    <main className="relative z-10 mx-auto flex min-h-[calc(100vh-88px)] max-w-7xl flex-col items-center justify-between px-6 py-12 md:flex-row md:px-12 md:py-20">
      <div className="z-20 mt-8 flex w-full flex-1 flex-col items-start md:mt-0">
        <div className="bg-brand-purple -rotate-3 transform rounded-xl px-6 py-4 text-6xl leading-none font-extrabold text-white shadow-2xl transition-transform duration-300 hover:-rotate-1 md:px-10 md:py-6 md:text-8xl lg:text-[140px]">
          Hogaroo
        </div>

        <div className="bg-brand-light border-brand-purple/20 mt-16 flex w-full max-w-xl items-center rounded-full border px-8 py-5 shadow-sm transition-shadow hover:shadow-md md:mt-24">
          <input
            type="text"
            placeholder="¿Qué estás buscando?"
            className="w-full bg-transparent text-xl text-gray-900 placeholder-gray-600 outline-none md:text-2xl"
          />
        </div>
      </div>

      <div className="relative z-10 mt-16 flex w-full flex-1 justify-center md:mt-0 md:justify-end">
        <div className="relative h-[320px] w-[320px] md:h-[600px] md:w-[600px] md:translate-x-12 xl:h-[700px] xl:w-[700px]">
          <Image
            src="/mascot-ig.png"
            alt="Hogaroo Owl Mascot"
            fill
            className="object-contain drop-shadow-2xl"
            priority
          />
        </div>
      </div>
    </main>
  );
}
