import { useState } from 'react'
import Sidebar from './sidebar'
import { Bell, LogOut, Menu } from 'lucide-react'

interface LayoutProps {
  role: 'student' | 'teacher' | 'admin'
  setRole: (role: 'student' | 'teacher' | 'admin') => void
  onLogout: () => void
  children: React.ReactNode
  userName: string
  userImage?: string
}
export default function Layout({ role, onLogout, children, userName, userImage }: LayoutProps) {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle('dark')
  }

  const roleLabels = {
    student: 'Estudiante',
    teacher: 'Docente',
    admin: 'Administrador'
  }

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-eduai-light dark:bg-eduai-dark flex">
        
        {/* ===== SIDEBAR ===== */}
        {isSidebarOpen && (
          <div className="fixed left-0 top-0 h-full z-30 w-64">
            <Sidebar 
              role={role} 
              isDarkMode={isDarkMode} 
              toggleDarkMode={toggleDarkMode} 
            />
          </div>
        )}

        {/* ===== CONTENIDO PRINCIPAL ===== */}
        <div 
          className={`flex-1 transition-all duration-300 ${
            isSidebarOpen ? 'ml-64' : 'ml-0'
          }`}
        >
          {/* Header SIEMPRE visible */}
          <header className="bg-white dark:bg-eduai-surface shadow-sm px-6 py-4 sticky top-0 z-20">
            <div className="flex items-center justify-between">
              
              {/* BOTÓN HAMBURGUESA - SIEMPRE VISIBLE */}
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-eduai-deep transition-colors"
                title={isSidebarOpen ? 'Ocultar menú' : 'Mostrar menú'}
              >
                <Menu className="w-6 h-6 text-eduai-deep dark:text-white" />
              </button>

              {/* Usuario */}
              <div className="flex items-center gap-3">
                <img
                  src={userImage || 'https://ui-avatars.com/api/?name=' + userName + '&background=5278D8&color=fff'}
                  alt={userName}
                  className="w-10 h-10 rounded-full border-2 border-eduai-primary"
                />
                <div>
                  <h2 className="font-semibold text-eduai-deep dark:text-white">
                    {userName}
                  </h2>
                  <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                    {roleLabels[role]}
                  </p>
                </div>
              </div>

              {/* Botones de acción */}
              <div className="flex items-center gap-3">
                <button
                  onClick={onLogout}
                  className="flex items-center gap-2 px-4 py-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors text-sm font-medium border border-red-200 dark:border-red-800"
                  title="Cerrar sesión"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden md:inline">Cerrar sesión</span>
                </button>

                <button className="relative p-2 hover:bg-gray-100 dark:hover:bg-eduai-deep rounded-lg">
                  <Bell className="w-5 h-5 text-eduai-deep dark:text-gray-300" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
              </div>
            </div>
          </header>

          {/* Contenido de la página */}
          <main className="p-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}