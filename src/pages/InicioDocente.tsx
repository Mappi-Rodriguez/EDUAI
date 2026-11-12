// src/pages/InicioDocente.tsx
import { Users, FileText, CheckCircle, TrendingUp, Clock, Shield } from 'lucide-react'

export default function InicioDocente() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-eduai-deep to-eduai-lavender rounded-2xl p-8 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-2">¡Hola, Prof. Daniela! 👋</h1>
          <p className="text-blue-100 text-lg">Educar también es inspirar ✨</p>
        </div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10"></div>
      </div>

      {/* Estadísticas del Docente */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={<Users className="w-6 h-6 text-blue-600" />} value="45" label="Estudiantes activos" bg="bg-blue-100" />
        <StatCard icon={<FileText className="w-6 h-6 text-orange-600" />} value="12" label="Entregas pendientes" bg="bg-orange-100" />
        <StatCard icon={<CheckCircle className="w-6 h-6 text-green-600" />} value="8" label="Clases activas" bg="bg-green-100" />
        <StatCard icon={<TrendingUp className="w-6 h-6 text-purple-600" />} value="96%" label="Promedio general" bg="bg-purple-100" />
      </div>

      {/* Entregas Pendientes y Transparencia IA */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Entregas Pendientes */}
        <div className="bg-white dark:bg-eduai-surface p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <h3 className="font-bold text-xl text-eduai-deep dark:text-white mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-orange-500" /> Entregas Pendientes
          </h3>
          <div className="space-y-3">
            <EntregaItem estudiante="Mariapaz Rodríguez" tarea="Ensayo Revolución Industrial" clase="Historia" tiempo="Hace 2 horas" />
            <EntregaItem estudiante="Lupe Martínez" tarea="Ejercicios de Álgebra" clase="Matemáticas" tiempo="Hace 5 horas" />
            <EntregaItem estudiante="Ashlie Gómez" tarea="Reporte de Laboratorio" clase="Ciencias" tiempo="Hace 1 día" />
          </div>
        </div>

        {/* Transparencia IA */}
        <div className="bg-white dark:bg-eduai-surface p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <h3 className="font-bold text-xl text-eduai-deep dark:text-white mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-eduai-lavender" /> Transparencia IA
          </h3>
          <div className="bg-gradient-to-br from-eduai-lavender/10 to-eduai-primary/10 p-5 rounded-lg border-l-4 border-eduai-lavender">
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
              <strong>3 estudiantes</strong> declararon uso de IA en sus últimas entregas.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span className="text-gray-700 dark:text-gray-300">Mariapaz: ChatGPT (Investigación)</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span className="text-gray-700 dark:text-gray-300">Lupe: Grammarly (Corrección)</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                <span className="text-gray-700 dark:text-gray-300">Ashlie: Sin declarar</span>
              </div>
            </div>
            <button className="mt-4 text-sm bg-eduai-lavender text-white px-4 py-2 rounded-lg hover:bg-eduai-primary transition-colors">
              Ver registros completos
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function StatCard({ icon, value, label, bg }: { icon: React.ReactNode, value: string, label: string, bg: string }) {
  return (
    <div className="bg-white dark:bg-eduai-surface p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center gap-4">
      <div className={`w-12 h-12 ${bg} rounded-lg flex items-center justify-center`}>{icon}</div>
      <div>
        <p className="text-2xl font-bold text-eduai-deep dark:text-white">{value}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
      </div>
    </div>
  )
}

function EntregaItem({ estudiante, tarea, clase, tiempo }: { estudiante: string, tarea: string, clase: string, tiempo: string }) {
  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-eduai-deep/20 rounded-lg hover:bg-gray-100 dark:hover:bg-eduai-deep/40 transition-colors">
      <div>
        <p className="font-medium text-sm text-eduai-deep dark:text-white">{estudiante}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400">{tarea} • {clase}</p>
      </div>
      <div className="text-right">
        <p className="text-xs text-gray-500">{tiempo}</p>
        <button className="text-xs bg-eduai-primary text-white px-2 py-1 rounded mt-1">Revisar</button>
      </div>
    </div>
  )
}