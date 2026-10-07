import React from 'react';
import { Department } from '../types';
import { DEPARTMENTS } from '../data/mockData';
import { formatCOP } from '../utils/formatCurrency';
import { X, ArrowUpDown } from 'lucide-react';

interface FilterBarProps {
  selectedDepartment: Department;
  onSelectDepartment: (dept: Department) => void;
  maxHourlyRate: number;
  onMaxHourlyRateChange: (rate: number) => void;
  sortBy: 'rating' | 'price_low' | 'price_high' | 'sessions';
  onSortChange: (sort: 'rating' | 'price_low' | 'price_high' | 'sessions') => void;
  totalResults: number;
  onResetFilters: () => void;
  hasActiveFilters: boolean;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  selectedDepartment,
  onSelectDepartment,
  maxHourlyRate,
  onMaxHourlyRateChange,
  sortBy,
  onSortChange,
  totalResults,
  onResetFilters,
  hasActiveFilters,
}) => {
  return (
    <div className="bg-[#ffffff] border-y border-[#e2e8f0] py-4 sticky top-20 z-30 shadow-2xs backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
        {/* Píldoras de departamento */}
        <div className="flex items-center justify-between gap-4 overflow-x-auto pb-1 scrollbar-none">
          <div className="flex items-center gap-1.5 shrink-0">
            {DEPARTMENTS.map((dept) => {
              const isSelected = selectedDepartment === dept;
              return (
                <button
                  key={dept}
                  onClick={() => onSelectDepartment(dept as Department)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                    isSelected
                      ? 'bg-[#0f172a] text-[#ffffff] border border-[#0f172a] shadow-xs'
                      : 'bg-[#ffffff] text-[#334155] border border-[#e2e8f0] hover:border-[#94a3b8] hover:text-[#0f172a]'
                  }`}
                >
                  {dept}
                </button>
              );
            })}
          </div>
        </div>

        {/* Barra de controles secundarios */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-t border-[#f1f5f9]">
          <div className="flex items-center gap-4 text-xs">
            <span className="font-semibold text-[#0f172a]">
              Mostrando <span className="font-bold text-[#0f172a]">{totalResults}</span> {totalResults === 1 ? 'tutor verificado' : 'tutores verificados'}
            </span>

            {/* Control de tarifa en COP */}
            <div className="hidden sm:flex items-center gap-2 pl-3 border-l border-[#e2e8f0]">
              <span className="text-[#64748b] font-medium">Tarifa máx:</span>
              <span className="font-headline font-bold text-[#0f172a]">{formatCOP(maxHourlyRate)}/hr</span>
              <input
                type="range"
                min="20000"
                max="50000"
                step="2000"
                value={maxHourlyRate}
                onChange={(e) => onMaxHourlyRateChange(Number(e.target.value))}
                className="w-28 accent-[#0f172a] cursor-pointer"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Menú de orden */}
            <div className="flex items-center gap-1.5">
              <ArrowUpDown className="w-3.5 h-3.5 text-[#64748b]" />
              <label htmlFor="sort-tutors-select" className="text-xs text-[#64748b] font-medium">Ordenar:</label>
              <select
                id="sort-tutors-select"
                value={sortBy}
                onChange={(e) => onSortChange(e.target.value as any)}
                aria-label="Ordenar tutores"
                className="bg-[#ffffff] border border-[#e2e8f0] text-xs font-semibold text-[#0f172a] rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-[#0f172a] cursor-pointer shadow-2xs"
              >
                <option value="rating">Mayor Calificación (★)</option>
                <option value="sessions">Más Experimentados</option>
                <option value="price_low">Menor Tarifa ($ COP)</option>
                <option value="price_high">Mayor Tarifa ($ COP)</option>
              </select>
            </div>

            {/* Botón de limpiar filtros */}
            {hasActiveFilters && (
              <button
                onClick={onResetFilters}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-[#ba1a1a] bg-[#ffdad6]/40 hover:bg-[#ffdad6] border border-[#ba1a1a]/20 transition-colors cursor-pointer"
              >
                <X className="w-3 h-3" />
                <span>Restablecer</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
