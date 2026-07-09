"use client";

import {
  Heart,
  MapPin,
  TrendingUp,
  GraduationCap,
  VolumeX,
  ShieldCheck,
} from "lucide-react";

export function StartupHeroVisual() {
  return (
    <div className="relative flex h-full w-full items-center justify-center p-4">
      <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(1deg); }
        }
        @keyframes float-medium {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-1.5deg); }
        }
        @keyframes float-fast {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(2deg); }
        }
        @keyframes pulse-ring {
          0% { transform: scale(0.95); opacity: 0.5; }
          50% { transform: scale(1.1); opacity: 0.3; }
          100% { transform: scale(0.95); opacity: 0.5; }
        }
        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite;
        }
        .animate-float-medium {
          animation: float-medium 5s ease-in-out infinite;
        }
        .animate-float-fast {
          animation: float-fast 4s ease-in-out infinite;
        }
        .animate-pulse-ring {
          animation: pulse-ring 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>

      <div className="relative h-[280px] w-[280px] md:h-[310px] md:w-[310px] lg:h-[400px] lg:w-[400px] xl:h-[460px] xl:w-[460px] 2xl:h-[480px] 2xl:w-[480px]">
        <svg
          viewBox="0 0 500 500"
          className="text-brand-orange animate-float-slow absolute inset-0 h-full w-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M180 60 C280 40, 390 80, 420 180 C450 280, 380 320, 410 380 C440 440, 340 450, 270 430 C200 410, 110 470, 70 380 C30 290, 50 180, 80 120 C110 60, 120 70, 180 60 Z"
            stroke="currentColor"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="opacity-95"
          />
        </svg>

        <div className="animate-float-medium absolute top-[-4%] left-[-4%] z-20 w-[160px] lg:w-[200px] xl:w-[220px] rounded-2xl border border-white/40 bg-white/70 p-2.5 lg:p-4 shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white/80">
          <div className="flex items-center justify-between">
            <span className="text-[9px] lg:text-xs font-semibold tracking-wider text-gray-500 uppercase">
              Estilo de Vida
            </span>
            <div className="flex h-5 w-8 lg:h-7 lg:w-12 items-center justify-center rounded-full bg-emerald-500/10 text-[9px] lg:text-xs font-bold text-emerald-600">
              98%
            </div>
          </div>
          <div className="mt-1.5 lg:mt-3 text-xs lg:text-sm xl:text-base font-bold text-gray-900">
            Match de Estudiante
          </div>
          <div className="mt-1.5 lg:mt-2 flex flex-wrap gap-1 lg:gap-1.5">
            <div className="flex items-center gap-0.5 lg:gap-1 rounded-md bg-amber-500/10 px-1.5 py-0.5 text-[9px] lg:text-xs text-amber-700">
              <GraduationCap className="h-3 w-3 lg:h-3.5 lg:w-3.5" />
              <span>UTN</span>
            </div>
            <div className="flex items-center gap-0.5 lg:gap-1 rounded-md bg-sky-500/10 px-1.5 py-0.5 text-[9px] lg:text-xs text-sky-700">
              <VolumeX className="h-3 w-3 lg:h-3.5 lg:w-3.5" />
              <span>Silencioso</span>
            </div>
          </div>
        </div>

        <div className="animate-float-fast absolute top-[15%] right-[-2%] md:right-[-3%] lg:right-[-5%] z-20 w-[120px] lg:w-[160px] xl:w-[190px] rounded-2xl border border-white/40 bg-white/70 p-2 lg:p-4 shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white/80">
          <div className="flex items-center gap-1.5 lg:gap-2">
            <div className="flex h-6 w-6 lg:h-8 lg:w-8 items-center justify-center rounded-lg bg-orange-500/10 text-orange-600">
              <TrendingUp className="h-3 w-3 lg:h-4 lg:w-4" />
            </div>
            <div>
              <div className="text-[9px] lg:text-xs font-medium text-gray-500">Tendencia</div>
              <div className="text-xs lg:text-sm font-bold text-gray-900">Estable</div>
            </div>
          </div>
          <div className="mt-2 lg:mt-3 flex items-center justify-between text-[9px] lg:text-xs text-gray-600">
            <span>Zonas Cercanas</span>
            <span className="font-semibold text-orange-600">147 Deptos</span>
          </div>
        </div>

        <div className="animate-float-slow absolute bottom-[8%] left-[2%] md:left-[5%] z-20 w-[150px] lg:w-[200px] xl:w-[240px] rounded-2xl border border-white/40 bg-white/70 p-2.5 lg:p-4 shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white/80">
          <div className="flex items-center gap-1.5 lg:gap-2">
            <div className="relative flex h-2 w-2 lg:h-3 lg:w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 lg:h-3 lg:w-3 rounded-full bg-orange-500"></span>
            </div>
            <span className="text-[9px] lg:text-xs font-bold tracking-wider text-gray-600 uppercase">
              Detalle del Barrio
            </span>
          </div>
          <div className="mt-2 lg:mt-3 space-y-1 lg:space-y-2">
            <div className="flex items-center justify-between text-[10px] lg:text-sm">
              <span className="text-gray-500">Seguridad</span>
              <div className="flex items-center gap-0.5 lg:gap-1 font-semibold text-emerald-600">
                <ShieldCheck className="h-3 w-3 lg:h-3.5 lg:w-3.5" />
                <span>Alta</span>
              </div>
            </div>
            <div className="flex items-center justify-between text-[10px] lg:text-sm">
              <span className="text-gray-500">Conectividad</span>
              <span className="font-semibold text-gray-700">Subte A / B</span>
            </div>
            <div className="flex items-center justify-between text-[10px] lg:text-sm">
              <span className="text-gray-500">Ubicación</span>
              <div className="flex items-center gap-0.5 font-semibold text-orange-600">
                <MapPin className="h-3 w-3 lg:h-3.5 lg:w-3.5" />
                <span>Almagro</span>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute right-[12%] bottom-[2%] z-10 flex h-7 w-7 lg:h-10 lg:w-10 items-center justify-center rounded-full border border-white/50 bg-white/60 shadow-lg backdrop-blur-md">
          <Heart className="h-3.5 w-3.5 lg:h-5 lg:w-5 fill-rose-500/20 text-rose-500" />
        </div>
      </div>
    </div>
  );
}
