// src/pages/Buscar.tsx
import { Search } from 'lucide-react'

export default function Buscar() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-eduai-deep dark:text-white mb-6">Buscar en EDUAI</h1>
      
      <div className="relative mb-8">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input 
          type="text" 
          placeholder="Busca clases, profesores, tareas o recursos..." 
          className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-eduai-surface shadow-sm focus:outline-none focus:ring-2 focus:ring-eduai-primary"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-6 bg-white dark:bg-eduai-surface rounded-xl border border-gray-100 dark:border-gray-700">
          <h3 className="font-bold text-eduai-deep dark:text-white mb-2">🔍 Búsquedas recientes</h3>
          <p className="text-sm text-gray-500">Revolución Industrial, Álgebra, Tarea de Historia...</p>
        </div>
        <div className="p-6 bg-white dark:bg-eduai-surface rounded-xl border border-gray-100 dark:border-gray-700">
          <h3 className="font-bold text-eduai-deep dark:text-white mb-2">⭐ Recursos populares</h3>
          <p className="text-sm text-gray-500">Guía de estudio Matemáticas, Video: Células...</p>
        </div>
      </div>
    </div>
  )
}