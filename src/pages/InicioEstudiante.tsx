// src/pages/Inicio.tsx
import { 
  BookOpen, CheckCircle, Star, Trophy, Clock, Sparkles, 
  FileText, Medal, Lightbulb, MessageCircle, ArrowRight,
  Calendar, Mail, AlertCircle
} from 'lucide-react'
import Logo from '../components/Logo'

export default function Inicio() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      
      {/* 1. Banner de Bienvenida con Logo Grande */}
      <div className="bg-gradient-to-r from-eduai-deep to-eduai-primary rounded-2xl p-8 text-white flex justify-between items-center shadow-lg relative overflow-hidden">
        <div className="relative z-10 flex items-center gap-6">
          <Logo size="large" showText={false} />
          <div>
            <h1 className="text-3xl font-bold mb-2">¡Hola, Mariapaz! 👋</h1>
            <p className="text-blue-100 text-lg">Sigue aprendiendo, cada paso cuenta</p>
          </div>
        </div>
        <div className="text-7xl relative z-10 animate-bounce">🤖</div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10"></div>
        <div className="absolute bottom-0 left-20 w-24 h-24 bg-white/5 rounded-full -mb-10"></div>
      </div>

      {/* 2. NUEVO: Resumen del Día */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-eduai-surface p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center gap-4">
          <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
            <AlertCircle className="w-6 h-6 text-red-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-eduai-deep dark:text-white">3</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Tareas pendientes hoy</p>
          </div>
        </div>

        <div className="bg-white dark:bg-eduai-surface p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <Mail className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-eduai-deep dark:text-white">5</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Mensajes sin leer</p>
          </div>
        </div>

        <div className="bg-white dark:bg-eduai-surface p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center gap-4">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
            <Calendar className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-eduai-deep dark:text-white">2</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Clases hoy</p>
          </div>
        </div>
      </div>

      {/* 3. Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={<BookOpen className="w-6 h-6 text-blue-600" />} value="5" label="Mis Clases" bg="bg-blue-100" />
        <StatCard icon={<CheckCircle className="w-6 h-6 text-green-600" />} value="8" label="Actividades" bg="bg-green-100" />
        <StatCard icon={<Star className="w-6 h-6 text-yellow-500" />} value="92%" label="Avance General" bg="bg-yellow-100" />
        <StatCard icon={<Trophy className="w-6 h-6 text-purple-600" />} value="1" label="Logro" bg="bg-purple-100" />
      </div>

      {/* 4. Clases y Progreso */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-eduai-surface p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <h3 className="font-bold text-xl text-eduai-deep dark:text-white mb-4">Mis Clases Próximas</h3>
          <div className="space-y-4">
            <ClassItem title="Educación Física" task="Tarea 1: El esfuerzo en el deporte" time="Hoy • 10:00 AM" color="bg-orange-500" />
            <ClassItem title="Matemáticas II" task="Ejercicios de Álgebra" time="Mañana • 8:00 AM" color="bg-blue-500" />
            <ClassItem title="Historia Universal" task="Lectura: Revolución Industrial" time="Miércoles • 11:00 AM" color="bg-purple-500" />
          </div>
        </div>
        <div className="bg-white dark:bg-eduai-surface p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col items-center justify-center text-center">
          <h3 className="font-bold text-lg text-eduai-deep dark:text-white mb-4">Tu Aprendizaje</h3>
          <div className="text-3xl font-bold text-eduai-primary">92%</div>
          <p className="text-sm text-gray-500 mt-2">¡Excelente progreso!</p>
        </div>
      </div>

      {/* 5. Registro de Aprendizaje y Logros */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pb-8">
        <div className="lg:col-span-2 bg-white dark:bg-eduai-surface p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <h3 className="font-bold text-xl text-eduai-deep dark:text-white mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-eduai-primary" /> Registro de Aprendizaje
          </h3>
          <div className="bg-gray-50 dark:bg-eduai-deep/20 p-5 rounded-lg border-l-4 border-eduai-primary">
            <h4 className="font-bold text-eduai-deep dark:text-white mb-1">Tarea 1 - Educación Física</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300 italic mb-3">
              "Aprendí que el esfuerzo y la constancia mejoran el rendimiento deportivo y aportan beneficios en mi vida cotidiana."
            </p>
            <div className="flex gap-2">
              <span className="text-xs bg-eduai-lavender/20 text-eduai-deep px-2 py-1 rounded-md">🤖 ChatGPT</span>
              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-md">📝 Borrador propio</span>
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="bg-white dark:bg-eduai-surface p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
            <h3 className="font-bold text-lg text-eduai-deep dark:text-white mb-4">Tus Logros</h3>
            <div className="flex justify-between">
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center"><Star className="w-6 h-6 text-yellow-500" /></div>
                <span className="text-xs text-gray-600 dark:text-gray-300">Activo</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center"><Lightbulb className="w-6 h-6 text-orange-500" /></div>
                <span className="text-xs text-gray-600 dark:text-gray-300">Ideas</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center"><Medal className="w-6 h-6 text-blue-500" /></div>
                <span className="text-xs text-gray-600 dark:text-gray-300">Top 10</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-eduai-primary to-eduai-lavender p-6 rounded-xl shadow-lg text-white relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-2">
                <MessageCircle className="w-5 h-5" />
                <h3 className="font-bold">EDUAI Assistant</h3>
              </div>
              <p className="text-sm text-blue-100 mb-4">¿Necesitas ayuda con tu tarea?</p>
              <button className="bg-white text-eduai-primary px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2">
                Abrir chat <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <div className="absolute -bottom-4 -right-4 text-8xl opacity-20">🤖</div>
          </div>
        </div>
      </div>
    </div>
  )
}

function StatCard({ icon, value, label, bg }: any) {
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

function ClassItem({ title, task, time, color }: any) {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-eduai-deep/20 rounded-lg">
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 ${color} rounded-lg flex items-center justify-center text-white font-bold text-lg`}>
          {title.charAt(0)}
        </div>
        <div>
          <h4 className="font-semibold text-eduai-deep dark:text-white">{title}</h4>
          <p className="text-sm text-gray-500 dark:text-gray-400">{task}</p>
        </div>
      </div>
      <div className="text-right">
        <div className="text-sm text-gray-500">{time}</div>
        <button className="mt-1 text-xs bg-eduai-primary text-white px-3 py-1 rounded-md">Ver tarea</button>
      </div>
    </div>
  )
}