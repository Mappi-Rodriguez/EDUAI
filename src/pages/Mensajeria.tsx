import { useState } from 'react'
import { Search, Send, Mail, User, MoreVertical, Phone } from 'lucide-react'

// --- DATOS SIMULADOS DE ALUMNOS (Con correos) ---
const ALUMNOS_DATA = [
  { id: 1, nombre: 'Mariapaz Rodríguez', correo: 'mariapaz.rodriguez@eduai.com', grado: '7mo Balanced', ultimoMsj: 'Profe, tengo una duda sobre la tarea...', hora: '10:30 AM', noLeidos: 2 },
  { id: 2, nombre: 'Lupe Martínez', correo: 'lupe.martinez@eduai.com', grado: '8vo Reflective', ultimoMsj: 'Ya envié el ejercicio de álgebra.', hora: '09:15 AM', noLeidos: 0 },
  { id: 3, nombre: 'Ashlie Gómez', correo: 'ashlie.gomez@eduai.com', grado: '9th Thinker', ultimoMsj: 'Gracias por la retroalimentación.', hora: 'Ayer', noLeidos: 0 },
  { id: 4, nombre: 'Nathan Galvez', correo: 'nathan.galvez@eduai.com', grado: '10th Communicator', ultimoMsj: '¿Podemos agendar una cita?', hora: 'Ayer', noLeidos: 1 },
  { id: 5, nombre: 'Alonso Pérez', correo: 'alonso.perez@eduai.com', grado: '7mo Balanced', ultimoMsj: 'Hola profe, buenos días.', hora: 'Lun', noLeidos: 0 },
]

// --- MENSAJES DE EJEMPLO PARA LA CONVERSACIÓN ---
const MENSAJES_EJEMPLO = {
  1: [
    { id: 1, emisor: 'alumno', texto: 'Hola Profe Nathaniel, buenas tardes.', hora: '10:25 AM' },
    { id: 2, emisor: 'profesor', texto: 'Hola Mariapaz, ¿en qué puedo ayudarte?', hora: '10:28 AM' },
    { id: 3, emisor: 'alumno', texto: 'Profe, tengo una duda sobre la tarea de historia. ¿El ensayo debe ser a mano o digital?', hora: '10:30 AM' },
  ],
  2: [
    { id: 1, emisor: 'alumno', texto: 'Profe, ya le envié el ejercicio de álgebra por correo.', hora: '09:15 AM' },
    { id: 2, emisor: 'profesor', texto: 'Perfecto Lupe, lo reviso en un momento.', hora: '09:20 AM' },
  ]
}

export default function Mensajeria() {
  const [alumnoSeleccionado, setAlumnoSeleccionado] = useState(ALUMNOS_DATA[0])
  const [mensajeNuevo, setMensajeNuevo] = useState('')
  const [mensajes, setMensajes] = useState(MENSAJES_EJEMPLO[1] || [])

  // Función para cambiar de chat
  const seleccionarChat = (alumno: any) => {
    setAlumnoSeleccionado(alumno)
    setMensajes(MENSAJES_EJEMPLO[alumno.id] || [])
  }

  // Función para enviar mensaje
  const enviarMensaje = () => {
    if (!mensajeNuevo.trim()) return
    
    const nuevoMensaje = {
      id: Date.now(),
      emisor: 'profesor',
      texto: mensajeNuevo,
      hora: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
    
    setMensajes([...mensajes, nuevoMensaje])
    setMensajeNuevo('')
  }

  return (
    <div className="h-[calc(100vh-100px)] flex bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden m-6">
      
      {/* ===== PANEL IZQUIERDO: LISTA DE ALUMNOS ===== */}
      <div className="w-80 border-r border-gray-200 flex flex-col bg-gray-50">
        {/* Buscador */}
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-bold text-eduai-deep mb-3">Mensajería</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Buscar alumno..." 
              className="w-full pl-9 pr-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-eduai-primary outline-none"
            />
          </div>
        </div>

        {/* Lista */}
        <div className="flex-1 overflow-y-auto">
          {ALUMNOS_DATA.map((alumno) => (
            <div 
              key={alumno.id}
              onClick={() => seleccionarChat(alumno)}
              className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-white transition-colors ${
                alumnoSeleccionado.id === alumno.id ? 'bg-white border-l-4 border-l-eduai-primary' : ''
              }`}
            >
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-semibold text-gray-800 text-sm">{alumno.nombre}</h3>
                <span className="text-xs text-gray-400">{alumno.hora}</span>
              </div>
              
              {/* CORREO DEL ALUMNO (Lo que pediste) */}
              <div className="flex items-center gap-1 text-xs text-gray-500 mb-2">
                <Mail className="w-3 h-3" />
                {alumno.correo}
              </div>

              <p className="text-xs text-gray-600 truncate">{alumno.ultimoMsj}</p>
              
              {alumno.noLeidos > 0 && (
                <span className="inline-block mt-2 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {alumno.noLeidos} nuevos
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ===== PANEL DERECHO: CONVERSACIÓN ===== */}
      <div className="flex-1 flex flex-col bg-white">
        {/* Header del Chat */}
        <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-eduai-light flex items-center justify-center text-eduai-primary font-bold">
              {alumnoSeleccionado.nombre.charAt(0)}
            </div>
            <div>
              <h3 className="font-bold text-gray-800">{alumnoSeleccionado.nombre}</h3>
              <p className="text-xs text-gray-500">{alumnoSeleccionado.grado}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="p-2 text-gray-400 hover:text-eduai-primary hover:bg-gray-50 rounded-full"><Phone className="w-5 h-5"/></button>
            <button className="p-2 text-gray-400 hover:text-eduai-primary hover:bg-gray-50 rounded-full"><MoreVertical className="w-5 h-5"/></button>
          </div>
        </div>

        {/* Área de Mensajes */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50/50">
          {mensajes.length === 0 ? (
            <div className="text-center text-gray-400 mt-10">No hay mensajes aún. ¡Saluda!</div>
          ) : (
            mensajes.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex ${msg.emisor === 'profesor' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[70%] p-3 rounded-2xl text-sm ${
                  msg.emisor === 'profesor' 
                    ? 'bg-eduai-primary text-white rounded-br-none' 
                    : 'bg-white border border-gray-200 text-gray-800 rounded-bl-none shadow-sm'
                }`}>
                  <p>{msg.texto}</p>
                  <p className={`text-[10px] mt-1 text-right ${msg.emisor === 'profesor' ? 'text-blue-100' : 'text-gray-400'}`}>
                    {msg.hora}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Input para escribir */}
        <div className="p-4 border-t border-gray-200 bg-white">
          <div className="flex gap-3 items-center">
            <input 
              type="text" 
              value={mensajeNuevo}
              onChange={(e) => setMensajeNuevo(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && enviarMensaje()}
              placeholder="Escribe un mensaje..." 
              className="flex-1 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-eduai-primary outline-none"
            />
            <button 
              onClick={enviarMensaje}
              className="p-3 bg-eduai-primary text-white rounded-xl hover:bg-eduai-deep transition shadow-sm"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

    </div>
  )
}