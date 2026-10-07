import React from 'react';
import { Tutor } from '../types';
import { formatCOP } from '../utils/formatCurrency';
import { CheckCircle2, Star, Clock, MapPin, MessageSquare, ArrowRight, BookOpen } from 'lucide-react';

interface TutorCardProps {
  tutor: Tutor;
  onBook: (tutor: Tutor) => void;
  onOpenChat: (tutor: Tutor) => void;
  onViewDossier: (tutor: Tutor) => void;
}

export const TutorCard: React.FC<TutorCardProps> = ({
  tutor,
  onBook,
  onOpenChat,
  onViewDossier,
}) => {
  const nextSlot = tutor.availableSlots[0]?.times[0]
    ? `${tutor.availableSlots[0].date.split(' ')[0]} ${tutor.availableSlots[0].times[0]}`
    : 'Por coordinar';

  return (
    <div className="bg-[#ffffff] rounded-[1.5rem] border border-[#e2e8f0] p-6 shadow-xs hover:shadow-md hover:-translate-y-0.5 hover:border-[#cbd5e1] transition-all flex flex-col justify-between group">
      <div>
        {/* Cabecera superior: Foto, Nombre, Insignia y Tarifa en COP */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3.5">
            <div className="relative">
              <img
                src={tutor.avatarUrl}
                alt={tutor.name}
                className="w-14 h-14 rounded-full object-cover border-2 border-[#ffffff] shadow-xs"
              />
              {tutor.verified && (
                <div
                  className="absolute -bottom-1 -right-1 bg-[#ffffff] rounded-full p-0.5 shadow-xs"
                  title="Monitor Universitario Verificado"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#3b82f6] fill-[#3b82f6]/10" />
                </div>
              )}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-headline font-bold text-lg text-[#0f172a] group-hover:text-[#000000] leading-tight">
                  {tutor.name}
                </h3>
              </div>

              {/* Metadatos limpios */}
              <div className="flex items-center flex-wrap gap-1.5 text-xs text-[#64748b] mt-1 font-normal">
                <span className="font-semibold text-[#0f172a]">{tutor.university}</span>
                <span aria-hidden="true">·</span>
                <span>{tutor.degreeLevel}</span>
              </div>
            </div>
          </div>

          {/* Tarifa por hora en Pesos Colombianos */}
          <div className="text-right shrink-0">
            <div className="font-headline text-xl font-bold text-[#0f172a] tracking-tight">
              {formatCOP(tutor.hourlyRate)}
              <span className="text-xs font-normal text-[#64748b] font-sans">/hr</span>
            </div>
            <div className="text-[11px] text-[#586400] font-semibold mt-0.5">
              Sin Comisión
            </div>
          </div>
        </div>

        {/* Rol y distinciones académicas */}
        <div className="mb-3.5 px-3 py-1.5 rounded-lg bg-[#f8fafc] border border-[#e2e8f0]/80 flex items-center justify-between text-xs">
          <span className="font-medium text-[#0f172a] truncate mr-2">
            {tutor.honorTitle}
          </span>
          <span className="font-bold text-[#334155] shrink-0 font-headline">
            {tutor.gpa}
          </span>
        </div>

        {/* Métrica de confianza y disponibilidad */}
        <div className="flex items-center gap-2.5 mb-3.5 flex-wrap">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#f8fafc] border border-[#e2e8f0] text-xs">
            <Star className="w-3.5 h-3.5 text-[#f59e0b] fill-[#f59e0b]" />
            <span className="font-headline font-bold text-[#0f172a]">{tutor.rating.toFixed(2)}</span>
            <span className="text-[#64748b]">({tutor.reviewCount} reseñas)</span>
          </div>

          {tutor.availableToday ? (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#d4f00d]/25 text-[#0f172a] text-xs font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#586400] animate-pulse"></span>
              Disponible Hoy
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#eceef0] text-[#475569] text-xs font-medium">
              Próximo: {nextSlot}
            </span>
          )}

          <div className="text-[11px] text-[#64748b] flex items-center gap-1 ml-auto">
            <Clock className="w-3 h-3 text-[#64748b]" />
            <span>Responde {tutor.responseSpeed}</span>
          </div>
        </div>

        {/* Biografía breve */}
        <p className="text-xs text-[#45464d] line-clamp-2 leading-relaxed mb-4 font-normal">
          {tutor.bio}
        </p>

        {/* Materias */}
        <div className="mb-4">
          <div className="text-[11px] font-semibold text-[#64748b] uppercase tracking-wider mb-1.5">
            Materias de Enfoque:
          </div>
          <div className="flex flex-wrap gap-1.5">
            {tutor.courseCodes.map((code) => (
              <span
                key={code}
                className="px-2.5 py-0.5 rounded-full bg-[#ffffff] border border-[#e2e8f0] text-xs font-semibold text-[#334155] shadow-2xs hover:border-[#94a3b8] transition-colors"
              >
                {code}
              </span>
            ))}
          </div>
        </div>

        {/* Ubicación en campus de Barranquilla */}
        <div className="flex items-center gap-1.5 text-xs text-[#64748b] mb-5">
          <MapPin className="w-3.5 h-3.5 text-[#64748b] shrink-0" />
          <span className="truncate">{tutor.campusLocation}</span>
        </div>
      </div>

      {/* Botones de acción */}
      <div className="pt-4 border-t border-[#f1f5f9] grid grid-cols-2 gap-2.5">
        <button
          onClick={() => onBook(tutor)}
          className="col-span-1 flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#d4f00d] hover:bg-[#c6e004] text-[#0f172a] text-xs font-bold font-headline transition-transform active:scale-98 shadow-xs cursor-pointer"
        >
          <span>Reservar Sesión</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

        <div className="col-span-1 flex items-center gap-1.5">
          <button
            onClick={() => onOpenChat(tutor)}
            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-[#ffffff] hover:bg-[#f8fafc] text-[#334155] hover:text-[#0f172a] border border-[#e2e8f0] text-xs font-semibold transition-colors cursor-pointer shadow-2xs"
            title="Enviar mensaje al tutor sobre guías o dudas"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Chat</span>
          </button>

          <button
            onClick={() => onViewDossier(tutor)}
            className="flex items-center justify-center p-2.5 rounded-xl bg-[#ffffff] hover:bg-[#f8fafc] text-[#334155] hover:text-[#0f172a] border border-[#e2e8f0] text-xs font-semibold transition-colors cursor-pointer shadow-2xs"
            title="Ver temario completo y testimonios"
          >
            <BookOpen className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
