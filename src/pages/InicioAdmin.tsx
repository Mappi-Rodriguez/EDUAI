// src/pages/InicioAdmin.tsx
import { Users, Building, CheckCircle, Activity, TrendingUp, Shield } from 'lucide-react'

export default function InicioAdmin() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-eduai-deep to-eduai-primary rounded-2xl p-8 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-2">Panel de Control General 🛡️</h1>
          <p className="text-blue-100 text-lg">Gestiona hoy, transforma mañana</p>
        </div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10"></div>
      </div>

      {/* Estadísticas del Admin */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={<Users className="w-6 h-6 text-blue-600" />} value="2,480" label="Usuarios activos" bg="bg-blue-100" />
        <StatCard icon={<Building className="w-6 h-6 text-green-600" />} value="24" label="Instituciones" bg="bg-green-100" />
        <StatCard icon={<CheckCircle className="w-6 h-6 text-purple-600" />} value="98.7%" label="Disponibilidad" bg="bg-purple-100" />
        <StatCard icon={<Activity className="w-6 h-6 text-orange-600" />} value="12.5K" label="Activos hoy" bg="bg-orange-100" />
      </div>

      {/* Actividad y Sistema */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Actividad en la Plataforma */}
        <div className="bg-white dark:bg-eduai-surface p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <h3 className="font-bold text-xl text-eduai-deep dark:text-white mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-eduai-primary" /> Actividad en la Plataforma
          </h3>
          <div className="h-48 flex items-end justify-between gap-2 px-4">
            {[40, 65, 45, 80, 55, 90, 70].map((height, i) => (
              <div key={i} className="flex-1 bg-gradient-to-t from-eduai-primary to-eduai-lavender rounded-t-lg" style={{ height: `${height}%` }}></div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-500">
            <span>Sem 1</span><span>Sem 2</span><span>Sem 3</span><span>Sem 4</span><span>Sem 5</span><span>Sem 6</span><span>Sem 7</span>
          </div>
        </div>

        {/* Estado del Sistema */}
        <div className="bg-white dark:bg-eduai-surface p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <h3 className="font-bold text-xl text-eduai-deep dark:text-white mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-green-500" /> Estado del Sistema
          </h3>
          <div className="space-y-3">
            <StatusItem label="Servidor principal" status="online" />
            <StatusItem label="Base de datos" status="online" />
            <StatusItem label="Servicios de IA" status="online" />
            <StatusItem label="Almacenamiento" status="warning" />
          </div>
          <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
            <p className="text-sm text-green-700 dark:text-green-300 font-medium">
              ✅ Sistema en óptimas condiciones
            </p>
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

function StatusItem({ label, status }: { label: string, status: 'online' | 'warning' | 'offline' }) {
  const colors = {
    online: 'bg-green-500',
    warning: 'bg-yellow-500',
    offline: 'bg-red-500'
  }
  return (
    <div className="flex items-center justify-between p-2">
      <span className="text-sm text-gray-700 dark:text-gray-300">{label}</span>
      <div className="flex items-center gap-2">
        <div className={`w-2 h-2 ${colors[status]} rounded-full`}></div>
        <span className="text-xs text-gray-500 capitalize">{status}</span>
      </div>
    </div>
  )
}