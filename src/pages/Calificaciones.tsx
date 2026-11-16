import { useState } from 'react'
import { Search, Download, ChevronRight, BarChart3, Star, User, Save, MessageCircle, Award } from 'lucide-react'

// --- 1. LÓGICA DE LITERALES Y COLORES (CORREGIDA) ---
const getLiteral = (promedio: number) => {
  if (promedio >= 18) {
    return { code: 'AD', text: 'Destacado', textColor: 'text-blue-700', bgColor: 'bg-blue-100', barColor: 'bg-blue-600' }
  }
  if (promedio >= 14) {
    return { code: 'A', text: 'Logrado', textColor: 'text-green-700', bgColor: 'bg-green-100', barColor: 'bg-green-600' }
  }
  if (promedio >= 11) {
    return { code: 'B', text: 'En Proceso', textColor: 'text-yellow-700', bgColor: 'bg-yellow-100', barColor: 'bg-yellow-500' }
  }
  return { code: 'C', text: 'En Inicio', textColor: 'text-red-700', bgColor: 'bg-red-100', barColor: 'bg-red-500' }
}

// --- 2. MENSAJES MOTIVACIONALES ---
const MENSAJES_MOTIVACIONALES = {
  AD: ["¡Tu excelencia inspira a toda la clase!", "Has demostrado un dominio total.", "¡Sigue alcanzando las estrellas!"],
  A: ["¡Muy buen trabajo!", "Vas por excelente camino.", "Tu esfuerzo está dando frutos."],
  B: ["Vas avanzando bien, sigue así.", "Estás en proceso de mejora.", "Tienes gran potencial."],
  C: ["Estamos aquí para apoyarte.", "Cada experto fue principiante.", "Vamos a reforzar juntos."]
}

// --- 3. DATOS INICIALES ---
const DATOS_INICIALES = [
  { id: 1, nombre: 'Alonso Pérez', curso: 'Matemática', evals: [17, 19, 18], obs: '', mensajeSel: '' },
  { id: 2, nombre: 'Valentina Rojas', curso: 'Matemática', evals: [16, 18, 19], obs: '', mensajeSel: '' },
  { id: 3, nombre: 'Mateo Sánchez', curso: 'Matemática', evals: [14, 17, 16], obs: '', mensajeSel: '' },
  { id: 4, nombre: 'Camila Torres', curso: 'Matemática', evals: [19, 20, 18], obs: '', mensajeSel: '' },
  { id: 5, nombre: 'Thiago Díaz', curso: 'Matemática', evals: [18, 17, 17], obs: '', mensajeSel: '' },
]

const calcularPromedio = (notas: number[]) => {
  if (notas.length === 0) return 0
  return parseFloat((notas.reduce((a, b) => a + b, 0) / notas.length).toFixed(1))
}

