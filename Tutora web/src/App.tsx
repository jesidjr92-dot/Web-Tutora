import React, { useState, useMemo } from 'react';
import { Tutor, Department, Booking } from './types';
import { INITIAL_TUTORS, INITIAL_BOOKINGS } from './data/mockData';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { FilterBar } from './components/FilterBar';
import { TutorCard } from './components/TutorCard';
import { BookingModal } from './components/BookingModal';
import { StudyRoomModal } from './components/StudyRoomModal';
import { BecomeTutorModal } from './components/BecomeTutorModal';
import { MyBookingsModal } from './components/MyBookingsModal';
import { MessageDrawer } from './components/MessageDrawer';
import { TutorDossierModal } from './components/TutorDossierModal';
import { BookOpen, Sparkles, Shield, HeartHandshake, GraduationCap } from 'lucide-react';

export default function App() {
  // Estado principal
  const [tutors, setTutors] = useState<Tutor[]>(INITIAL_TUTORS);
  const [bookings, setBookings] = useState<Booking[]>(INITIAL_BOOKINGS);

  // Filtros
  const [selectedUniversity, setSelectedUniversity] = useState<string>('Todas las universidades (Barranquilla)');
  const [selectedDepartment, setSelectedDepartment] = useState<Department>('Todos');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [availableTodayOnly, setAvailableTodayOnly] = useState<boolean>(false);
  const [maxHourlyRate, setMaxHourlyRate] = useState<number>(45000);
  const [sortBy, setSortBy] = useState<'rating' | 'price_low' | 'price_high' | 'sessions'>('rating');

  // Modales
  const [selectedTutorForBooking, setSelectedTutorForBooking] = useState<Tutor | null>(null);
  const [activeStudyRoomBooking, setActiveStudyRoomBooking] = useState<Booking | null>(null);
  const [selectedTutorForDossier, setSelectedTutorForDossier] = useState<Tutor | null>(null);
  const [selectedTutorForChat, setSelectedTutorForChat] = useState<Tutor | null>(null);
  const [isBecomeTutorOpen, setIsBecomeTutorOpen] = useState<boolean>(false);
  const [isMyBookingsOpen, setIsMyBookingsOpen] = useState<boolean>(false);

  // Filtrado y ordenamiento
  const filteredTutors = useMemo(() => {
    return tutors
      .filter((tutor) => {
        if (selectedUniversity !== 'Todas las universidades (Barranquilla)' && tutor.university !== selectedUniversity) {
          return false;
        }

        if (selectedDepartment !== 'Todos' && tutor.department !== selectedDepartment) {
          return false;
        }

        if (availableTodayOnly && !tutor.availableToday) {
          return false;
        }

        if (tutor.hourlyRate > maxHourlyRate) {
          return false;
        }

        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase().trim();
          const matchName = tutor.name.toLowerCase().includes(query);
          const matchUniversity = tutor.university.toLowerCase().includes(query);
          const matchCourses = tutor.courseCodes.some((code) => code.toLowerCase().includes(query));
          const matchBio = tutor.bio.toLowerCase().includes(query);
          const matchSyllabus = tutor.syllabusHighlights.some((h) => h.toLowerCase().includes(query));

          if (!matchName && !matchUniversity && !matchCourses && !matchBio && !matchSyllabus) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'rating') {
          return b.rating - a.rating;
        }
        if (sortBy === 'sessions') {
          return b.totalSessions - a.totalSessions;
        }
        if (sortBy === 'price_low') {
          return a.hourlyRate - b.hourlyRate;
        }
        if (sortBy === 'price_high') {
          return b.hourlyRate - a.hourlyRate;
        }
        return 0;
      });
  }, [tutors, selectedUniversity, selectedDepartment, availableTodayOnly, maxHourlyRate, searchQuery, sortBy]);

  const hasActiveFilters = useMemo(() => {
    return (
      selectedUniversity !== 'Todas las universidades (Barranquilla)' ||
      selectedDepartment !== 'Todos' ||
      availableTodayOnly ||
      maxHourlyRate < 45000 ||
      searchQuery.length > 0 ||
      sortBy !== 'rating'
    );
  }, [selectedUniversity, selectedDepartment, availableTodayOnly, maxHourlyRate, searchQuery, sortBy]);

  const handleResetFilters = () => {
    setSelectedUniversity('Todas las universidades (Barranquilla)');
    setSelectedDepartment('Todos');
    setAvailableTodayOnly(false);
    setMaxHourlyRate(45000);
    setSearchQuery('');
    setSortBy('rating');
  };

  const handleConfirmBooking = (newBooking: Booking) => {
    setBookings((prev) => [newBooking, ...prev]);
  };

  const handleCancelBooking = (bookingId: string) => {
    setBookings((prev) => prev.filter((b) => b.id !== bookingId));
  };

  const handleAddTutor = (newTutor: Tutor) => {
    setTutors((prev) => [newTutor, ...prev]);
  };

  // Lanzador de sesión de prueba
  const launchStudyRoomSandbox = () => {
    const sandboxBooking: Booking = {
      id: `sandbox-${Date.now()}`,
      tutorId: tutors[0]?.id || 'tutor-1',
      tutorName: tutors[0]?.name || 'Mariana Rostova',
      tutorAvatar: tutors[0]?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      university: tutors[0]?.university || 'Universidad del Norte (Uninorte)',
      courseCode: tutors[0]?.courseCodes[0] || 'Estructuras de Datos',
      format: 'Inmersión conceptual 1 a 1',
      date: 'Sesión de Prueba en Vivo',
      timeSlot: 'Ahora',
      locationType: 'virtual',
      campusRoom: 'Sala de Estudio Interactiva Tutora',
      meetLink: 'https://tutora.room/sandbox',
      notes: 'Modo Sandbox: Probando pizarra digital, editor de código y chat en tiempo real.',
      hourlyRate: 35000,
      totalPrice: 35000,
      status: 'in_progress',
      createdAt: new Date().toISOString()
    };
    setActiveStudyRoomBooking(sandboxBooking);
  };

  return (
    <div className="min-h-screen bg-[#f7f9fb] flex flex-col font-sans selection:bg-[#d4f00d] selection:text-[#0f172a]">
      {/* 1. Encabezado Tutora */}
      <Header
        selectedUniversity={selectedUniversity}
        onSelectUniversity={setSelectedUniversity}
        bookingCount={bookings.length}
        onOpenBookings={() => setIsMyBookingsOpen(true)}
        onOpenBecomeTutor={() => setIsBecomeTutorOpen(true)}
        onOpenStudyRoomSandbox={launchStudyRoomSandbox}
      />

      {/* 2. Portada */}
      <HeroSection
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSelectQuickTag={(course) => setSearchQuery(course)}
        availableTodayOnly={availableTodayOnly}
        onToggleAvailableToday={() => setAvailableTodayOnly(!availableTodayOnly)}
      />

      {/* 3. Filtros */}
      <FilterBar
        selectedDepartment={selectedDepartment}
        onSelectDepartment={setSelectedDepartment}
        maxHourlyRate={maxHourlyRate}
        onMaxHourlyRateChange={setMaxHourlyRate}
        sortBy={sortBy}
        onSortChange={setSortBy}
        totalResults={filteredTutors.length}
        onResetFilters={handleResetFilters}
        hasActiveFilters={hasActiveFilters}
      />

      {/* 4. Directorio de Monitores */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full">
        {filteredTutors.length === 0 ? (
          <div className="bg-[#ffffff] rounded-2xl border border-[#e2e8f0] p-12 text-center max-w-lg mx-auto shadow-xs">
            <BookOpen className="w-12 h-12 text-[#94a3b8] mx-auto mb-3" />
            <h2 className="font-headline font-bold text-lg text-[#0f172a] mb-1">
              No encontramos monitores para este filtro
            </h2>
            <p className="text-xs text-[#64748b] mb-6">
              Prueba modificando la búsqueda, ampliando el rango de tarifa o seleccionando otra universidad de Barranquilla.
            </p>
            <button
              onClick={handleResetFilters}
              className="px-5 py-2.5 rounded-xl bg-[#0f172a] hover:bg-[#1e293b] text-[#ffffff] text-xs font-semibold font-headline transition-colors cursor-pointer"
            >
              Restablecer Filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTutors.map((tutor) => (
              <TutorCard
                key={tutor.id}
                tutor={tutor}
                onBook={(t) => setSelectedTutorForBooking(t)}
                onOpenChat={(t) => setSelectedTutorForChat(t)}
                onViewDossier={(t) => setSelectedTutorForDossier(t)}
              />
            ))}
          </div>
        )}
      </main>

      {/* 5. Franja de Compromiso Universitario en Barranquilla */}
      <section className="bg-[#ffffff] border-t border-[#e2e8f0] py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#f8fafc] border border-[#e2e8f0] text-[#0f172a] flex items-center justify-center shrink-0">
                <Shield className="w-5 h-5 text-[#3b82f6]" />
              </div>
              <div>
                <h3 className="font-headline font-bold text-sm text-[#0f172a]">
                  Compromiso de Integridad Académica
                </h3>
                <p className="text-xs text-[#64748b] mt-1 leading-relaxed">
                  Tutora opera bajo los estatutos estudiantiles de las universidades de Barranquilla. Promovemos el aprendizaje autónomo, la resolución lógica y el refuerzo conceptual.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#f8fafc] border border-[#e2e8f0] text-[#0f172a] flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5 text-[#586400]" />
              </div>
              <div>
                <h3 className="font-headline font-bold text-sm text-[#0f172a]">
                  Tarifas en Pesos Colombianos (COP)
                </h3>
                <p className="text-xs text-[#64748b] mt-1 leading-relaxed">
                  0% de comisión de intermediarios. Todo el pago va directamente al monitor o estudiante par mediante transferencia directa local.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#f8fafc] border border-[#e2e8f0] text-[#0f172a] flex items-center justify-center shrink-0">
                <HeartHandshake className="w-5 h-5 text-[#0f172a]" />
              </div>
              <div>
                <h3 className="font-headline font-bold text-sm text-[#0f172a]">
                  Monitores Verificados en Barranquilla
                </h3>
                <p className="text-xs text-[#64748b] mt-1 leading-relaxed">
                  Verificación de identidad con correo institucional (.edu.co) y certificado de notas altas en Uninorte, Uniatlántico, CUC, Unisimón, Unilibre y Uniautónoma.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Pie de Página */}
      <footer className="bg-[#f7f9fb] border-t border-[#e2e8f0] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#64748b]">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-[#0f172a] text-[#d4f00d] flex items-center justify-center">
              <GraduationCap className="w-4 h-4 text-[#d4f00d]" />
            </div>
            <span className="font-headline font-bold text-sm text-[#0f172a]">Tutora</span>
            <span>·</span>
            <span>Tutorías Universitarias en Barranquilla</span>
          </div>
          <div>
            Uninorte · Uniatlántico · CUC · Unisimón · Unilibre · Uniautónoma
          </div>
        </div>
      </footer>

      {/* Modales y Paneles */}
      {selectedTutorForBooking && (
        <BookingModal
          tutor={selectedTutorForBooking}
          onClose={() => setSelectedTutorForBooking(null)}
          onConfirmBooking={handleConfirmBooking}
          onOpenStudyRoom={(booking) => {
            setSelectedTutorForBooking(null);
            setActiveStudyRoomBooking(booking);
          }}
        />
      )}

      {activeStudyRoomBooking && (
        <StudyRoomModal
          booking={activeStudyRoomBooking}
          onClose={() => setActiveStudyRoomBooking(null)}
        />
      )}

      {selectedTutorForDossier && (
        <TutorDossierModal
          tutor={selectedTutorForDossier}
          isOpen={true}
          onClose={() => setSelectedTutorForDossier(null)}
          onBook={(t) => {
            setSelectedTutorForDossier(null);
            setSelectedTutorForBooking(t);
          }}
          onOpenChat={(t) => {
            setSelectedTutorForDossier(null);
            setSelectedTutorForChat(t);
          }}
        />
      )}

      {selectedTutorForChat && (
        <MessageDrawer
          tutor={selectedTutorForChat}
          isOpen={true}
          onClose={() => setSelectedTutorForChat(null)}
          onProceedToBook={(t) => {
            setSelectedTutorForChat(null);
            setSelectedTutorForBooking(t);
          }}
        />
      )}

      <BecomeTutorModal
        isOpen={isBecomeTutorOpen}
        onClose={() => setIsBecomeTutorOpen(false)}
        onAddTutor={handleAddTutor}
      />

      <MyBookingsModal
        isOpen={isMyBookingsOpen}
        onClose={() => setIsMyBookingsOpen(false)}
        bookings={bookings}
        onCancelBooking={handleCancelBooking}
        onLaunchStudyRoom={(b) => setActiveStudyRoomBooking(b)}
      />
    </div>
  );
}
