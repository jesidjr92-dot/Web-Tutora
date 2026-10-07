import React from 'react';
import { Search, Zap, CheckCircle2, Flame, MapPin } from 'lucide-react';

interface HeroSectionProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSelectQuickTag: (tag: string) => void;
  availableTodayOnly: boolean;
  onToggleAvailableToday: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  searchQuery,
  onSearchChange,
  onSelectQuickTag,
  availableTodayOnly,
  onToggleAvailableToday,
}) => {
  const quickCourses = [
    'Estructuras de Datos',
    'Cálculo Multivariable',
    'Química Orgánica',
    'Matemáticas Financieras',
    'Física Mecánica',
    'Derecho Constitucional'
  ];

  return (
    <section className="relative pt-8 pb-12 overflow-hidden">
      {/* Luz ambiental sutil */}
      <div className="absolute inset-0 -z-10 pointer-events-none opacity-40">
        <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-[#d4f00d]/10 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/4 w-80 h-80 rounded-full bg-[#3b82f6]/5 blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          {/* Distintivo de Barranquilla */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ffffff] border border-[#e2e8f0] text-xs font-semibold text-[#0f172a] shadow-xs mb-5">
            <MapPin className="w-3.5 h-3.5 text-[#586400]" />
            <span className="text-[#0f172a] font-medium">Universidades de Barranquilla</span>
            <span className="text-[#64748b]">·</span>
            <span className="text-[#586400] font-bold">142 Turnos Abiertos Hoy</span>
          </div>

          {/* Titular Principal en Space Grotesk */}
          <h1 className="font-headline text-4xl sm:text-5xl lg:text-[54px] font-bold text-[#0f172a] leading-[1.08] tracking-tight mb-4">
            Domina tus asignaturas con{' '}
            <span className="relative inline-block whitespace-nowrap">
              <span className="relative z-10 text-[#0f172a]">monitores destacados</span>
              <span
                className="absolute left-0 bottom-1.5 w-full h-3 bg-[#d4f00d] -z-0 opacity-80 rounded-xs"
                aria-hidden="true"
              ></span>
            </span>
            .
          </h1>

          <p className="text-[#45464d] text-base sm:text-lg leading-relaxed mb-8 max-w-2xl font-normal">
            Conéctate de tú a tú con monitores y compañeros de Uninorte, Uniatlántico, CUC, Unisimón, Unilibre y Uniautónoma. Tarifas transparentes en pesos colombianos (COP) y pago directo sin comisiones.
          </p>

          {/* Barra de Búsqueda de Alta Intención */}
          <div className="bg-[#ffffff] p-2 sm:p-2.5 rounded-2xl border border-[#e2e8f0] shadow-sm flex flex-col sm:flex-row items-stretch gap-2.5 mb-5 focus-within:border-[#0f172a] focus-within:ring-3 focus-within:ring-[#d4f00d]/40 transition-all">
            <div className="flex-1 flex items-center px-3 gap-3">
              <Search className="w-5 h-5 text-[#64748b] shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Busca materia, profesor o universidad (ej. Cálculo, Uninorte, Estructuras, CUC)..."
                className="w-full py-2.5 text-sm sm:text-base font-normal text-[#0f172a] placeholder-[#94a3b8] focus:outline-none bg-transparent"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="text-xs text-[#64748b] hover:text-[#0f172a] px-2 py-1 bg-[#f1f5f9] rounded-md font-medium cursor-pointer"
                >
                  Limpiar
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 px-1 sm:px-0">
              <button
                type="button"
                onClick={onToggleAvailableToday}
                className={`flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  availableTodayOnly
                    ? 'bg-[#d4f00d] text-[#0f172a] shadow-xs'
                    : 'bg-[#f8fafc] text-[#475569] hover:bg-[#eceef0] border border-[#e2e8f0]'
                }`}
              >
                <Zap className={`w-3.5 h-3.5 ${availableTodayOnly ? 'fill-[#0f172a]' : ''}`} />
                <span>Disponible Hoy</span>
              </button>
            </div>
          </div>

          {/* Cursos Frecuentes */}
          <div className="flex items-center flex-wrap gap-2 text-xs text-[#64748b]">
            <span className="font-semibold text-[#0f172a] flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 text-[#586400]" />
              Materias frecuentes:
            </span>
            {quickCourses.map((course) => (
              <button
                key={course}
                onClick={() => onSelectQuickTag(course)}
                className="px-2.5 py-1 rounded-full bg-[#ffffff] border border-[#e2e8f0] text-xs font-medium text-[#334155] hover:border-[#0f172a] hover:text-[#0f172a] transition-colors cursor-pointer shadow-2xs"
              >
                {course}
              </button>
            ))}
          </div>
        </div>

        {/* Métricas de Confianza Académica */}
        <div className="mt-10 pt-8 border-t border-[#e2e8f0] grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
          <div className="bg-[#ffffff] p-4 rounded-xl border border-[#e2e8f0]/80 shadow-2xs">
            <div className="font-headline text-2xl font-bold text-[#0f172a]">9,420+</div>
            <div className="text-xs text-[#64748b] mt-0.5 font-medium">
              Horas de tutoría en Barranquilla
            </div>
          </div>

          <div className="bg-[#ffffff] p-4 rounded-xl border border-[#e2e8f0]/80 shadow-2xs">
            <div className="font-headline text-2xl font-bold text-[#0f172a] flex items-center gap-1.5">
              <span>4.97</span>
              <span className="text-[#f59e0b] text-lg">★</span>
            </div>
            <div className="text-xs text-[#64748b] mt-0.5 font-medium">
              Calificación promedio de monitores
            </div>
          </div>

          <div className="bg-[#ffffff] p-4 rounded-xl border border-[#e2e8f0]/80 shadow-2xs">
            <div className="font-headline text-2xl font-bold text-[#0f172a] flex items-center gap-1">
              6 Campus
              <CheckCircle2 className="w-4 h-4 text-[#3b82f6]" />
            </div>
            <div className="text-xs text-[#64748b] mt-0.5 font-medium">
              Universidades aliadas en Barranquilla
            </div>
          </div>

          <div className="bg-[#ffffff] p-4 rounded-xl border border-[#e2e8f0]/80 shadow-2xs">
            <div className="font-headline text-2xl font-bold text-[#586400]">
              $0 Comisión
            </div>
            <div className="text-xs text-[#64748b] mt-0.5 font-medium">
              En pesos colombianos (COP directos)
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
