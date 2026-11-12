import { useNavigate } from 'react-router-dom' // ← 1. Importar navigate
import { clases } from '../data/mockData'
import { Users, ArrowRight } from 'lucide-react'

export default function MisClases() {
  const navigate = useNavigate() // ← 2. Inicializar navigate

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-eduai-deep dark:text-white mb-6">Mis Clases</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clases.map((clase) => (
          <div key={clase.id} className="bg-white dark:bg-eduai-surface rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow">
            <div className={`h-24 ${clase.color} flex items-center justify-center`}>
              <span className="text-white text-3xl font-bold">{clase.nombre.charAt(0)}</span>
            </div>
            <div className="p-5">
              <h3 className="font-bold text-lg text-eduai-deep dark:text-white mb-1">{clase.nombre}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{clase.profesor}</p>
              
              <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300 mb-4">
                <span className="flex items-center gap-1">
                  <Users className="w-4 h-4" /> {clase.alumnos} estudiantes
                </span>
              </div>
              
              {/* ← 3. Agregamos el onClick para navegar al detalle */}
              <button 
                onClick={() => navigate(`/clases/${clase.id}`)}
                className="w-full bg-eduai-primary text-white py-2 rounded-lg hover:bg-eduai-deep transition-colors flex items-center justify-center gap-2 text-sm font-medium cursor-pointer"
              >
                Entrar a la clase <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}