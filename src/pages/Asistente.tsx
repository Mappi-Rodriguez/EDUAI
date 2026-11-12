// src/pages/Asistente.tsx
import { useState } from 'react'
import { Send, Bot, User, Sparkles } from 'lucide-react'

interface Mensaje {
  id: number
  texto: string
  esUsuario: boolean
}

export default function Asistente() {
  const [mensaje, setMensaje] = useState('')
  const [mensajes, setMensajes] = useState<Mensaje[]>([
    {
      id: 1,
      texto: '¡Hola! 👋 Soy el Asistente de Educación de EDUAI. ¿En qué puedo ayudarte hoy?',
      esUsuario: false,
    },
  ])

  const enviarMensaje = (e: React.FormEvent) => {
    e.preventDefault()
    if (!mensaje.trim()) return

    // Agregar mensaje del usuario
    const nuevoMensaje: Mensaje = {
      id: Date.now(),
      texto: mensaje,
      esUsuario: true,
    }
    setMensajes([...mensajes, nuevoMensaje])
    setMensaje('')

    // Respuesta simulada del asistente (después conectaremos IA real)
    setTimeout(() => {
      const respuesta: Mensaje = {
        id: Date.now() + 1,
        texto: '¡Buena pregunta! Estoy aprendiendo a responder. Pronto podré ayudarte con tus tareas. 🤖',
        esUsuario: false,
      }
      setMensajes((prev) => [...prev, respuesta])
    }, 1000)
  }

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-140px)] flex flex-col">
      {/* Header del Chat */}
      <div className="bg-gradient-to-r from-eduai-primary to-eduai-lavender rounded-t-2xl p-6 text-white flex items-center gap-4">
        <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center">
          <Bot className="w-8 h-8" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Asistente de Educación</h1>
          <p className="text-blue-100 flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            Tu compañero de aprendizaje con IA
          </p>
        </div>
      </div>

      {/* Área de mensajes */}
      <div className="flex-1 bg-white dark:bg-eduai-surface border-x border-gray-200 dark:border-gray-700 p-6 overflow-y-auto space-y-4">
        {mensajes.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 ${msg.esUsuario ? 'justify-end' : 'justify-start'}`}
          >
            {!msg.esUsuario && (
              <div className="w-8 h-8 bg-eduai-primary rounded-full flex items-center justify-center flex-shrink-0">
                <Bot className="w-5 h-5 text-white" />
              </div>
            )}
            <div
              className={`max-w-[70%] px-4 py-3 rounded-2xl ${
                msg.esUsuario
                  ? 'bg-eduai-primary text-white rounded-br-md'
                  : 'bg-gray-100 dark:bg-eduai-deep/30 text-eduai-deep dark:text-white rounded-bl-md'
              }`}
            >
              <p className="text-sm">{msg.texto}</p>
            </div>
            {msg.esUsuario && (
              <div className="w-8 h-8 bg-eduai-lavender rounded-full flex items-center justify-center flex-shrink-0">
                <User className="w-5 h-5 text-white" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Input para escribir */}
      <form
        onSubmit={enviarMensaje}
        className="bg-white dark:bg-eduai-surface border border-gray-200 dark:border-gray-700 rounded-b-2xl p-4 flex gap-3"
      >
        <input
          type="text"
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          placeholder="Escribe tu pregunta aquí..."
          className="flex-1 px-4 py-3 bg-gray-50 dark:bg-eduai-deep/30 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-eduai-primary dark:text-white"
        />
        <button
          type="submit"
          className="bg-gradient-to-r from-eduai-primary to-eduai-lavender text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all flex items-center gap-2"
        >
          <Send className="w-4 h-4" />
          Enviar
        </button>
      </form>
    </div>
  )
}