export default function Calificaciones() {
  const [estudiantes, setEstudiantes] = useState(DATOS_INICIALES)
  const [idSeleccionado, setIdSeleccionado] = useState(DATOS_INICIALES[0].id)
  
  // Estados para edición
  const [editandoObs, setEditandoObs] = useState(false)
  const [obsTemporal, setObsTemporal] = useState('')
  const [mensajeTemporal, setMensajeTemporal] = useState('')

  const alumnoActual = estudiantes.find(e => e.id === idSeleccionado) || estudiantes[0]
  const promedioActual = calcularPromedio(alumnoActual.evals)
  const literalActual = getLiteral(promedioActual)

  // Actualizar nota en tiempo real
  const actualizarNota = (index: number, valor: string) => {
    const num = parseInt(valor) || 0
    setEstudiantes(prev => prev.map(est => 
      est.id === idSeleccionado 
        ? { ...est, evals: est.evals.map((n, i) => i === index ? num : n) }
        : est
    ))
  }

  // Guardar cambios
  const guardarFeedback = () => {
    setEstudiantes(prev => prev.map(est => 
      est.id === idSeleccionado 
        ? { ...est, obs: obsTemporal, mensajeSel: mensajeTemporal }
        : est
    ))
    setEditandoObs(false)
  }

  // Al cambiar de alumno
  const seleccionarAlumno = (id: number) => {
    setIdSeleccionado(id)
    const alum = estudiantes.find(e => e.id === id)
    if (alum) {
      setObsTemporal(alum.obs || '')
      setMensajeTemporal(alum.mensajeSel || '')
    }
    setEditandoObs(false)
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      
      {/* ENCABEZADO */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-2xl font-bold text-eduai-deep">Notas de mis estudiantes</h1>
          <p className="text-gray-500 text-sm mt-1">Gestiona calificaciones y envía motivación.</p>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="text" placeholder="Buscar estudiante..." className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-eduai-primary" />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-eduai-primary text-white rounded-lg hover:bg-eduai-deep transition text-sm font-medium">
            <Download className="w-4 h-4" /> Reporte
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* TABLA IZQUIERDA */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-500 uppercase text-xs font-semibold">
              <tr>
                <th className="px-6 py-4">Estudiante</th>
                <th className="px-6 py-4">Notas (Editables)</th>
                <th className="px-6 py-4 text-center">Literal</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
  {estudiantes.map((est) => {
    // Calculamos el promedio y el literal AQUÍ MISMO para cada fila
    const prom = calcularPromedio(est.evals)
    const lit = getLiteral(prom) 
    const isSelected = est.id === idSeleccionado
    
    return (
      <tr 
        key={est.id} 
        onClick={() => seleccionarAlumno(est.id)}
        className={`cursor-pointer transition-colors ${isSelected ? 'bg-blue-50 border-l-4 border-eduai-primary' : 'hover:bg-gray-50'}`}
      >
        <td className="px-6 py-4 font-medium text-gray-800 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600">
            {est.nombre.charAt(0)}
          </div>
          {est.nombre}
        </td>
        
        {/* INPUTS DE NOTAS */}
        <td className="px-6 py-4">
          <div className="flex gap-2">
            {est.evals.map((nota, idx) => (
              <input
                key={idx}
                type="number" min="0" max="20"
                value={nota}
                onChange={(e) => actualizarNota(idx, e.target.value)}
                onClick={(e) => e.stopPropagation()}
                className="w-12 p-1 text-center border border-gray-200 rounded text-xs font-mono focus:border-eduai-primary outline-none"
              />
            ))}
          </div>
        </td>

        {/* COLUMNA LITERAL CORREGIDA */}
        <td className="px-6 py-4 text-center">
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${lit.bgColor} ${lit.textColor}`}>
            {lit.code}
          </span>
        </td>

        <td className="px-6 py-4 text-right">
          <ChevronRight className={`w-4 h-4 inline ${isSelected ? 'text-eduai-primary' : 'text-gray-300'}`} />
        </td>
      </tr>
    )
  })}
</tbody>
          </table>
        </div>

        {/* PANEL DERECHO: DETALLE DINÁMICO */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 h-fit sticky top-6">
          <h3 className="text-lg font-bold text-eduai-deep mb-6 flex items-center gap-2">
            <User className="w-5 h-5" /> Detalle del estudiante
          </h3>

          {/* PERFIL Y PROMEDIO */}
          <div className="text-center mb-6 pb-6 border-b border-gray-100">
            <div className="w-20 h-20 bg-gradient-to-br from-eduai-primary to-eduai-lavender rounded-full mx-auto mb-3 flex items-center justify-center text-white text-2xl font-bold shadow-md">
              {alumnoActual.nombre.charAt(0)}
            </div>
            <h4 className="text-xl font-bold text-gray-800">{alumnoActual.nombre}</h4>
            <p className="text-sm text-gray-500 mb-4">9° Grado • Sección A</p>
            
            <div className="inline-block bg-eduai-light px-6 py-3 rounded-xl border border-eduai-primary/20">
              <p className="text-xs text-eduai-deep font-semibold uppercase tracking-wider mb-1">Promedio General</p>
              <div className="flex items-baseline justify-center gap-2">
                <p className="text-3xl font-black text-eduai-primary">{promedioActual.toFixed(1)}</p>
                <span className={`text-sm font-bold px-2 py-0.5 rounded ${literalActual.bgColor} ${literalActual.textColor}`}>
                  {literalActual.code}
                </span>
              </div>
            </div>
          </div>

          {/* RENDIMIENTO DEL CURSO (BARRA CORREGIDA) */}
          <div className="mb-6">
            <h5 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-eduai-primary" /> Rendimiento del curso
            </h5>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-medium text-gray-600">{alumnoActual.curso}</span>
                  <span className="font-bold text-gray-800">{literalActual.text}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div 
                    className={`h-3 rounded-full transition-all duration-500 ${literalActual.barColor}`} 
                    style={{ width: `${(promedioActual / 20) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* SECCIÓN DE FEEDBACK Y MOTIVACIÓN */}
          <div className="bg-yellow-50/50 p-4 rounded-xl border border-yellow-100">
            <div className="flex justify-between items-center mb-3">
              <h5 className="text-sm font-bold text-yellow-800 flex items-center gap-2">
                <MessageCircle className="w-4 h-4 fill-yellow-500 text-yellow-500" /> Comentarios motivacionales
              </h5>
              {!editandoObs && (
                <button onClick={() => setEditandoObs(true)} className="text-xs text-eduai-primary hover:underline font-medium">
                  Editar
                </button>
              )}
            </div>

            {editandoObs ? (
              <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                
                {/* Selector de Mensaje Automático */}
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-2 flex items-center gap-1">
                    <Award className="w-3 h-3" /> Selecciona un mensaje ({literalActual.code}):
                  </label>
                  <select 
                    value={mensajeTemporal}
                    onChange={(e) => setMensajeTemporal(e.target.value)}
                    className="w-full p-2 text-sm border border-yellow-300 rounded-lg bg-white focus:ring-2 focus:ring-yellow-400 outline-none"
                  >
                    <option value="">-- Elige una frase motivadora --</option>
                    {MENSAJES_MOTIVACIONALES[literalActual.code as keyof typeof MENSAJES_MOTIVACIONALES]?.map((msg, i) => (
                      <option key={i} value={msg}>{msg}</option>
                    ))}
                  </select>
                </div>

                {/* Observación Personalizada */}
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-2">Observación adicional:</label>
                  <textarea 
                    value={obsTemporal}
                    onChange={(e) => setObsTemporal(e.target.value)}
                    placeholder="Escribe algo personalizado..."
                    className="w-full p-2 text-sm border border-yellow-300 rounded-lg bg-white focus:ring-2 focus:ring-yellow-400 outline-none resize-none h-20"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button onClick={() => setEditandoObs(false)} className="text-xs text-gray-500 hover:text-gray-700 px-3 py-1.5">Cancelar</button>
                  <button onClick={guardarFeedback} className="flex items-center gap-1 bg-eduai-primary text-white text-xs px-4 py-1.5 rounded-lg hover:bg-eduai-deep transition shadow-sm">
                    <Save className="w-3 h-3" /> Guardar Feedback
                  </button>
                </div>
              </div>
            ) : (
              // VISTA DE LECTURA
              <div className="space-y-3">
                {alumnoActual.mensajeSel ? (
                  <div className="bg-white p-3 rounded-lg border-l-4 border-eduai-primary shadow-sm">
                    <p className="text-sm text-gray-700 italic">"{alumnoActual.mensajeSel}"</p>
                  </div>
                ) : (
                  <p className="text-xs text-gray-400 italic">Aún no has dejado un mensaje motivacional.</p>
                )}
                
                {alumnoActual.obs && (
                  <div className="text-sm text-gray-600 bg-white/50 p-2 rounded">
                    <span className="font-bold text-gray-700">Nota personal:</span> {alumnoActual.obs}
                  </div>
                )}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}