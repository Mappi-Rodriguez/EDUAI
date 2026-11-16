import { 
  Home, BookOpen, ClipboardList, FolderOpen, Bot, User, Moon, Sun,
  Shield, MessageCircle, Search, Gamepad2, Video, ExternalLink, Globe, ChevronDown
} from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import Logo from './logo'
import { useState } from 'react'
import { useTranslation } from 'react-i18next' // 👈 IMPORTANTE

interface SidebarProps {
  role: 'student' | 'teacher' | 'admin'
  isDarkMode: boolean
  toggleDarkMode: () => void
}

type MenuItem = { name: string; icon: any; path: string; badge?: number; key?: string }

export default function Sidebar({ role, isDarkMode, toggleDarkMode }: SidebarProps) {
  const location = useLocation()
  const [langMenuOpen, setLangMenuOpen] = useState(false)
  const { t, i18n } = useTranslation() // 👈 Hook de traducción

  // Definimos los menús usando las CLAVES de traducción (key)
  const menus: Record<'student' | 'teacher' | 'admin', MenuItem[]> = {
    student: [
      { name: t('sidebar.inicio'), icon: Home, path: '/', key: 'inicio' },
      { name: t('sidebar.mis_clases'), icon: BookOpen, path: '/clases', key: 'mis_clases' },
      { name: t('sidebar.publicaciones'), icon: ClipboardList, path: '/publicaciones', key: 'publicaciones' },
      { name: t('sidebar.actividades'), icon: ClipboardList, path: '/actividades', key: 'actividades' },
      { name: 'Mis Trabajos', icon: FolderOpen, path: '/trabajos' },
      { name: 'Asistente IA', icon: Bot, path: '/asistente' },
      { name: t('sidebar.perfil'), icon: User, path: '/perfil', key: 'perfil' },
    ],
    teacher: [
      { name: t('sidebar.inicio'), icon: Home, path: '/', key: 'inicio' },
      { name: t('sidebar.mis_clases'), icon: BookOpen, path: '/clases', key: 'mis_clases' },
      { name: t('sidebar.chats'), icon: MessageCircle, path: '/chats', badge: 3, key: 'chats' },
      { name: t('sidebar.actividades'), icon: ClipboardList, path: '/actividades', key: 'actividades' },
      { name: t('sidebar.entregas'), icon: FolderOpen, path: '/entregas', key: 'entregas' },
      { name: t('sidebar.transparencia_ia'), icon: Shield, path: '/transparencia', key: 'transparencia_ia' },
      { name: t('sidebar.calificaciones'), icon: ClipboardList, path: '/calificaciones', key: 'calificaciones' },
      { name: t('sidebar.kahoot'), icon: Gamepad2, path: '/kahoot', key: 'kahoot' },
      { name: t('sidebar.youtube'), icon: Video, path: '/youtube', key: 'youtube' },
      { name: t('sidebar.classroom'), icon: ExternalLink, path: '/classroom', key: 'classroom' },
      { name: t('sidebar.perfil'), icon: User, path: '/perfil', key: 'perfil' },
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

  // Función para cambiar idioma
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng)
    setLangMenuOpen(false)
  }

  // Mapeo de códigos de idioma a nombres visibles
  const langNames: Record<string, string> = {
    es: 'Español',
    en: 'English (B2)',
    pt: 'Português',
    fr: 'Français'
  }

  return (
    <aside className="w-64 bg-eduai-deep text-white min-h-screen flex flex-col h-screen relative">
      <div className="p-6 border-b border-white/10">
        <Logo size="medium" showText={true} />
        <p className="text-xs text-gray-300 mt-2 ml-12">
          {role === 'teacher' ? t('sidebar.frase_docente') : 'Educar también es inspirar ✨'}
        </p>
      </div>

      <nav className="flex-1 overflow-y-auto py-4 px-3">
        <ul className="space-y-1">
          {currentMenu.map((item) => (
            <li key={item.key || item.name}>
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

      {/* SELECTOR DE IDIOMAS */}
      <div className="p-4 border-t border-white/10 space-y-3">
        <div className="relative">
          <button 
            onClick={() => setLangMenuOpen(!langMenuOpen)}
            className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-white/10 transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <Globe className="w-5 h-5 text-gray-300" />
              <span className="text-sm font-medium">{langNames[i18n.language] || 'Español'}</span>
            </div>
            <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${langMenuOpen ? 'rotate-180' : ''}`} />
          </button>

          {langMenuOpen && (
            <div className="absolute bottom-full left-0 w-full mb-2 bg-white text-gray-800 rounded-lg shadow-xl border border-gray-200 overflow-hidden z-50">
              {Object.entries(langNames).map(([code, name]) => (
                <button
                  key={code}
                  onClick={() => changeLanguage(code)}
                  className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-100 transition-colors ${
                    i18n.language === code ? 'bg-eduai-light text-eduai-primary font-bold' : ''
                  }`}
                >
                  {name}
                </button>
              ))}
            </div>
          )}
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
            {isDarkMode ? t('sidebar.modo_claro') : t('sidebar.modo_oscuro')}
          </span>
        </button>
      </div>
    </aside>
  )
}