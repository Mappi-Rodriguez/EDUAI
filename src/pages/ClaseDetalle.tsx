import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { clases } from '../data/mockData'
import { 
  Folder, ChevronDown, ChevronRight, Home, X, Lock, 
  FilePlus, Lightbulb, BookOpen, HelpCircle, CheckCircle, 
  Trash2, GripVertical, Save, Clock, Eye, FileText,
  Sparkles, Send, Bot, User
} from 'lucide-react'

export default function ClaseDetalle() {
  const { id } = useParams()
  const navigate = useNavigate()
  const claseActual = (clases.find((c: any) => c.id === id) || clases[0]) as any

  const trimestres = [
    { nombre: 'I Trimestre', bloqueado: true, materiales: [] },
    { nombre: 'II Trimestre', bloqueado: true, materiales: [] },
    { 
      nombre: 'III Trimestre', bloqueado: false,
      materiales: [
        { id: 1, titulo: 'SEPARATA 1: fundamentos para la sostenibilidad', fecha: '08 Septiembre 2026 11:36:36 a.m.', contenido: 'La presente separata contiene el desarrollo de los conceptos sobre, 1. perspectivas ambientales y toma de decisiones, 2. El enfoque sistémico en el ambiente y 3. Sostenibilidad y sus dimensiones' },
        { id: 2, titulo: 'SEPARATA 2: Bases ecológicas para la gestión ambiental', fecha: '08 Septiembre 2026 11:37:05 a.m.', contenido: 'La presente separata cuenta con los conceptos sobre 1. Recursos naturales: uso, gestión y conflictos y 2. Conservación de la biodiversidad' },
        { id: 3, titulo: 'SEPARATA 3: problemáticas ambientales, globales y soluciones', fecha: '02 Noviembre 2026 09:35:20 a.m.', contenido: 'En la presente separata se desarrollarán los temas de agua y suelo, atmósfera y cambio climático y poblaciones humanas y sistemas urbanos' },
        { id: 4, titulo: 'PROYECTO DE APRENDIZAJE', fecha: '03 Noviembre 2026 02:29:31 p.m.', contenido: 'Desarrollo del proyecto final del trimestre sobre conservación ambiental.' },
      ]
    }
  ]

  const [trimestreAbierto, setTrimestreAbierto] = useState<number | null>(2)
  const [materialAbierto, setMaterialAbierto] = useState<any>(null)
  const [mostrarEditor, setMostrarEditor] = useState(false)
  const [tituloDoc, setTituloDoc] = useState('Mi documento interactivo')
  const [bloques, setBloques] = useState<any[]>([{ id: Date.now(), tipo: 'idea', texto: '' }])
  
  const [trabajosGuardados, setTrabajosGuardados] = useState<any[]>(JSON.parse(localStorage.getItem('eduai_trabajos') || '[]'))
  const [trabajoVer, setTrabajoVer] = useState<any>(null)
  const [mostrarTrabajos, setMostrarTrabajos] = useState(false)
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false)
  const [ultimoTrabajo, setUltimoTrabajo] = useState<any>(null)

  // 🤖 Estados para el Chat de Kora
  const [chatAbierto, setChatAbierto] = useState(false)
  const [inputChat, setInputChat] = useState('')
  const [mensajesChat, setMensajesChat] = useState<any[]>(() => {
    const guardado = localStorage.getItem(`kora_chat_${claseActual.nombre}`)
    return guardado ? JSON.parse(guardado) : [
      { id: 1, texto: `¡Hola! 👋 Soy Kora. Estoy aquí para ayudarte con tu documento en **${claseActual.nombre}**. ¿En qué te puedo ayudar?`, esUsuario: false }
    ]
  })

  useEffect(() => {
    localStorage.setItem(`kora_chat_${claseActual.nombre}`, JSON.stringify(mensajesChat))
  }, [mensajesChat, claseActual.nombre])

  const agregarBloque = (tipo: string) => setBloques([...bloques, { id: Date.now(), tipo, texto: '' }])
  const actualizarTexto = (id: number, nuevoTexto: string) => setBloques(bloques.map(b => b.id === id ? { ...b, texto: nuevoTexto } : b))
  const borrarBloque = (id: number) => setBloques(bloques.filter(b => b.id !== id))

  const guardarDocumento = () => {
    const bloquesConContenido = bloques.filter(b => b.texto.trim() !== '')
    if (bloquesConContenido.length === 0) {
      alert('⚠️ Agrega al menos un bloque con contenido antes de guardar')
      return
    }

    const ahora = new Date()
    const nuevoTrabajo = {
      id: Date.now(),
      titulo: tituloDoc,
      curso: claseActual.nombre,
      profesor: claseActual.profesor,
      trimestre: 'III Trimestre',
      fecha: ahora.toLocaleDateString('es-PE', { day: '2-digit', month: '2-digit', year: 'numeric' }),
      hora: ahora.toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' }),
      bloques: bloquesConContenido,
      cantidadBloques: bloquesConContenido.length
    }

    const trabajosActualizados = [nuevoTrabajo, ...trabajosGuardados]
    setTrabajosGuardados(trabajosActualizados)
    localStorage.setItem('eduai_trabajos', JSON.stringify([nuevoTrabajo, ...JSON.parse(localStorage.getItem('eduai_trabajos') || '[]')]))

    setUltimoTrabajo(nuevoTrabajo)
    setMostrarEditor(false)
    setMostrarConfirmacion(true)
    setTituloDoc('Mi documento interactivo')
    setBloques([{ id: Date.now(), tipo: 'idea', texto: '' }])
  }

  const irAMisTrabajos = () => {
    setMostrarConfirmacion(false)
    navigate('/trabajos')
  }

  const enviarMensajeKora = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputChat.trim()) return
    const mensajeUsuario = { id: Date.now(), texto: inputChat, esUsuario: true }
    setMensajesChat(prev => [...prev, mensajeUsuario])
    setInputChat('')

    setTimeout(() => {
      const respuestas = [
        `💡 Para tu documento de **${claseActual.nombre}**, te sugiero agregar esa idea en un bloque "Mi Idea" (amarillo).`,
        "🧠 ¡Buena observación! ¿Quieres que te ayude a redactar una conclusión basada en eso?",
        "👨‍🏫 Recuerda que puedes usar el bloque 'Duda' (rojo) para que tu profesor vea exactamente esta pregunta.",
        "✨ ¡Vas muy bien! Sigue estructurando tus pensamientos con los bloques de colores."
      ]
      setMensajesChat(prev => [...prev, { id: Date.now() + 1, texto: respuestas[Math.floor(Math.random() * respuestas.length)], esUsuario: false }])
    }, 1000)
  }

  const tiposBloque: any = {
    idea: { icono: <Lightbulb className="w-4 h-4 text-yellow-500" />, color: 'border-l-yellow-400 bg-yellow-50 dark:bg-yellow-900/10', nombre: 'Mi Idea' },
    cita: { icono: <BookOpen className="w-4 h-4 text-blue-500" />, color: 'border-l-blue-400 bg-blue-50 dark:bg-blue-900/10', nombre: 'Cita / Referencia' },
    duda: { icono: <HelpCircle className="w-4 h-4 text-red-500" />, color: 'border-l-red-400 bg-red-50 dark:bg-red-900/10', nombre: 'Duda para el profe' },
    conclusion: { icono: <CheckCircle className="w-4 h-4 text-green-500" />, color: 'border-l-green-400 bg-green-50 dark:bg-green-900/10', nombre: 'Conclusión' }
  }

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-eduai-dark">
      <aside className="w-72 bg-white dark:bg-eduai-surface border-r border-gray-200 dark:border-gray-700 flex flex-col">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="font-bold text-eduai-deep dark:text-white">{claseActual.nombre}</h2>
              <p className="text-xs text-gray-500">{claseActual.profesor}</p>
            </div>
            <button onClick={() => navigate('/clases')} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"><X className="w-5 h-5 text-gray-500" /></button>
          </div>
          <div className={`h-32 rounded-lg ${claseActual.color} flex items-center justify-center text-white text-4xl font-bold`}>{claseActual.nombre.charAt(0)}</div>
        </div>

        <button onClick={() => setMostrarTrabajos(!mostrarTrabajos)} className={`mx-3 mt-3 flex items-center justify-between px-3 py-2 rounded-lg text-sm font-semibold transition ${mostrarTrabajos ? 'bg-green-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200'}`}>
          <div className="flex items-center gap-2"><FileText className="w-4 h-4" /> Mis Trabajos</div>
          <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs">{trabajosGuardados.length}</span>
        </button>

        <div className="flex-1 overflow-y-auto p-2 mt-2">
          {trimestres.map((trim, index) => (
            <div key={index} className="mb-1">
              <button onClick={() => !trim.bloqueado && setTrimestreAbierto(trimestreAbierto === index ? null : index)} className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-semibold transition ${trimestreAbierto === index ? 'bg-red-600 text-white' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'} ${trim.bloqueado ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}>
                <div className="flex items-center gap-2">{trim.bloqueado ? <Lock className="w-4 h-4" /> : <Home className="w-4 h-4" />}{trim.nombre}</div>
                {trimestreAbierto === index ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </button>
              {trimestreAbierto === index && !trim.bloqueado && (
                <div className="pl-4 mt-1 space-y-1">
                  {trim.materiales.map(mat => (
                    <button key={mat.id} onClick={() => setMaterialAbierto(mat)} className="w-full flex items-start gap-2 px-2 py-2 rounded-md text-left text-xs hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                      <Folder className="w-4 h-4 text-yellow-500 shrink-0 mt-0.5" /><span className="text-gray-700 dark:text-gray-300">{mat.titulo}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </aside>

      <main className="flex-1 p-6 overflow-y-auto">
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
          <Home className="w-4 h-4" /><ChevronRight className="w-4 h-4" /><span>{claseActual.nombre}</span><ChevronRight className="w-4 h-4" /><span className="font-semibold text-eduai-deep dark:text-white">III Trimestre</span>
        </div>
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-eduai-deep dark:text-white">{trimestreAbierto !== null ? trimestres[trimestreAbierto].nombre : 'III Trimestre'}</h1>
          <button onClick={() => setMostrarEditor(true)} className="flex items-center gap-2 bg-eduai-primary hover:bg-eduai-deep text-white px-4 py-2 rounded-lg text-sm font-medium transition"><FilePlus className="w-4 h-4" /> Crear documento interactivo</button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {trimestreAbierto !== null && !trimestres[trimestreAbierto].bloqueado && trimestres[trimestreAbierto].materiales.map(mat => (
              <div key={mat.id} onClick={() => setMaterialAbierto(mat)} className="bg-white dark:bg-eduai-surface rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5 hover:shadow-md hover:border-eduai-primary transition cursor-pointer">
                <div className="flex items-start gap-3 mb-3"><Folder className="w-8 h-8 text-yellow-500 shrink-0" /><div><h3 className="font-bold text-eduai-deep dark:text-white">{mat.titulo}</h3><p className="text-xs text-gray-500 mt-1">{mat.fecha}</p></div></div>
                <hr className="border-gray-200 dark:border-gray-700 mb-3" />
                <p className="text-sm text-gray-600 dark:text-gray-300">{mat.contenido}</p>
              </div>
            ))}
          </div>
          <div className="space-y-4">
            <div className="bg-white dark:bg-eduai-surface rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5">
              <h3 className="font-bold text-eduai-deep dark:text-white mb-2">III Trimestre</h3>
              <p className="text-sm text-gray-500">14/09/2026 - 22/12/2026</p>
            </div>
          </div>
        </div>
      </main>

      {/* PANEL LATERAL: MIS TRABAJOS */}
      {mostrarTrabajos && (
        <div className="fixed right-0 top-0 h-full w-96 bg-white dark:bg-eduai-surface shadow-2xl border-l border-gray-200 dark:border-gray-700 z-40 flex flex-col">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <h2 className="font-bold text-lg text-eduai-deep dark:text-white flex items-center gap-2"><FileText className="w-5 h-5" /> Mis Trabajos</h2>
            <button onClick={() => setMostrarTrabajos(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"><X className="w-5 h-5" /></button>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            {trabajosGuardados.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <FileText className="w-16 h-16 mx-auto mb-3 opacity-30" />
                <p className="text-sm">Aún no has guardado ningún trabajo</p>
              </div>
            ) : (
              <div className="space-y-3">
                {trabajosGuardados.map(trabajo => (
                  <div key={trabajo.id} onClick={() => setTrabajoVer(trabajo)} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 hover:bg-blue-50 dark:hover:bg-gray-700 transition cursor-pointer border border-gray-200 dark:border-gray-700">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-sm text-eduai-deep dark:text-white flex-1 pr-2">{trabajo.titulo}</h3>
                      <Eye className="w-4 h-4 text-gray-400 shrink-0" />
                    </div>
                    <div className="space-y-1 text-xs text-gray-500 dark:text-gray-400">
                      <div className="flex items-center gap-1"><Folder className="w-3 h-3" /><span>{trabajo.curso}</span></div>
                      <div className="flex items-center gap-1"><Clock className="w-3 h-3" /><span>{trabajo.fecha} • {trabajo.hora}</span></div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODAL: Ver trabajo */}
      {trabajoVer && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-eduai-surface rounded-xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-white dark:bg-eduai-surface border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex justify-between items-center">
              <div><h2 className="font-bold text-lg text-eduai-deep dark:text-white">{trabajoVer.titulo}</h2><p className="text-xs text-gray-500 mt-1">{trabajoVer.curso} • {trabajoVer.trimestre}</p></div>
              <button onClick={() => setTrabajoVer(null)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6">
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-2 mb-2"><Clock className="w-4 h-4 text-blue-600" /><span className="text-sm font-semibold text-blue-800 dark:text-blue-300">Guardado el {trabajoVer.fecha} a las {trabajoVer.hora}</span></div>
              </div>
              <div className="space-y-3">
                {trabajoVer.bloques.map((bloque: any, index: number) => {
                  const config = tiposBloque[bloque.tipo]
                  return (
                    <div key={bloque.id} className={`p-4 rounded-lg border-l-4 ${config.color} border border-gray-200 dark:border-gray-700`}>
                      <div className="flex items-center gap-2 mb-2 font-semibold text-sm text-gray-700 dark:text-gray-200">
                        <span className="text-xs font-bold text-gray-400 mr-1">#{index + 1}</span>{config.icono}<span>{config.nombre}</span>
                      </div>
                      <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-line">{bloque.texto}</p>
                    </div>
                  )
                })}
              </div>
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700 px-6 py-3 flex justify-end">
              <button onClick={() => setTrabajoVer(null)} className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-200">Cerrar</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Ver material del profesor */}
      {materialAbierto && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-eduai-surface rounded-xl max-w-3xl w-full max-h-[80vh] overflow-y-auto">
            <div className="sticky top-0 bg-white dark:bg-eduai-surface border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex justify-between items-center">
              <h2 className="font-bold text-eduai-deep dark:text-white">{materialAbierto.titulo}</h2>
              <button onClick={() => setMaterialAbierto(null)} className="text-gray-500 hover:text-gray-700"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6">
              <p className="text-sm text-gray-500 mb-4">{materialAbierto.fecha}</p>
              <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">{materialAbierto.contenido}</p>
              <button onClick={() => { setMaterialAbierto(null); setMostrarEditor(true); setTituloDoc(`Respuesta a: ${materialAbierto.titulo}`) }} className="mt-6 flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg text-sm font-medium">
                <FilePlus className="w-4 h-4" /> Responder con documento interactivo
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Editor Interactivo */}
      {mostrarEditor && (
        <div className="fixed inset-0 bg-gray-50 dark:bg-eduai-dark z-50 flex flex-col">
          <div className="bg-white dark:bg-eduai-surface border-b border-gray-200 dark:border-gray-700 px-6 py-3 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3 flex-1">
              <button onClick={() => setMostrarEditor(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"><X className="w-5 h-5 text-gray-600 dark:text-gray-300" /></button>
              <input type="text" value={tituloDoc} onChange={(e) => setTituloDoc(e.target.value)} className="text-lg font-bold text-eduai-deep dark:text-white bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-eduai-primary rounded px-2 py-1 w-full max-w-md" />
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => setChatAbierto(true)} className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition shadow-md">
                <Sparkles className="w-4 h-4" /> Kora, ayúdame
              </button>
              <button onClick={guardarDocumento} className="flex items-center gap-2 bg-eduai-primary hover:bg-eduai-deep text-white px-5 py-2 rounded-lg text-sm font-medium transition">
                <Save className="w-4 h-4" /> Guardar
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            <div className="max-w-3xl mx-auto">
              <div className="mb-6 text-center">
                <h2 className="text-2xl font-bold text-eduai-deep dark:text-white mb-2">🧩 Construye tu documento</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">Agrega bloques de diferentes tipos para organizar tus ideas</p>
              </div>
              <div className="space-y-4 mb-8">
                {bloques.map((bloque, index) => {
                  const config = tiposBloque[bloque.tipo]
                  return (
                    <div key={bloque.id} className={`relative flex gap-3 p-4 rounded-lg border-l-4 shadow-sm transition hover:shadow-md border border-gray-200 dark:border-gray-700 ${config.color}`}>
                      <div className="flex flex-col items-center justify-center text-gray-400"><GripVertical className="w-4 h-4" /><span className="text-xs font-bold mt-1">{index + 1}</span></div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2 font-semibold text-gray-700 dark:text-gray-200">{config.icono}<span>{config.nombre}</span></div>
                        <textarea value={bloque.texto} onChange={(e) => actualizarTexto(bloque.id, e.target.value)} placeholder="✏️ Escribe aquí..." className="w-full bg-transparent border-none focus:outline-none resize-none text-gray-800 dark:text-gray-200 min-h-[80px] text-sm" rows={3} />
                      </div>
                      <button onClick={() => borrarBloque(bloque.id)} className="absolute top-2 right-2 p-1 text-gray-400 hover:text-red-500 transition"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  )
                })}
              </div>
              <div className="bg-white dark:bg-eduai-surface rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 text-center font-medium">➕ Agrega un nuevo bloque:</p>
                <div className="flex flex-wrap justify-center gap-3">
                  <button onClick={() => agregarBloque('idea')} className="flex items-center gap-2 px-4 py-2 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 rounded-full hover:bg-yellow-200 transition text-sm font-medium"><Lightbulb className="w-4 h-4" /> Idea</button>
                  <button onClick={() => agregarBloque('cita')} className="flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full hover:bg-blue-200 transition text-sm font-medium"><BookOpen className="w-4 h-4" /> Cita</button>
                  <button onClick={() => agregarBloque('duda')} className="flex items-center gap-2 px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-full hover:bg-red-200 transition text-sm font-medium"><HelpCircle className="w-4 h-4" /> Duda</button>
                  <button onClick={() => agregarBloque('conclusion')} className="flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full hover:bg-green-200 transition text-sm font-medium"><CheckCircle className="w-4 h-4" /> Conclusión</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL DE CONFIRMACIÓN */}
      {mostrarConfirmacion && ultimoTrabajo && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-[60]">
          <div className="bg-white dark:bg-eduai-surface rounded-2xl max-w-md w-full p-8 shadow-2xl text-center">
            <div className="w-20 h-20 mx-auto mb-5 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
              <div className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg"><CheckCircle className="w-8 h-8 text-white" /></div>
            </div>
            <h2 className="text-2xl font-bold text-eduai-deep dark:text-white mb-2">¡Respuesta completada! ✅</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">Tu documento fue enviado y guardado exitosamente.</p>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 mb-6 text-left border border-gray-200 dark:border-gray-700">
              <h3 className="font-bold text-sm text-eduai-deep dark:text-white mb-2 truncate">📄 {ultimoTrabajo.titulo}</h3>
              <div className="space-y-1 text-xs text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-2"><Folder className="w-3 h-3" /><span><strong>Curso:</strong> {ultimoTrabajo.curso}</span></div>
                <div className="flex items-center gap-2"><Clock className="w-3 h-3" /><span><strong>Guardado:</strong> {ultimoTrabajo.fecha} a las {ultimoTrabajo.hora}</span></div>
              </div>
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-5 font-medium">¿Deseas ir a <span className="text-green-600 font-bold">Mis Trabajos</span> para verlo?</p>
            <div className="flex gap-3">
              <button onClick={() => setMostrarConfirmacion(false)} className="flex-1 px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition">Seguir creando ✏️</button>
              <button onClick={irAMisTrabajos} className="flex-1 px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium shadow-md transition flex items-center justify-center gap-2"><FileText className="w-4 h-4" /> Ir a Mis Trabajos</button>
            </div>
          </div>
        </div>
      )}

      {/* 🤖 PANEL LATERAL: CHAT CON KORA (¡AQUÍ ESTABA EL ERROR, AHORA ESTÁ DENTRO DEL RETURN!) */}
      {chatAbierto && (
        <div className="fixed right-0 top-0 h-full w-96 max-w-full bg-white dark:bg-eduai-surface shadow-2xl border-l border-gray-200 dark:border-gray-700 z-50 flex flex-col">
          <div className="bg-gradient-to-r from-eduai-primary to-eduai-lavender px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3 text-white">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center"><Bot className="w-6 h-6" /></div>
              <div>
                <h3 className="font-bold text-sm">Kora</h3>
                <p className="text-xs text-blue-100 flex items-center gap-1"><span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span> En línea</p>
              </div>
            </div>
            <button onClick={() => setChatAbierto(false)} className="p-2 hover:bg-white/10 rounded-lg text-white"><X className="w-5 h-5" /></button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900">
            {mensajesChat.map((msg: any) => (
              <div key={msg.id} className={`flex gap-3 ${msg.esUsuario ? 'justify-end' : 'justify-start'}`}>
                {!msg.esUsuario && <div className="w-8 h-8 bg-eduai-primary rounded-full flex items-center justify-center flex-shrink-0"><Bot className="w-4 h-4 text-white" /></div>}
                <div className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm ${msg.esUsuario ? 'bg-eduai-deep text-white rounded-br-md' : 'bg-white dark:bg-eduai-surface text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 rounded-bl-md shadow-sm'}`}>
                  <p className="whitespace-pre-line">{msg.texto}</p>
                </div>
                {msg.esUsuario && <div className="w-8 h-8 bg-eduai-lavender rounded-full flex items-center justify-center flex-shrink-0"><User className="w-4 h-4 text-white" /></div>}
              </div>
            ))}
          </div>
          <form onSubmit={enviarMensajeKora} className="p-3 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-eduai-surface">
            <div className="flex gap-2">
              <input type="text" value={inputChat} onChange={(e) => setInputChat(e.target.value)} placeholder="Pregúntale a Kora..." className="flex-1 px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-eduai-primary dark:text-white" />
              <button type="submit" disabled={!inputChat.trim()} className="bg-eduai-primary hover:bg-eduai-deep text-white p-2 rounded-lg disabled:opacity-50 transition"><Send className="w-5 h-5" /></button>
            </div>
            <p className="text-[10px] text-gray-400 text-center mt-2">Kora guarda tu historial de chat automáticamente 💾</p>
          </form>
        </div>
      )}
    </div>
  )
}