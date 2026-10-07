import React, { useState } from 'react';
import { Tutor, SessionFormat, LocationType, Booking } from '../types';
import { formatCOP } from '../utils/formatCurrency';
import { X, Calendar, Clock, MapPin, Video, CheckCircle2, Star, Sparkles, BookCheck, ArrowRight, Download } from 'lucide-react';
import confetti from 'canvas-confetti';

interface BookingModalProps {
  tutor: Tutor | null;
  onClose: () => void;
  onConfirmBooking: (booking: Booking) => void;
  onOpenStudyRoom: (booking: Booking) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  tutor,
  onClose,
  onConfirmBooking,
  onOpenStudyRoom,
}) => {
  if (!tutor) return null;

  const [selectedFormat, setSelectedFormat] = useState<SessionFormat>('Inmersión conceptual 1 a 1');
  const [selectedCourse, setSelectedCourse] = useState<string>(tutor.courseCodes[0] || '');
  const [selectedDateIdx, setSelectedDateIdx] = useState<number>(0);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>(
    tutor.availableSlots[0]?.times[0] || '14:00'
  );
  const [locationType, setLocationType] = useState<LocationType>('campus');
  const [notes, setNotes] = useState<string>('');
  const [completedBooking, setCompletedBooking] = useState<Booking | null>(null);

  const availableDates = tutor.availableSlots;
  const currentTimes = availableDates[selectedDateIdx]?.times || [];

  const handleSelectDate = (idx: number) => {
    setSelectedDateIdx(idx);
    const timesForNewDate = availableDates[idx]?.times || [];
    if (timesForNewDate.length > 0) {
      setSelectedTimeSlot(timesForNewDate[0]);
    }
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const selectedDateStr = availableDates[selectedDateIdx]?.date || 'Hoy';

    const newBooking: Booking = {
      id: `book-${Date.now()}`,
      tutorId: tutor.id,
      tutorName: tutor.name,
      tutorAvatar: tutor.avatarUrl,
      university: tutor.university,
      courseCode: selectedCourse,
      format: selectedFormat,
      date: selectedDateStr,
      timeSlot: selectedTimeSlot,
      locationType,
      campusRoom: locationType === 'campus' ? tutor.campusLocation : 'Sala Virtual de Estudio en Vivo',
      meetLink: locationType === 'virtual' ? `https://tutora.room/${selectedCourse.toLowerCase().replace(/\s+/g, '')}-${tutor.name.toLowerCase().split(' ')[0]}` : undefined,
      notes: notes || 'Revisión de conceptos y ejercicios prácticos de la asignatura.',
      hourlyRate: tutor.hourlyRate,
      totalPrice: tutor.hourlyRate,
      status: 'confirmed',
      createdAt: new Date().toISOString()
    };

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#d4f00d', '#0f172a', '#3b82f6', '#586400']
      });
    } catch {
      // ignore
    }

    onConfirmBooking(newBooking);
    setCompletedBooking(newBooking);
  };

  const downloadCalendarFile = () => {
    if (!completedBooking) return;
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Tutora//Tutorias Barranquilla//ES
BEGIN:VEVENT
UID:${completedBooking.id}@tutora.edu.co
DTSTAMP:20261007T120000Z
SUMMARY:Tutoría ${completedBooking.courseCode} con ${completedBooking.tutorName}
DESCRIPTION:${completedBooking.format} - ${completedBooking.notes}
LOCATION:${completedBooking.campusRoom}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `tutoria-${completedBooking.courseCode}-${completedBooking.id}.ics`;
    link.click();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0f172a]/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-[#ffffff] rounded-[1.5rem] border border-[#e2e8f0] shadow-2xl max-w-2xl w-full overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-150">
        
        {/* Pantalla de Confirmación */}
        {completedBooking ? (
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-[#d4f00d]/30 border-2 border-[#d4f00d] mx-auto flex items-center justify-center text-[#0f172a]">
              <Sparkles className="w-8 h-8 text-[#0f172a]" />
            </div>

            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#d4f00d]/20 text-xs font-bold text-[#0f172a] mb-2 font-headline">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#586400]" />
                SESIÓN CONFIRMADA
              </div>
              <h2 className="font-headline text-3xl font-bold text-[#0f172a]">
                ¡Tu sesión con {completedBooking.tutorName} está agendada!
              </h2>
              <p className="text-sm text-[#64748b] mt-1 max-w-md mx-auto">
                Hemos enviado la notificación al monitor y reservado el espacio de estudio en {completedBooking.university}.
              </p>
            </div>

            {/* Tarjeta resumen */}
            <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-2xl p-5 text-left space-y-3 max-w-lg mx-auto">
              <div className="flex items-center justify-between pb-3 border-b border-[#e2e8f0]">
                <div>
                  <div className="text-xs text-[#64748b]">Asignatura y Enfoque</div>
                  <div className="font-headline font-bold text-base text-[#0f172a]">
                    {completedBooking.courseCode} · {completedBooking.format}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-[#64748b]">Tarifa Total</div>
                  <div className="font-headline font-bold text-base text-[#0f172a]">
                    {formatCOP(completedBooking.totalPrice)}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-[#64748b]">Fecha y Hora:</span>
                  <div className="font-semibold text-[#0f172a] mt-0.5">
                    {completedBooking.date} a las {completedBooking.timeSlot}
                  </div>
                </div>

                <div>
                  <span className="text-[#64748b]">Ubicación:</span>
                  <div className="font-semibold text-[#0f172a] mt-0.5 truncate">
                    {completedBooking.campusRoom}
                  </div>
                </div>
              </div>

              {completedBooking.notes && (
                <div className="pt-2 border-t border-[#e2e8f0] text-xs">
                  <span className="text-[#64748b]">Temas a tratar:</span>
                  <p className="text-[#334155] mt-0.5 italic">"{completedBooking.notes}"</p>
                </div>
              )}
            </div>

            {/* Acciones */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={() => onOpenStudyRoom(completedBooking)}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#d4f00d] hover:bg-[#c6e004] text-[#0f172a] text-sm font-bold font-headline transition-transform active:scale-95 shadow-sm cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Entrar a la Sala de Estudio en Vivo</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={downloadCalendarFile}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-[#ffffff] hover:bg-[#f1f5f9] text-[#0f172a] border border-[#e2e8f0] text-xs font-semibold transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Download className="w-4 h-4 text-[#64748b]" />
                <span>Guardar en Calendario (.ics)</span>
              </button>

              <button
                onClick={onClose}
                className="w-full sm:w-auto px-4 py-3 rounded-xl bg-transparent hover:bg-[#eceef0] text-[#64748b] text-xs font-semibold cursor-pointer"
              >
                Listo
              </button>
            </div>
          </div>
        ) : (
          /* Formulario de Reserva */
          <form onSubmit={handleBookingSubmit} className="flex flex-col max-h-[90vh]">
            {/* Cabecera */}
            <div className="p-6 border-b border-[#e2e8f0] flex items-center justify-between bg-[#f8fafc]/50">
              <div className="flex items-center gap-3.5">
                <img
                  src={tutor.avatarUrl}
                  alt={tutor.name}
                  className="w-12 h-12 rounded-full object-cover border border-[#e2e8f0]"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="font-headline font-bold text-lg text-[#0f172a]">
                      Reservar con {tutor.name}
                    </h2>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-[#f1f5f9] text-[#0f172a] font-semibold">
                      {tutor.university}
                    </span>
                  </div>
                  <p className="text-xs text-[#64748b] mt-0.5">
                    {tutor.honorTitle} · {tutor.gpa}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Cerrar modal de reserva"
                className="p-2 rounded-xl text-[#64748b] hover:text-[#0f172a] hover:bg-[#f1f5f9] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cuerpo del formulario */}
            <div className="p-6 space-y-6 overflow-y-auto">
              
              {/* 1. Asignatura */}
              <div>
                <label className="block text-xs font-bold text-[#0f172a] uppercase tracking-wider mb-2">
                  1. Elige la Asignatura
                </label>
                <div className="flex flex-wrap gap-2">
                  {tutor.courseCodes.map((code) => {
                    const isSelected = selectedCourse === code;
                    return (
                      <button
                        type="button"
                        key={code}
                        onClick={() => setSelectedCourse(code)}
                        className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#0f172a] text-[#ffffff] border border-[#0f172a] shadow-xs'
                            : 'bg-[#ffffff] text-[#334155] border border-[#e2e8f0] hover:border-[#94a3b8]'
                        }`}
                      >
                        {code}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. Enfoque de sesión */}
              <div>
                <label className="block text-xs font-bold text-[#0f172a] uppercase tracking-wider mb-2">
                  2. Enfoque de la Sesión
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {(
                    [
                      'Inmersión conceptual 1 a 1',
                      'Resolución de guías y problemas',
                      'Preparación intensiva para exámenes',
                      'Revisión de código y ensayos'
                    ] as SessionFormat[]
                  ).map((fmt) => {
                    const isSelected = selectedFormat === fmt;
                    return (
                      <button
                        type="button"
                        key={fmt}
                        onClick={() => setSelectedFormat(fmt)}
                        className={`p-3 rounded-xl text-left border text-xs transition-all cursor-pointer ${
                          isSelected
                            ? 'border-[#0f172a] bg-[#0f172a]/5 text-[#0f172a] font-bold ring-2 ring-[#0f172a]'
                            : 'border-[#e2e8f0] bg-[#ffffff] text-[#475569] hover:border-[#cbd5e1]'
                        }`}
                      >
                        {fmt}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 3. Matriz de Horarios */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-[#0f172a] uppercase tracking-wider">
                    3. Matriz de Horarios (Fecha y Turno)
                  </label>
                  <span className="text-[11px] text-[#64748b]">Bloques de 50 minutos</span>
                </div>

                {/* Pestañas de fechas */}
                <div className="flex items-center gap-2 mb-3 overflow-x-auto pb-1">
                  {availableDates.map((slotGroup, idx) => {
                    const isSelected = selectedDateIdx === idx;
                    return (
                      <button
                        type="button"
                        key={slotGroup.date}
                        onClick={() => handleSelectDate(idx)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                          isSelected
                            ? 'bg-[#0f172a] text-[#ffffff] shadow-xs'
                            : 'bg-[#f8fafc] text-[#64748b] hover:bg-[#eceef0] border border-[#e2e8f0]'
                        }`}
                      >
                        <Calendar className="w-3 h-3 inline mr-1.5" />
                        {slotGroup.date}
                      </button>
                    );
                  })}
                </div>

                {/* Grilla de turnos horarios */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {currentTimes.map((slot) => {
                    const isSelected = selectedTimeSlot === slot;
                    return (
                      <button
                        type="button"
                        key={slot}
                        onClick={() => setSelectedTimeSlot(slot)}
                        className={`py-2.5 px-3 rounded-full text-xs font-semibold text-center transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#d4f00d] text-[#0f172a] font-bold shadow-xs border border-[#d4f00d]'
                            : 'bg-[#f8fafc] text-[#475569] hover:bg-[#eceef0] border border-[#e2e8f0]'
                        }`}
                      >
                        <Clock className="w-3 h-3 inline mr-1 -mt-0.5 opacity-70" />
                        {slot}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 4. Modalidad */}
              <div>
                <label className="block text-xs font-bold text-[#0f172a] uppercase tracking-wider mb-2">
                  4. Modalidad / Espacio
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setLocationType('campus')}
                    className={`p-3 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                      locationType === 'campus'
                        ? 'border-[#0f172a] bg-[#0f172a]/5 ring-2 ring-[#0f172a]'
                        : 'border-[#e2e8f0] bg-[#ffffff]'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 font-bold text-[#0f172a] mb-1">
                      <MapPin className="w-3.5 h-3.5 text-[#0f172a]" />
                      <span>Presencial en Campus</span>
                    </div>
                    <div className="text-[11px] text-[#64748b] truncate">
                      {tutor.campusLocation}
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setLocationType('virtual')}
                    className={`p-3 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                      locationType === 'virtual'
                        ? 'border-[#0f172a] bg-[#0f172a]/5 ring-2 ring-[#0f172a]'
                        : 'border-[#e2e8f0] bg-[#ffffff]'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 font-bold text-[#0f172a] mb-1">
                      <Video className="w-3.5 h-3.5 text-[#3b82f6]" />
                      <span>Sala de Estudio Virtual</span>
                    </div>
                    <div className="text-[11px] text-[#64748b]">
                      Pizarra digital y editor colaborativo
                    </div>
                  </button>
                </div>
              </div>

              {/* 5. Dudas o notas */}
              <div>
                <label className="block text-xs font-bold text-[#0f172a] uppercase tracking-wider mb-1.5">
                  5. ¿Qué dudas deseas repasar en la sesión? (Opcional)
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="ej. Taller 2 de cálculo, dudas con integrales triples y preparación para el parcial."
                  className="w-full p-3 rounded-xl border border-[#e2e8f0] text-xs text-[#0f172a] placeholder-[#94a3b8] focus:outline-none focus:border-[#0f172a] focus:ring-2 focus:ring-[#d4f00d]/50"
                />
              </div>

              {/* Temas del tutor */}
              <div className="bg-[#f8fafc] rounded-xl p-4 border border-[#e2e8f0]">
                <div className="text-[11px] font-bold text-[#0f172a] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <BookCheck className="w-3.5 h-3.5 text-[#586400]" />
                  Módulos clave del monitor:
                </div>
                <ul className="text-xs text-[#45464d] space-y-1">
                  {tutor.syllabusHighlights.map((highlight, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-[#586400] font-bold">✓</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Pie de confirmación con COP */}
            <div className="p-6 border-t border-[#e2e8f0] bg-[#ffffff] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-left w-full sm:w-auto">
                <div className="flex items-baseline gap-2">
                  <span className="font-headline text-2xl font-bold text-[#0f172a]">
                    {formatCOP(tutor.hourlyRate)}
                  </span>
                  <span className="text-xs text-[#64748b]">/ sesión de 50 min</span>
                </div>
                <div className="text-[11px] text-[#586400] font-semibold">
                  Pago íntegro al monitor · Cancelación gratuita hasta 2h antes
                </div>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-[#e2e8f0] text-xs font-semibold text-[#64748b] hover:bg-[#f8fafc] cursor-pointer"
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-[#d4f00d] hover:bg-[#c6e004] text-[#0f172a] text-xs font-bold font-headline transition-transform active:scale-98 shadow-sm cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Confirmar y Reservar Turno</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
