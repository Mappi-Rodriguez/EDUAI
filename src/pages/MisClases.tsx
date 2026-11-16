import { useState } from 'react'
import { Users, BookOpen, Clock, ChevronRight, Plus } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

// Datos simulados de las clases del profesor
const MIS_CLASES = [
  { 
    id: 1, 
    materia: 'Biología', 
    grado: '9th Thinkers', 
    seccion: 'A', 
    alumnos: 28, 
    horario: 'Lun-Mié 08:00 AM', 
    color: 'bg-green-50 border-green-200 text-green-700' 
  },
  { 
    id: 2, 
    materia: 'Matemática', 
    grado: '7mo Balanced', 
    seccion: 'B', 
    alumnos: 24, 
    horario: 'Mar-Jue 10:00 AM', 
    color: 'bg-blue-50 border-blue-200 text-blue-700' 
  },
  { 
    id: 3, 
    materia: 'Historia', 
    grado: '8vo Reflective', 
    seccion: 'A', 
    alumnos: 30, 
    horario: 'Vie 09:00 AM', 
    color: 'bg-purple-50 border-purple-200 text-purple-700' 
  },
  { 
    id: 4, 
    materia: 'Comunicación', 
    grado: '10th Communicators', 
    seccion: 'C', 
    alumnos: 26, 
    horario: 'Lun-Mié 02:00 PM', 
    color: 'bg-orange-50 border-orange-200 text-orange-700' 
  },
]

export default function MisClases() {
  const navigate = useNavigate()
  const [filtroGrado, setFiltroGrado] = useState('Todos')

  // Filtrar clases si se selecciona un grado específico
  const clasesFiltradas = filtroGrado === 'Todos' 
    ? MIS_CLASES 
    : MIS_CLASES.filter(c => c.grado.includes(filtroGrado))

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8">
      
      {/* ENCABEZADO */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-eduai-deep">Mis Clases</h1>
          <p className="text-gray-500 mt-1">Gestiona tus cursos por grado y sección.</p>
        </div>
        
        <button className="flex items-center gap-2 bg-eduai-primary hover:bg-eduai-deep text-white px-5 py-2.5 rounded-xl font-medium transition shadow-sm">
          <Plus className="w-5 h-5" /> Nueva Clase
        </button>
      </div>

      {/* FILTROS POR GRADO */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {['Todos', '7mo', '8vo', '9th', '10th'].map((grado) => (
          <button
            key={grado}
            onClick={() => setFiltroGrado(grado)}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition ${
              filtroGrado === grado 
                ? 'bg-eduai-deep text-white shadow-md' 
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            {grado}
          </button>
        ))}
      </div>

      {/* GRID DE TARJETAS DE CLASES */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clasesFiltradas.map((clase) => (
          <div 
            key={clase.id}
            onClick={() => navigate(`/clases/${clase.id}`)}
            className={`group relative p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg bg-white ${clase.color.replace('text-', 'border-l-4 ').split(' ')[0]}`}
          >
            {/* Etiqueta de Grado */}
            <div className="flex justify-between items-start mb-4">
              <span className={`text-xs font-bold uppercase tracking-wider px-2 py-1 rounded-md ${clase.color}`}>
                {clase.grado} • Sec {clase.seccion}
              </span>
              <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-eduai-primary transition-colors" />
            </div>

            {/* Nombre de la Materia */}
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-gray-400" />
              {clase.materia}
            </h3>

            {/* Detalles Inferiores */}
            <div className="space-y-2 pt-4 border-t border-gray-100">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Users className="w-4 h-4" />
                <span>{clase.alumnos} Estudiantes matriculados</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Clock className="w-4 h-4" />
                <span>{clase.horario}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {clasesFiltradas.length === 0 && (
        <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-gray-300">
          <p className="text-gray-500">No tienes clases asignadas a este grado.</p>
        </div>
      )}
    </div>
  )
}