import { useState } from 'react'
import { Calendar as CalendarIcon, Clock, Plus, CheckCircle2, AlertCircle, Star, Coffee, Trash2 } from 'lucide-react'

type Prioridad = 'urgente' | 'importante' | 'puede_esperar'

interface Actividad {
  id: number
  titulo: string
  fecha: string // Formato YYYY-MM-DD
  hora: string
  curso: string
  prioridad: Prioridad
  completada: boolean
}

const PRIORIDADES: Record<Prioridad, { label: string; color: string; bg: string; icon: any }> = {
  urgente: { label: 'Muy Urgente', color: 'text-red-700', bg: 'bg-red-100 border-red-200', icon: AlertCircle },
  importante: { label: 'Importante', color: 'text-orange-700', bg: 'bg-orange-100 border-orange-200', icon: Star },
  puede_esperar: { label: 'Puede Esperar', color: 'text-green-700', bg: 'bg-green-100 border-green-200', icon: Coffee }
}

export default function Actividades() {
  const [actividades, setActividades] = useState<Actividad[]>([
    { id: 1, titulo: 'Examen Biología Celular', fecha: '2026-11-20', hora: '08:00', curso: '9th Thinkers', prioridad: 'urgente', completada: false },
    { id: 2, titulo: 'Revisar Ensayos Historia', fecha: '2026-11-22', hora: '14:00', curso: '8vo Reflective', prioridad: 'importante', completada: false },
    { id: 3, titulo: 'Planificar Proyecto Final', fecha: '2026-11-28', hora: '10:00', curso: '7mo Balanced', prioridad: 'puede_esperar', completada: true },
  ])

  const [nuevaAct, setNuevaAct] = useState({ titulo: '', fecha: '', hora: '', curso: '', prioridad: 'importante' as Prioridad })
  const [mostrarFormulario, setMostrarFormulario] = useState(false)

  // Agregar nueva actividad
  const agregarActividad = () => {
    if (!nuevaAct.titulo || !nuevaAct.fecha) return
    
    setActividades([...actividades, {
      id: Date.now(),
      ...nuevaAct,
      completada: false
    }])
    
    setNuevaAct({ titulo: '', fecha: '', hora: '', curso: '', prioridad: 'importante' })
    setMostrarFormulario(false)
  }

  // Toggle completada
  const toggleCompletada = (id: number) => {
    setActividades(actividades.map(a => 
      a.id === id ? { ...a, completada: !a.completada } : a
    ))
  }

  // Eliminar actividad
  const eliminarActividad = (id: number) => {
    setActividades(actividades.filter(a => a.id !== id))
  }

  // Ordenar: primero pendientes por fecha, luego completadas
  const actividadesOrdenadas = [...actividades].sort((a, b) => {
    if (a.completada === b.completada) return new Date(a.fecha).getTime() - new Date(b.fecha).getTime()
    return a.completada ? 1 : -1
  })

  // Obtener días del mes actual que tienen actividades (para marcarlos en el calendario)
  const diasConActividad = actividades
    .filter(a => !a.completada)
    .map(a => parseInt(a.fecha.split('-')[2]))

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      
      {/* ENCABEZADO */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-eduai-deep flex items-center gap-3">
            <CalendarIcon className="w-8 h-8 text-eduai-primary" /> Calendario de Actividades
          </h1>
          <p className="text-gray-500 mt-1">Noviembre 2026</p>
        </div>
        
        <button 
          onClick={() => setMostrarFormulario(!mostrarFormulario)}
          className="bg-eduai-primary hover:bg-eduai-deep text-white px-5 py-2.5 rounded-xl font-medium transition shadow-sm flex items-center gap-2"
        >
          <Plus className="w-5 h-5" /> Nueva Actividad
        </button>
      </div>

      {/* FORMULARIO DESPLEGABLE */}
      {mostrarFormulario && (
        <div className="bg-white p-6 rounded-2xl shadow-md border border-eduai-primary/20 animate-in slide-in-from-top-2 duration-300">
          <h3 className="font-bold text-lg mb-4 text-eduai-deep">Agregar Nueva Actividad</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <input type="text" placeholder="Título..." value={nuevaAct.titulo} onChange={(e) => setNuevaAct({...nuevaAct, titulo: e.target.value})} className="p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-eduai-primary outline-none" />
            <input type="date" value={nuevaAct.fecha} onChange={(e) => setNuevaAct({...nuevaAct, fecha: e.target.value})} className="p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-eduai-primary outline-none" />
            <input type="time" value={nuevaAct.hora} onChange={(e) => setNuevaAct({...nuevaAct, hora: e.target.value})} className="p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-eduai-primary outline-none" />
            <select value={nuevaAct.prioridad} onChange={(e) => setNuevaAct({...nuevaAct, prioridad: e.target.value as Prioridad})} className="p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-eduai-primary outline-none bg-white">
              <option value="urgente">🔴 Muy Urgente</option>
              <option value="importante">🟠 Importante</option>
              <option value="puede_esperar">🟢 Puede Esperar</option>
            </select>
          </div>
          <div className="mt-4 flex justify-end gap-3">
            <button onClick={() => setMostrarFormulario(false)} className="px-4 py-2 text-gray-500 hover:text-gray-700">Cancelar</button>
            <button onClick={agregarActividad} className="bg-eduai-primary text-white px-6 py-2 rounded-xl font-medium hover:bg-eduai-deep transition">Guardar Actividad</button>
          </div>
        </div>
      )}

      {/* CONTENIDO DIVIDIDO: CALENDARIO + LISTA */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* COLUMNA IZQUIERDA: CALENDARIO VISUAL (FIJO) */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-fit sticky top-6">
          <h3 className="font-bold text-lg mb-4 text-center text-eduai-deep">Noviembre 2026</h3>
          <div className="grid grid-cols-7 gap-2 text-center text-sm mb-2 text-gray-400 font-medium">
            <div>Do</div><div>Lu</div><div>Ma</div><div>Mi</div><div>Ju</div><div>Vi</div><div>Sa</div>
          </div>
          <div className="grid grid-cols-7 gap-2 text-center text-sm">
            {[...Array(6)].map((_, i) => <div key={`empty-${i}`} />)}
            {[...Array(30)].map((_, i) => {
              const dia = i + 1;
              const tieneActividad = diasConActividad.includes(dia);
              return (
                <div key={dia} className={`p-2 rounded-lg transition ${tieneActividad ? 'bg-eduai-light text-eduai-primary font-bold ring-2 ring-eduai-primary/20' : 'hover:bg-gray-50'}`}>
                  {dia}
                  {tieneActividad && <div className="w-1.5 h-1.5 bg-eduai-primary rounded-full mx-auto mt-1"></div>}
                </div>
              )
            })}
          </div>
          
          {/* Leyenda de Prioridades */}
          <div className="mt-6 pt-4 border-t border-gray-100 space-y-2">
            <p className="text-xs font-bold text-gray-400 uppercase">Prioridades</p>
            <div className="flex items-center gap-2 text-xs text-red-700"><AlertCircle className="w-3 h-3"/> Muy Urgente</div>
            <div className="flex items-center gap-2 text-xs text-orange-700"><Star className="w-3 h-3"/> Importante</div>
            <div className="flex items-center gap-2 text-xs text-green-700"><Coffee className="w-3 h-3"/> Puede Esperar</div>
          </div>
        </div>

        {/* COLUMNA DERECHA: LISTA DE ACTIVIDADES CON CHECKLIST */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="font-bold text-xl text-gray-800 flex items-center justify-between">
            Próximas Actividades
            <span className="text-sm font-normal text-gray-500">{actividades.filter(a => !a.completada).length} pendientes</span>
          </h3>
          
          {actividadesOrdenadas.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-gray-300">
              <p className="text-gray-500">No hay actividades. ¡Agrega una nueva!</p>
            </div>
          ) : (
            actividadesOrdenadas.map((act) => {
              const prio = PRIORIDADES[act.prioridad]
              const IconoPrio = prio.icon
              
              return (
                <div key={act.id} className={`group bg-white p-5 rounded-xl border transition-all duration-300 ${act.completada ? 'border-green-200 bg-green-50/30 opacity-75' : 'border-gray-100 hover:shadow-md hover:border-eduai-primary/30'}`}>
                  <div className="flex items-start gap-4">
                    <button onClick={() => toggleCompletada(act.id)} className={`mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${act.completada ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300 hover:border-eduai-primary text-transparent'}`}>
                      <CheckCircle2 className="w-4 h-4" />
                    </button>

                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h4 className={`font-bold text-lg ${act.completada ? 'line-through text-gray-400' : 'text-gray-800'}`}>{act.titulo}</h4>
                        <span className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full border ${prio.bg} ${prio.color}`}>
                          <IconoPrio className="w-3.5 h-3.5" />{prio.label}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">{act.curso}</p>
                      <div className="flex items-center gap-4 mt-3 text-sm text-gray-600">
                        <div className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-md"><CalendarIcon className="w-4 h-4 text-gray-400" />{act.fecha}</div>
                        <div className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-md"><Clock className="w-4 h-4 text-gray-400" />{act.hora}</div>
                      </div>
                    </div>

                    <button onClick={() => eliminarActividad(act.id)} className="opacity-0 group-hover:opacity-100 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )
            })
          )}
        </div>

      </div>
    </div>
  )
}