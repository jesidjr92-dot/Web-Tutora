import React from 'react';
import { Tutor } from '../types';
import { formatCOP } from '../utils/formatCurrency';
import { X, Star, CheckCircle2, BookOpen, MapPin, Award, MessageSquare, ArrowRight } from 'lucide-react';

interface TutorDossierModalProps {
  tutor: Tutor | null;
  isOpen: boolean;
  onClose: () => void;
  onBook: (tutor: Tutor) => void;
  onOpenChat: (tutor: Tutor) => void;
}

export const TutorDossierModal: React.FC<TutorDossierModalProps> = ({
  tutor,
  isOpen,
  onClose,
  onBook,
  onOpenChat,
}) => {
  if (!isOpen || !tutor) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0f172a]/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-[#ffffff] rounded-[1.5rem] border border-[#e2e8f0] shadow-2xl max-w-2xl w-full overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-150">
        
        {/* Cabecera */}
        <div className="p-6 border-b border-[#e2e8f0] bg-[#f8fafc] flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className="relative">
              <img
                src={tutor.avatarUrl}
                alt={tutor.name}
                className="w-16 h-16 rounded-2xl object-cover border-2 border-white shadow-xs"
              />
              <span className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-[#3b82f6] fill-[#3b82f6]/20" />
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-headline font-bold text-xl text-[#0f172a]">
                  {tutor.name}
                </h2>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#d4f00d]/30 text-[#0f172a] font-bold font-headline">
                  {tutor.university}
                </span>
              </div>
              <p className="text-xs text-[#64748b] mt-0.5">
                {tutor.major} · {tutor.degreeLevel}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <span className="inline-flex items-center gap-1 text-xs font-bold text-[#0f172a] bg-white px-2 py-0.5 rounded-md border border-[#e2e8f0]">
                  <Award className="w-3.5 h-3.5 text-[#586400]" />
                  {tutor.honorTitle}
                </span>
                <span className="text-xs font-bold text-[#0f172a] bg-white px-2 py-0.5 rounded-md border border-[#e2e8f0]">
                  {tutor.gpa}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Cerrar modal de dossier"
            className="p-2 rounded-xl text-[#64748b] hover:text-[#0f172a] hover:bg-[#eceef0] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Contenido */}
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          
          {/* Métricas clave */}
          <div className="grid grid-cols-3 gap-3 p-3.5 rounded-xl bg-[#f8fafc] border border-[#e2e8f0] text-center">
            <div>
              <div className="text-xs text-[#64748b]">Calificación</div>
              <div className="font-headline font-bold text-base text-[#0f172a] flex items-center justify-center gap-1 mt-0.5">
                <span>{tutor.rating.toFixed(2)}</span>
                <Star className="w-3.5 h-3.5 text-[#f59e0b] fill-[#f59e0b]" />
              </div>
            </div>
            <div>
              <div className="text-xs text-[#64748b]">Sesiones Realizadas</div>
              <div className="font-headline font-bold text-base text-[#0f172a] mt-0.5">
                {tutor.totalSessions}
              </div>
            </div>
            <div>
              <div className="text-xs text-[#64748b]">Tarifa por Hora</div>
              <div className="font-headline font-bold text-base text-[#0f172a] mt-0.5">
                {formatCOP(tutor.hourlyRate)}/hr
              </div>
            </div>
          </div>

          {/* Metodología */}
          <div>
            <h3 className="font-headline font-bold text-xs uppercase tracking-wider text-[#0f172a] mb-2">
              Metodología y Enfoque Pedagógico
            </h3>
            <p className="text-xs text-[#45464d] leading-relaxed">
              {tutor.bio}
            </p>
          </div>

          {/* Módulos del programa */}
          <div>
            <h3 className="font-headline font-bold text-xs uppercase tracking-wider text-[#0f172a] mb-2 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-[#586400]" />
              Módulos del Temario y Resolución de Problemas
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {tutor.syllabusHighlights.map((topic, i) => (
                <div
                  key={i}
                  className="p-3 rounded-xl bg-[#f8fafc] border border-[#e2e8f0] text-xs text-[#334155] flex items-start gap-2"
                >
                  <span className="font-bold text-[#586400]">0{i + 1}.</span>
                  <span>{topic}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Ubicación */}
          <div className="p-3.5 rounded-xl border border-[#e2e8f0] bg-[#ffffff] flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-[#475569]">
              <MapPin className="w-4 h-4 text-[#0f172a]" />
              <span>Espacio de Estudio: <strong className="text-[#0f172a]">{tutor.campusLocation}</strong></span>
            </div>
            <span className="text-[11px] text-[#3b82f6] font-semibold">
              O Sala Virtual en Directo
            </span>
          </div>

          {/* Testimonios */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-headline font-bold text-xs uppercase tracking-wider text-[#0f172a]">
                Testimonios de Estudiantes ({tutor.reviews.length})
              </h3>
              <span className="text-xs text-[#64748b]">100% verificados en Barranquilla</span>
            </div>

            <div className="space-y-2.5">
              {tutor.reviews.map((rev) => (
                <div
                  key={rev.id}
                  className="p-4 rounded-xl border border-[#e2e8f0] bg-[#ffffff] shadow-2xs space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-headline font-bold text-xs text-[#0f172a]">
                        {rev.studentName}
                      </span>
                      <span className="text-[11px] text-[#64748b]">({rev.studentMajor})</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-xs font-bold text-[#0f172a] font-headline">{rev.rating}</span>
                      <Star className="w-3 h-3 text-[#f59e0b] fill-[#f59e0b]" />
                    </div>
                  </div>
                  <p className="text-xs text-[#45464d] italic">
                    "{rev.comment}"
                  </p>
                  <div className="text-[10px] text-[#94a3b8] flex items-center gap-2 pt-0.5">
                    <span>Materia: {rev.course}</span>
                    <span>·</span>
                    <span>{rev.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Acciones del pie */}
        <div className="p-6 border-t border-[#e2e8f0] bg-[#ffffff] flex items-center justify-between gap-3">
          <button
            onClick={() => {
              onClose();
              onOpenChat(tutor);
            }}
            className="px-4 py-2.5 rounded-xl border border-[#e2e8f0] text-xs font-semibold text-[#334155] hover:bg-[#f8fafc] flex items-center gap-1.5 cursor-pointer"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Consultar Dudas Previas</span>
          </button>

          <button
            onClick={() => {
              onClose();
              onBook(tutor);
            }}
            className="px-6 py-2.5 rounded-xl bg-[#d4f00d] hover:bg-[#c6e004] text-[#0f172a] text-xs font-bold font-headline transition-transform active:scale-95 shadow-sm flex items-center gap-2 cursor-pointer"
          >
            <span>Reservar Sesión ({formatCOP(tutor.hourlyRate)})</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
