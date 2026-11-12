import { 
  Home, 
  BookOpen, 
  ClipboardList, 
  FolderOpen, 
  Bot, 
  User, 
  Moon, 
  Sun,
  Shield,
  MessageCircle,
  Search,
  Library
} from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import Logo from './logo'

interface SidebarProps {
  role: 'student' | 'teacher' | 'admin'
  isDarkMode: boolean
  toggleDarkMode: () => void
}
type MenuItem = {
  name: string
  icon: any
  path: string
  badge?: number
}

export default function Sidebar({ role, isDarkMode, toggleDarkMode }: SidebarProps) {
  const location = useLocation()
  
  const menus: Record<'student' | 'teacher' | 'admin', MenuItem[]> = {
    student: [
  { name: 'Inicio', icon: Home, path: '/' },
  { name: 'Mis Clases', icon: BookOpen, path: '/clases' },
  { name: 'Publicaciones', icon: ClipboardList, path: '/publicaciones' },
  { name: 'Actividades', icon: ClipboardList, path: '/actividades' },
  { name: 'Mis Trabajos', icon: FolderOpen, path: '/trabajos' },
  { name: 'Asistente de Educación', icon: Bot, path: '/asistente' },
  { name: 'Mi Perfil', icon: User, path: '/perfil' },
],
    teacher: [
      { name: 'Inicio', icon: Home, path: '/' },
      { name: 'Mis Clases', icon: BookOpen, path: '/clases' },
      { name: 'Publicaciones', icon: ClipboardList, path: '/publicaciones' },
      { name: 'Chats', icon: MessageCircle, path: '/chats', badge: 3 },
      { name: 'Actividades', icon: ClipboardList, path: '/actividades' },
      { name: 'Entregas', icon: FolderOpen, path: '/entregas' },
      { name: 'Transparencia IA', icon: Shield, path: '/transparencia' },
      { name: 'Calificaciones', icon: ClipboardList, path: '/calificaciones' },
      { name: 'Recursos', icon: Library, path: '/recursos' },
      { name: 'Mi Perfil', icon: User, path: '/perfil' },
    ],
    admin: [
      { name: 'Panel Principal', icon: Home, path: '/' },
      { name: 'Usuarios', icon: User, path: '/usuarios' },
      { name: 'Instituciones', icon: BookOpen, path: '/instituciones' },
      { name: 'Estadísticas', icon: ClipboardList, path: '/estadisticas' },
      { name: 'Configuración IA', icon: Bot, path: '/config-ia' },
      { name: 'Registros', icon: Shield, path: '/registros' },
      { name: 'Vista previa', icon: Search, path: '/vista-previa' },
      { name: 'Configuración', icon: User, path: '/config' },
    ],
  }

  const currentMenu = menus[role]

  const taglines = {
    student: 'Aprende • Crea • Colabora',
    teacher: 'Educar también es inspirar ✨',
    admin: 'Gestiona hoy, transforma mañana',
  }

  return (
       <aside className="w-64 bg-eduai-deep text-white min-h-screen flex flex-col h-screen">
      <div className="p-6 border-b border-white/10">
        <Logo size="medium" showText={true} />
        <p className="text-xs text-gray-300 mt-2 ml-12">{taglines[role]}</p>
      </div>

      <nav className="flex-1 overflow-y-auto py-4 px-3">
        <ul className="space-y-1">
          {currentMenu.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group ${
                  location.pathname === item.path 
                    ? 'bg-eduai-primary text-white' 
                    : 'hover:bg-white/10 text-gray-300'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="text-sm font-medium">{item.name}</span>
                {item.badge && (
                  <span className="ml-auto bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-white/10">
        <div className="bg-eduai-surface rounded-lg p-3 mb-3">
          <p className="text-xs text-gray-300">
            {role === 'student' && 'Tu esfuerzo también cuenta ⭐'}
            {role === 'teacher' && 'Educar es transformar vidas 🌟'}
            {role === 'admin' && 'Sistema en óptimas condiciones ✅'}
          </p>
        </div>

        <button
          onClick={toggleDarkMode}
          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors w-full text-left"
        >
          {isDarkMode ? (
            <Sun className="w-5 h-5 text-yellow-400" />
          ) : (
            <Moon className="w-5 h-5 text-gray-300" />
          )}
          <span className="text-sm font-medium">
            {isDarkMode ? 'Modo Claro' : 'Modo Oscuro'}
          </span>
        </button>
      </div>
    </aside>
  )
}