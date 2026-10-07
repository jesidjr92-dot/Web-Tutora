import React, { useState, useRef, useEffect } from 'react';
import { Booking } from '../types';
import { 
  X, Play, Pause, RotateCcw, PenTool, Eraser, Code2, 
  CheckSquare, Send, Mic, MicOff, 
  Video, VideoOff, Trash2, GraduationCap
} from 'lucide-react';

interface StudyRoomModalProps {
  booking: Booking | null;
  onClose: () => void;
}

export const StudyRoomModal: React.FC<StudyRoomModalProps> = ({
  booking,
  onClose,
}) => {
  if (!booking) return null;

  // Temporizador de estudio (50 minutos = 3000 segundos)
  const [secondsLeft, setSecondsLeft] = useState<number>(50 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(true);

  // Pestañas
  const [activeTab, setActiveTab] = useState<'whiteboard' | 'scratchpad' | 'checklist'>('whiteboard');

  // Micrófono y Cámara
  const [isMicOn, setIsMicOn] = useState<boolean>(true);
  const [isCamOn, setIsCamOn] = useState<boolean>(true);

  // Chat
  const [chatMessages, setChatMessages] = useState<Array<{ sender: string; text: string; time: string }>>([
    {
      sender: booking.tutorName,
      text: `¡Hola! Bienvenido(a) a la sala de estudio de Tutora para ${booking.courseCode}. ¿Qué temas o ejercicios del taller revisamos primero?`,
      time: '14:00'
    }
  ]);
  const [inputChat, setInputChat] = useState<string>('');

  // Lista de objetivos
  const [checklist, setChecklist] = useState<Array<{ id: number; text: string; completed: boolean }>>([
    { id: 1, text: `Descomponer invariante principal para ${booking.courseCode}`, completed: true },
    { id: 2, text: 'Revisar casos extremos de la guía en la pizarra', completed: false },
    { id: 3, text: 'Seguir algoritmo o demostración línea por línea', completed: false },
    { id: 4, text: 'Revisar preguntas trampa de exámenes anteriores', completed: false },
  ]);
  const [newCheckItem, setNewCheckItem] = useState<string>('');

  // Bloc de código y fórmulas
  const [codeContent, setCodeContent] = useState<string>(
    `// ${booking.courseCode} - Bloc Colaborativo de Tutora\n` +
    `// Monitor: ${booking.tutorName} (${booking.university})\n\n` +
    `function resolverEjercicio(casoDePrueba) {\n` +
    `  console.log("Analizando caso de estudio:", casoDePrueba);\n` +
    `  // Paso 1: Condición base\n` +
    `  if (!casoDePrueba) return null;\n\n` +
    `  // Paso 2: Validación de invariante\n` +
    `  const resultado = casoDePrueba.map(x => x * 2);\n` +
    `  return resultado;\n` +
    `}\n\n` +
    `console.log("Resultado:", resolverEjercicio([10, 20, 30]));`
  );
  const [scratchpadOutput, setScratchpadOutput] = useState<string>('');

  // Pizarra
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [drawColor, setDrawColor] = useState<string>('#0f172a');
  const [tool, setTool] = useState<'pen' | 'eraser'>('pen');
  const [lineWidth, setLineWidth] = useState<number>(3);

  // Efecto temporizador
  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, secondsLeft]);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainder.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = '14px Space Grotesk';
    ctx.fillStyle = '#64748b';
    ctx.fillText(`✎ Pizarra interactiva para ${booking.courseCode} — Dibuja diagramas, fórmulas o árboles`, 24, 32);
  }, []);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.strokeStyle = tool === 'eraser' ? '#ffffff' : drawColor;
    ctx.lineWidth = tool === 'eraser' ? 24 : lineWidth;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (ctx) ctx.closePath();
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  const runScratchpad = () => {
    try {
      let logs: string[] = [];
      const customConsole = {
        log: (...args: any[]) => logs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' '))
      };
      const runFn = new Function('console', codeContent);
      runFn(customConsole);
      setScratchpadOutput(logs.join('\n') || 'Ejecutado correctamente sin salidas.');
    } catch (err: any) {
      setScratchpadOutput(`Error de Ejecución: ${err.message}`);
    }
  };

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputChat.trim()) return;

    const userText = inputChat;
    setInputChat('');

    const newMsgs = [
      ...chatMessages,
      { sender: 'Tú', text: userText, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
    ];
    setChatMessages(newMsgs);

    setTimeout(() => {
      const tutorResponses = [
        `¡Exacto! Observa cómo se conserva el invariante en cada paso inductivo aquí.`,
        `Esa es una pregunta trampa típica del examen. Recuerda la condición de borde para N=1.`,
        `Déjame dibujarlo en la pizarra ahora mismo para que veas el procedimiento con claridad.`,
        `Muy bien razonado. Si anotas esto en tu hoja de resumen, asegurarás la nota en ese punto.`
      ];
      const randomReply = tutorResponses[Math.floor(Math.random() * tutorResponses.length)];
      setChatMessages((prev) => [
        ...prev,
        {
          sender: booking.tutorName,
          text: randomReply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 1200);
  };

  const toggleCheckItem = (id: number) => {
    setChecklist(checklist.map(item => item.id === id ? { ...item, completed: !item.completed } : item));
  };

  const addCheckItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCheckItem.trim()) return;
    setChecklist([...checklist, { id: Date.now(), text: newCheckItem.trim(), completed: false }]);
    setNewCheckItem('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-[#0f172a]/75 backdrop-blur-md">
      <div className="bg-[#ffffff] rounded-[1.5rem] border border-[#e2e8f0] shadow-2xl w-full max-w-6xl h-[92vh] flex flex-col overflow-hidden animate-in fade-in duration-150">
        
        {/* Barra superior de control con marca Tutora */}
        <div className="bg-[#0f172a] text-[#ffffff] px-6 py-3.5 flex items-center justify-between border-b border-[#1e293b]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#d4f00d] text-[#0f172a] flex items-center justify-center shadow-xs">
              <GraduationCap className="w-5 h-5 text-[#0f172a]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-headline font-bold text-sm tracking-tight text-[#ffffff]">
                  Tutora · Sala en Vivo: {booking.courseCode}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#d4f00d]/20 text-[#d4f00d] text-[10px] font-bold">
                  EN VIVO
                </span>
              </div>
              <div className="text-[11px] text-[#94a3b8] flex items-center gap-2">
                <span>Con {booking.tutorName} ({booking.university})</span>
                <span>·</span>
                <span>{booking.format}</span>
              </div>
            </div>
          </div>

          {/* Temporizador Pomodoro */}
          <div className="flex items-center gap-2 bg-[#1e293b] px-3.5 py-1.5 rounded-xl border border-[#334155]">
            <span className="font-headline text-base font-bold text-[#d4f00d] tracking-wider w-14 text-center">
              {formatTime(secondsLeft)}
            </span>
            <button
              onClick={() => setIsTimerRunning(!isTimerRunning)}
              className="p-1 rounded-md text-[#cbd5e1] hover:text-[#ffffff] hover:bg-[#334155] cursor-pointer"
              title={isTimerRunning ? 'Pausar Temporizador' : 'Reanudar Temporizador'}
            >
              {isTimerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={() => { setSecondsLeft(50 * 60); setIsTimerRunning(false); }}
              className="p-1 rounded-md text-[#cbd5e1] hover:text-[#ffffff] hover:bg-[#334155] cursor-pointer"
              title="Reiniciar a 50:00"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Medios y Salida */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMicOn(!isMicOn)}
              className={`p-2 rounded-xl text-xs transition-colors cursor-pointer ${
                isMicOn ? 'bg-[#1e293b] text-[#ffffff]' : 'bg-[#ba1a1a] text-[#ffffff]'
              }`}
              title={isMicOn ? 'Silenciar Micrófono' : 'Activar Micrófono'}
            >
              {isMicOn ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
            </button>

            <button
              onClick={() => setIsCamOn(!isCamOn)}
              className={`p-2 rounded-xl text-xs transition-colors cursor-pointer ${
                isCamOn ? 'bg-[#1e293b] text-[#ffffff]' : 'bg-[#ba1a1a] text-[#ffffff]'
              }`}
              title={isCamOn ? 'Apagar Cámara' : 'Encender Cámara'}
            >
              {isCamOn ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
            </button>

            <button
              onClick={onClose}
              className="ml-2 p-2 rounded-xl text-[#94a3b8] hover:text-[#ffffff] hover:bg-[#1e293b] cursor-pointer"
              title="Salir de la Sala"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Grilla principal */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden bg-[#f8fafc]">
          
          {/* Área de trabajo central */}
          <div className="lg:col-span-8 flex flex-col border-r border-[#e2e8f0] bg-[#ffffff] overflow-hidden">
            
            {/* Barra de herramientas */}
            <div className="flex items-center justify-between px-6 py-2.5 border-b border-[#e2e8f0] bg-[#f8fafc]">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab('whiteboard')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                    activeTab === 'whiteboard'
                      ? 'bg-[#0f172a] text-[#ffffff] shadow-xs'
                      : 'bg-[#ffffff] text-[#475569] hover:bg-[#eceef0] border border-[#e2e8f0]'
                  }`}
                >
                  <PenTool className="w-3.5 h-3.5" />
                  <span>Pizarra</span>
                </button>

                <button
                  onClick={() => setActiveTab('scratchpad')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                    activeTab === 'scratchpad'
                      ? 'bg-[#0f172a] text-[#ffffff] shadow-xs'
                      : 'bg-[#ffffff] text-[#475569] hover:bg-[#eceef0] border border-[#e2e8f0]'
                  }`}
                >
                  <Code2 className="w-3.5 h-3.5" />
                  <span>Editor de Código / Fórmulas</span>
                </button>

                <button
                  onClick={() => setActiveTab('checklist')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                    activeTab === 'checklist'
                      ? 'bg-[#0f172a] text-[#ffffff] shadow-xs'
                      : 'bg-[#ffffff] text-[#475569] hover:bg-[#eceef0] border border-[#e2e8f0]'
                  }`}
                >
                  <CheckSquare className="w-3.5 h-3.5" />
                  <span>Temario ({checklist.filter(c => c.completed).length}/{checklist.length})</span>
                </button>
              </div>

              {/* Controles de pizarra */}
              {activeTab === 'whiteboard' && (
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {['#0f172a', '#d4f00d', '#3b82f6', '#ba1a1a'].map((col) => (
                      <button
                        key={col}
                        onClick={() => { setDrawColor(col); setTool('pen'); }}
                        style={{ backgroundColor: col }}
                        className={`w-5 h-5 rounded-full border-2 transition-transform cursor-pointer ${
                          drawColor === col && tool === 'pen' ? 'scale-110 border-[#0f172a] shadow-xs' : 'border-white'
                        }`}
                        title={`Color ${col}`}
                      />
                    ))}
                  </div>

                  <div className="h-4 w-px bg-[#cbd5e1] mx-1" />

                  <button
                    onClick={() => setTool(tool === 'eraser' ? 'pen' : 'eraser')}
                    className={`p-1.5 rounded-lg text-xs border transition-colors cursor-pointer ${
                      tool === 'eraser' ? 'bg-[#0f172a] text-[#ffffff] border-[#0f172a]' : 'bg-[#ffffff] text-[#64748b] border-[#e2e8f0]'
                    }`}
                    title="Borrador"
                  >
                    <Eraser className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={clearCanvas}
                    className="p-1.5 rounded-lg text-xs bg-[#ffffff] hover:bg-[#fee2e2] text-[#ba1a1a] border border-[#e2e8f0] cursor-pointer"
                    title="Limpiar Pizarra"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>

            {/* Visualizador de trabajo */}
            <div className="flex-1 relative overflow-auto p-4 flex flex-col">
              
              {/* TAB 1: Pizarra */}
              {activeTab === 'whiteboard' && (
                <div className="w-full h-full flex flex-col">
                  <div className="flex-1 border border-[#e2e8f0] rounded-xl overflow-hidden bg-white shadow-inner relative">
                    <canvas
                      ref={canvasRef}
                      width={800}
                      height={500}
                      onMouseDown={startDrawing}
                      onMouseMove={draw}
                      onMouseUp={stopDrawing}
                      onMouseLeave={stopDrawing}
                      className="w-full h-full cursor-crosshair block"
                    />
                  </div>
                  <div className="text-[11px] text-[#64748b] mt-2 flex items-center justify-between">
                    <span>Pizarra colaborativa en tiempo real</span>
                    <span>Usa el ratón o lápiz para trazar demostraciones y gráficos</span>
                  </div>
                </div>
              )}

              {/* TAB 2: Scratchpad */}
              {activeTab === 'scratchpad' && (
                <div className="flex-1 flex flex-col space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#0f172a]">
                      Bloc interactivo de código / fórmulas
                    </span>
                    <button
                      onClick={runScratchpad}
                      className="px-4 py-1.5 rounded-lg bg-[#d4f00d] hover:bg-[#c6e004] text-[#0f172a] font-bold text-xs font-headline cursor-pointer flex items-center gap-1.5"
                    >
                      <Play className="w-3 h-3 fill-[#0f172a]" />
                      <span>Ejecutar Código</span>
                    </button>
                  </div>

                  <textarea
                    value={codeContent}
                    onChange={(e) => setCodeContent(e.target.value)}
                    className="flex-1 w-full p-3 font-mono text-xs bg-[#0f172a] text-[#f8fafc] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#d4f00d] resize-none"
                    spellCheck={false}
                  />

                  {/* Consola */}
                  <div className="h-28 bg-[#1e293b] rounded-xl p-3 font-mono text-xs text-[#a5f3fc] overflow-y-auto border border-[#334155]">
                    <div className="text-[10px] text-[#94a3b8] uppercase tracking-wider mb-1">
                      Consola de Resultados:
                    </div>
                    {scratchpadOutput || '// Haz clic en "Ejecutar Código" para verificar el resultado.'}
                  </div>
                </div>
              )}

              {/* TAB 3: Temario */}
              {activeTab === 'checklist' && (
                <div className="flex-1 flex flex-col space-y-4 max-w-xl mx-auto w-full pt-4">
                  <div className="text-sm font-headline font-bold text-[#0f172a]">
                    Metas de aprendizaje y temas a revisar
                  </div>

                  <form onSubmit={addCheckItem} className="flex gap-2">
                    <input
                      type="text"
                      value={newCheckItem}
                      onChange={(e) => setNewCheckItem(e.target.value)}
                      placeholder="Añadir punto o ejercicio a repasar..."
                      className="flex-1 px-3 py-2 rounded-xl border border-[#e2e8f0] text-xs text-[#0f172a] focus:outline-none focus:border-[#0f172a]"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl bg-[#0f172a] text-[#ffffff] text-xs font-bold font-headline cursor-pointer hover:bg-[#1e293b]"
                    >
                      Añadir Meta
                    </button>
                  </form>

                  <div className="space-y-2 mt-2">
                    {checklist.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => toggleCheckItem(item.id)}
                        className={`flex items-center gap-3 p-3 rounded-xl border text-xs cursor-pointer transition-colors ${
                          item.completed
                            ? 'bg-[#f8fafc] border-[#e2e8f0] text-[#94a3b8] line-through'
                            : 'bg-[#ffffff] border-[#e2e8f0] text-[#0f172a] hover:border-[#94a3b8]'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={item.completed}
                          onChange={() => {}}
                          className="w-4 h-4 accent-[#0f172a] rounded cursor-pointer"
                        />
                        <span className="font-medium">{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Panel derecho: Presencia del Tutor y Chat */}
          <div className="lg:col-span-4 flex flex-col bg-[#ffffff] h-full overflow-hidden">
            
            {/* Tarjeta de estado del tutor */}
            <div className="p-4 border-b border-[#e2e8f0] bg-[#f8fafc]">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src={booking.tutorAvatar}
                    alt={booking.tutorName}
                    className="w-12 h-12 rounded-xl object-cover border border-[#e2e8f0]"
                  />
                  <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#10b981] border-2 border-white" />
                </div>
                <div>
                  <div className="font-headline font-bold text-xs text-[#0f172a]">
                    {booking.tutorName} (En línea)
                  </div>
                  <div className="text-[11px] text-[#64748b]">
                    Audio y video conectados · Barranquilla
                  </div>
                  <div className="text-[10px] text-[#586400] font-semibold mt-0.5">
                    Monitor Verificado · {booking.university}
                  </div>
                </div>
              </div>
            </div>

            {/* Mensajes del chat */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#ffffff]">
              {chatMessages.map((msg, index) => {
                const isMe = msg.sender === 'Tú';
                return (
                  <div
                    key={index}
                    className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                  >
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className="text-[10px] font-semibold text-[#64748b]">{msg.sender}</span>
                      <span className="text-[10px] text-[#94a3b8]">{msg.time}</span>
                    </div>
                    <div
                      className={`p-3 rounded-2xl text-xs max-w-[85%] leading-relaxed ${
                        isMe
                          ? 'bg-[#0f172a] text-[#ffffff] rounded-tr-none'
                          : 'bg-[#f1f5f9] text-[#0f172a] rounded-tl-none border border-[#e2e8f0]'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Entrada del chat */}
            <form onSubmit={handleSendChat} className="p-3 border-t border-[#e2e8f0] bg-[#f8fafc] flex gap-2">
              <input
                type="text"
                value={inputChat}
                onChange={(e) => setInputChat(e.target.value)}
                placeholder="Escribe tu consulta o duda..."
                className="flex-1 px-3 py-2 rounded-xl border border-[#e2e8f0] text-xs text-[#0f172a] placeholder-[#94a3b8] focus:outline-none focus:border-[#0f172a] bg-[#ffffff]"
              />
              <button
                type="submit"
                aria-label="Enviar mensaje al tutor"
                className="p-2 rounded-xl bg-[#d4f00d] hover:bg-[#c6e004] text-[#0f172a] cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
