import React, { useState } from 'react';
import { Tutor } from '../types';
import { formatCOP } from '../utils/formatCurrency';
import { X, Send, Sparkles, CheckCircle2 } from 'lucide-react';

interface MessageDrawerProps {
  tutor: Tutor | null;
  isOpen: boolean;
  onClose: () => void;
  onProceedToBook: (tutor: Tutor) => void;
}

export const MessageDrawer: React.FC<MessageDrawerProps> = ({
  tutor,
  isOpen,
  onClose,
  onProceedToBook,
}) => {
  if (!isOpen || !tutor) return null;

  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'tutor'; text: string; time: string }>>([
    {
      sender: 'tutor',
      text: `¡Hola! Soy ${tutor.name}. ¿Tienes dudas sobre el temario o preparación de exámenes para ${tutor.courseCodes.join(', ')}?`,
      time: '14:22'
    }
  ]);
  const [inputText, setInputText] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMessage = inputText.trim();
    setInputText('');

    setMessages((prev) => [
      ...prev,
      {
        sender: 'user',
        text: userMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);

    setTimeout(() => {
      const answers = [
        `¡Claro que sí! Tengo parciales y talleres pasados resueltos de profesores de ${tutor.university}. Lo repasamos a fondo.`,
        `Sí, claro, podemos revisar paso a paso los ejercicios del taller antes de la fecha de entrega.`,
        `Ese tema entra fijo en el examen. Agendemos una sesión para desglosar la intuición paso a paso.`
      ];
      const randomAnswer = answers[Math.floor(Math.random() * answers.length)];
      setMessages((prev) => [
        ...prev,
        {
          sender: 'tutor',
          text: randomAnswer,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-[#0f172a]/50 backdrop-blur-xs">
      <div className="bg-[#ffffff] w-full max-w-md h-full flex flex-col shadow-2xl border-l border-[#e2e8f0] animate-in slide-in-from-right duration-200">
        
        {/* Cabecera */}
        <div className="p-4 border-b border-[#e2e8f0] flex items-center justify-between bg-[#f8fafc]">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={tutor.avatarUrl}
                alt={tutor.name}
                className="w-10 h-10 rounded-full object-cover border border-[#e2e8f0]"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#10b981] border-2 border-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 font-headline font-bold text-sm text-[#0f172a]">
                <span>{tutor.name}</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-[#3b82f6]" />
              </div>
              <div className="text-[11px] text-[#64748b]">
                {tutor.university} · Responde {tutor.responseSpeed}
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Cerrar panel de mensajes"
            className="p-1.5 rounded-lg text-[#64748b] hover:text-[#0f172a] hover:bg-[#eceef0] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Barra de compatibilidad */}
        <div className="px-4 py-2.5 bg-[#d4f00d]/15 border-b border-[#d4f00d]/30 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 font-medium text-[#0f172a]">
            <Sparkles className="w-3.5 h-3.5 text-[#586400]" />
            <span>Tarifa: {formatCOP(tutor.hourlyRate)}/hr</span>
          </div>
          <button
            onClick={() => {
              onClose();
              onProceedToBook(tutor);
            }}
            className="text-[11px] font-bold text-[#0f172a] hover:underline font-headline cursor-pointer"
          >
            Reservar Ahora →
          </button>
        </div>

        {/* Mensajes */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#ffffff]">
          {messages.map((m, idx) => {
            const isUser = m.sender === 'user';
            return (
              <div
                key={idx}
                className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`p-3 rounded-2xl text-xs max-w-[85%] leading-relaxed ${
                    isUser
                      ? 'bg-[#0f172a] text-[#ffffff] rounded-tr-none'
                      : 'bg-[#f1f5f9] text-[#0f172a] rounded-tl-none border border-[#e2e8f0]'
                  }`}
                >
                  {m.text}
                </div>
                <span className="text-[10px] text-[#94a3b8] mt-1 px-1">{m.time}</span>
              </div>
            );
          })}
        </div>

        {/* Input */}
        <form onSubmit={handleSend} className="p-3 border-t border-[#e2e8f0] bg-[#f8fafc] flex gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Pregunta sobre el taller o los parciales..."
            className="flex-1 px-3 py-2 rounded-xl border border-[#e2e8f0] text-xs text-[#0f172a] placeholder-[#94a3b8] focus:outline-none focus:border-[#0f172a] bg-[#ffffff]"
          />
          <button
            type="submit"
            aria-label="Enviar mensaje"
            className="p-2.5 rounded-xl bg-[#0f172a] hover:bg-[#1e293b] text-[#ffffff] cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
