import React from 'react';
import { Booking } from '../types';
import { formatCOP } from '../utils/formatCurrency';
import { X, Calendar, Clock, MapPin, Video, ArrowRight, Trash2, Download, AlertCircle } from 'lucide-react';

interface MyBookingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookings: Booking[];
  onCancelBooking: (id: string) => void;
  onLaunchStudyRoom: (booking: Booking) => void;
}

export const MyBookingsModal: React.FC<MyBookingsModalProps> = ({
  isOpen,
  onClose,
  bookings,
  onCancelBooking,
  onLaunchStudyRoom,
}) => {
  if (!isOpen) return null;

  const downloadCalendarFile = (booking: Booking) => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Tutora//Tutorias Barranquilla//ES
BEGIN:VEVENT
UID:${booking.id}@tutora.edu.co
DTSTAMP:20261007T120000Z
SUMMARY:Tutoría ${booking.courseCode} con ${booking.tutorName}
DESCRIPTION:${booking.format} - ${booking.notes}
LOCATION:${booking.campusRoom}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `tutoria-${booking.courseCode}-${booking.id}.ics`;
    link.click();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0f172a]/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-[#ffffff] rounded-[1.5rem] border border-[#e2e8f0] shadow-2xl max-w-2xl w-full overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-150">
        
        {/* Cabecera */}
        <div className="p-6 border-b border-[#e2e8f0] flex items-center justify-between bg-[#f8fafc]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0f172a] text-[#ffffff] flex items-center justify-center font-bold">
              <Calendar className="w-5 h-5 text-[#d4f00d]" />
            </div>
            <div>
              <h2 className="font-headline font-bold text-lg text-[#0f172a]">
                Mis Sesiones Programadas
              </h2>
              <p className="text-xs text-[#64748b]">
                {bookings.length} {bookings.length === 1 ? 'sesión activa' : 'sesiones activas'} agendadas en Barranquilla
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Cerrar modal de sesiones programadas"
            className="p-2 rounded-xl text-[#64748b] hover:text-[#0f172a] hover:bg-[#eceef0] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Lista de reservas */}
        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          {bookings.length === 0 ? (
            <div className="text-center py-12 px-4">
              <AlertCircle className="w-10 h-10 text-[#94a3b8] mx-auto mb-3" />
              <h3 className="font-headline font-bold text-base text-[#0f172a]">
                No tienes sesiones agendadas
              </h3>
              <p className="text-xs text-[#64748b] mt-1 max-w-sm mx-auto">
                Explora el catálogo y agenda una sesión con un monitor universitario para resolver tu próxima previa o taller.
              </p>
            </div>
          ) : (
            bookings.map((b) => (
              <div
                key={b.id}
                className="bg-[#ffffff] border border-[#e2e8f0] rounded-2xl p-4 sm:p-5 hover:border-[#cbd5e1] transition-all shadow-2xs space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={b.tutorAvatar}
                      alt={b.tutorName}
                      className="w-12 h-12 rounded-xl object-cover border border-[#e2e8f0]"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-headline font-bold text-sm text-[#0f172a]">
                          {b.courseCode} · {b.format}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#d4f00d]/20 text-[#0f172a] font-bold font-headline">
                          CONFIRMADA
                        </span>
                      </div>
                      <div className="text-xs text-[#64748b] mt-0.5">
                        Monitor: <span className="font-semibold text-[#0f172a]">{b.tutorName}</span> ({b.university})
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="font-headline font-bold text-base text-[#0f172a]">
                      {formatCOP(b.totalPrice)}
                    </div>
                    <div className="text-[10px] text-[#586400] font-medium">
                      Sesión de 50 min
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs py-2 border-y border-[#f1f5f9]">
                  <div className="flex items-center gap-2 text-[#334155]">
                    <Clock className="w-3.5 h-3.5 text-[#64748b]" />
                    <span>{b.date} a las {b.timeSlot}</span>
                  </div>

                  <div className="flex items-center gap-2 text-[#334155] truncate">
                    {b.locationType === 'campus' ? (
                      <>
                        <MapPin className="w-3.5 h-3.5 text-[#64748b] shrink-0" />
                        <span className="truncate">{b.campusRoom}</span>
                      </>
                    ) : (
                      <>
                        <Video className="w-3.5 h-3.5 text-[#3b82f6] shrink-0" />
                        <span>Sala Virtual de Estudio en Vivo</span>
                      </>
                    )}
                  </div>
                </div>

                {b.notes && (
                  <p className="text-xs text-[#64748b] italic">
                    Enfoque: "{b.notes}"
                  </p>
                )}

                {/* Acciones */}
                <div className="flex items-center justify-between gap-2 pt-1">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => downloadCalendarFile(b)}
                      className="px-3 py-1.5 rounded-lg border border-[#e2e8f0] text-[11px] font-semibold text-[#475569] hover:bg-[#f8fafc] flex items-center gap-1 cursor-pointer"
                    >
                      <Download className="w-3 h-3" />
                      <span>Calendario</span>
                    </button>

                    <button
                      onClick={() => onCancelBooking(b.id)}
                      className="px-2.5 py-1.5 rounded-lg text-[11px] font-medium text-[#ba1a1a] hover:bg-[#ffdad6]/40 flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>Cancelar</span>
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      onLaunchStudyRoom(b);
                      onClose();
                    }}
                    className="px-4 py-2 rounded-xl bg-[#d4f00d] hover:bg-[#c6e004] text-[#0f172a] text-xs font-bold font-headline transition-transform active:scale-95 shadow-2xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Entrar a la Sala en Vivo</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pie */}
        <div className="p-4 border-t border-[#e2e8f0] bg-[#f8fafc] text-center">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-xl bg-[#0f172a] hover:bg-[#1e293b] text-[#ffffff] text-xs font-semibold cursor-pointer"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
