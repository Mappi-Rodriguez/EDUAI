import { Flame, Trophy, Zap } from 'lucide-react'

const datosUsuario = {
  nivel: 5,
  nombreNivel: "Explorador",
  xpActual: 750,
  xpParaSiguiente: 1000,
  rachaDias: 7,
  insignias: [
    { icono: "🏆", nombre: "Top 10", desbloqueada: true },
    { icono: "🔥", nombre: "Racha 7 días", desbloqueada: true },
    { icono: "📚", nombre: "Lector voraz", desbloqueada: true },
    { icono: "🧠", nombre: "Experto", desbloqueada: false },
    { icono: "⭐", nombre: "Primera tarea", desbloqueada: true },
    { icono: "🎯", nombre: "Puntual", desbloqueada: false },
  ]
}

export default function TarjetaGamificacion() {
  const progreso = (datosUsuario.xpActual / datosUsuario.xpParaSiguiente) * 100

  return (
    <div className="bg-white dark:bg-eduai-surface rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
      <div className="bg-gradient-to-r from-eduai-primary to-eduai-lavender p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center text-2xl font-bold border-2 border-white/40">
              {datosUsuario.nivel}
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-blue-100">Tu nivel</p>
              <h3 className="text-xl font-bold">{datosUsuario.nombreNivel} 🚀</h3>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-white/20 px-3 py-2 rounded-full">
            <Flame className="w-5 h-5 text-orange-300" />
            <span className="font-bold">{datosUsuario.rachaDias} días</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="flex items-center gap-1">
              <Zap className="w-4 h-4" /> Experiencia
            </span>
            <span className="font-semibold">
              {datosUsuario.xpActual} / {datosUsuario.xpParaSiguiente} XP
            </span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
            <div 
              className="bg-white h-3 rounded-full transition-all duration-700"
              style={{ width: `${progreso}%` }}
            ></div>
          </div>
          <p className="text-xs text-blue-100">
            ¡Te faltan {datosUsuario.xpParaSiguiente - datosUsuario.xpActual} XP para el Nivel {datosUsuario.nivel + 1}! 💪
          </p>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Trophy className="w-5 h-5 text-yellow-500" />
          <h4 className="font-bold text-eduai-deep dark:text-white">Tus Insignias</h4>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
          {datosUsuario.insignias.map((insignia, index) => (
            <div 
              key={index} 
              className={`flex flex-col items-center gap-1 transition ${
                insignia.desbloqueada ? '' : 'grayscale opacity-40'
              }`}
            >
              <div className={`
                w-14 h-14 rounded-full flex items-center justify-center text-2xl shadow-sm
                ${insignia.desbloqueada 
                  ? 'bg-gradient-to-br from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 border-2 border-yellow-400' 
                  : 'bg-gray-100 dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-700'}
              `}>
                {insignia.icono}
              </div>
              <span className="text-xs text-center text-gray-600 dark:text-gray-400 font-medium">
                {insignia.nombre}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}