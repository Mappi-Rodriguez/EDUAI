import { 
  Users, BookOpen, CheckCircle, TrendingUp, 
  Gamepad2, Video, ExternalLink, ArrowRight 
} from 'lucide-react'

export default function InicioDocente() {
  // Datos de tus clases reales
  const misClases = [
    { nombre: '7mo Balanced', alumnos: 24, asistencia: '95%', color: 'bg-blue-50 border-blue-200 text-blue-800' },
    { nombre: '8vo Reflective', alumnos: 28, asistencia: '88%', color: 'bg-purple-50 border-purple-200 text-purple-800' },
    { nombre: '9th Thinker', alumnos: 30, asistencia: '92%', color: 'bg-green-50 border-green-200 text-green-800' },
    { nombre: '10th Communicator', alumnos: 26, asistencia: '90%', color: 'bg-orange-50 border-orange-200 text-orange-800' }
  ]

  return (
    <div className="space-y-8">
      {/* ENCABEZADO DE BIENVENIDA */}
      <div>
        <h1 className="text-3xl font-bold text-eduai-deep mb-2">👋 ¡Hola, Profesora!</h1>
        <p className="text-gray-500">Aquí tienes un resumen de tus clases y herramientas disponibles hoy.</p>
      </div>

      {/* TARJETAS DE ESTADÍSTICAS RÁPIDAS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="p-3 bg-blue-100 rounded-lg text-blue-600"><Users size={24} /></div>
          <div><p className="text-2xl font-bold text-gray-800">108</p><p className="text-sm text-gray-500">Estudiantes Totales</p></div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="p-3 bg-green-100 rounded-lg text-green-600"><CheckCircle size={24} /></div>
          <div><p className="text-2xl font-bold text-gray-800">91%</p><p className="text-sm text-gray-500">Asistencia Promedio</p></div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="p-3 bg-purple-100 rounded-lg text-purple-600"><BookOpen size={24} /></div>
          <div><p className="text-2xl font-bold text-gray-800">4</p><p className="text-sm text-gray-500">Clases Activas</p></div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="p-3 bg-orange-100 rounded-lg text-orange-600"><TrendingUp size={24} /></div>
          <div><p className="text-2xl font-bold text-gray-800">12</p><p className="text-sm text-gray-500">Tareas Pendientes</p></div>
        </div>
      </div>

      {/* SECCIÓN: MIS CLASES */}
      <div>
        <h2 className="text-xl font-bold text-eduai-deep mb-4 flex items-center gap-2">
          <BookOpen className="w-5 h-5" /> Mis Clases
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {misClases.map((clase, index) => (
            <div key={index} className={`p-5 rounded-xl border ${clase.color} hover:shadow-md transition cursor-pointer`}>
              <h3 className="font-bold text-lg mb-2">{clase.nombre}</h3>
              <div className="flex justify-between text-sm opacity-80">
                <span>👥 {clase.alumnos} Alumnos</span>
                <span>📊 {clase.asistencia} Asist.</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECCIÓN: HERRAMIENTAS DE ENSEÑANZA (KAHOOT, YOUTUBE, CLASSROOM) */}
      <div>
        <h2 className="text-xl font-bold text-eduai-deep mb-4 flex items-center gap-2">
          <Gamepad2 className="w-5 h-5" /> Herramientas de Enseñanza
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Tarjeta Kahoot */}
          <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition cursor-pointer group relative overflow-hidden">
            <div className="relative z-10">
              <Gamepad2 className="w-10 h-10 mb-4 opacity-90" />
              <h3 className="text-lg font-bold mb-1">Crear Kahoot</h3>
              <p className="text-sm opacity-90 mb-4">Diseña quizzes interactivos para evaluar.</p>
              <div className="flex items-center gap-2 text-sm font-medium group-hover:gap-3 transition-all">
                Abrir herramienta <ArrowRight size={16} />
              </div>
            </div>
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white opacity-10 rounded-full"></div>
          </div>

          {/* Tarjeta YouTube */}
          <div className="bg-gradient-to-br from-red-600 to-red-800 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition cursor-pointer group relative overflow-hidden">
            <div className="relative z-10">
              <Video className="w-10 h-10 mb-4 opacity-90" />
              <h3 className="text-lg font-bold mb-1">Biblioteca YouTube</h3>
              <p className="text-sm opacity-90 mb-4">Busca videos educativos para tus clases.</p>
              <div className="flex items-center gap-2 text-sm font-medium group-hover:gap-3 transition-all">
                Buscar videos <ArrowRight size={16} />
              </div>
            </div>
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white opacity-10 rounded-full"></div>
          </div>

          {/* Tarjeta Classroom */}
          <div className="bg-gradient-to-br from-green-600 to-emerald-700 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition cursor-pointer group relative overflow-hidden">
            <div className="relative z-10">
              <ExternalLink className="w-10 h-10 mb-4 opacity-90" />
              <h3 className="text-lg font-bold mb-1">Google Classroom</h3>
              <p className="text-sm opacity-90 mb-4">Sincroniza tareas y calificaciones.</p>
              <div className="flex items-center gap-2 text-sm font-medium group-hover:gap-3 transition-all">
                Conectar aula <ArrowRight size={16} />
              </div>
            </div>
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white opacity-10 rounded-full"></div>
          </div>

        </div>
      </div>
    </div>
  )
}