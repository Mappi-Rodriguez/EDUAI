// src/pages/Perfil.tsx
import { useAuth } from '../contexts/AuthContext'
import { User, Mail, GraduationCap, Shield, BookOpen, Award } from 'lucide-react'

export default function Perfil() {
  const { user } = useAuth()

  if (!user) return null

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-eduai-deep dark:text-white mb-6">Mi Perfil</h1>
      
      {/* Tarjeta Principal de Información */}
      <div className="bg-white dark:bg-eduai-surface rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
        {/* Banner superior */}
        <div className="h-32 bg-gradient-to-r from-eduai-primary to-eduai-lavender"></div>
        
        {/* Avatar y Nombre */}
        <div className="px-8 pb-8">
          <div className="relative flex justify-between items-end -mt-12 mb-6">
            <div className="bg-white dark:bg-eduai-surface p-1 rounded-full">
              <img 
                src={`https://ui-avatars.com/api/?name=${user.nombre}+${user.apellido}&background=5278D8&color=fff&size=128`}
                alt="Avatar" 
                className="w-24 h-24 rounded-full border-4 border-white dark:border-eduai-surface"
              />
            </div>
            <span className={`px-4 py-1 rounded-full text-sm font-bold text-white ${
              user.rol === 'student' ? 'bg-blue-500' :
              user.rol === 'teacher' ? 'bg-purple-500' : 'bg-green-500'
            }`}>
              {user.rol === 'student' ? '🎓 Estudiante' : user.rol === 'teacher' ? '👨‍🏫 Docente' : '🛡️ Administrador'}
            </span>
          </div>

          <h2 className="text-2xl font-bold text-eduai-deep dark:text-white mb-1">
            {user.nombre} {user.apellido}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 flex items-center gap-2 mb-6">
            <Mail className="w-4 h-4" /> {user.email}
          </p>

          {/* Detalles del Perfil */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoItem 
              icon={<User className="w-5 h-5 text-eduai-primary" />} 
              label="Nombre completo" 
              value={`${user.nombre} ${user.apellido}`} 
            />
            <InfoItem 
              icon={<Mail className="w-5 h-5 text-eduai-primary" />} 
              label="Correo electrónico" 
              value={user.email} 
            />
            
            {user.rol === 'student' && (
              <>
                <InfoItem 
                  icon={<GraduationCap className="w-5 h-5 text-eduai-primary" />} 
                  label="Grado" 
                  value={user.grado || 'No especificado'} 
                />
                <InfoItem 
                  icon={<BookOpen className="w-5 h-5 text-eduai-primary" />} 
                  label="Sección" 
                  value={user.seccion || 'No especificada'} 
                />
              </>
            )}

            {user.rol === 'teacher' && (
              <InfoItem 
                icon={<Award className="w-5 h-5 text-eduai-primary" />} 
                label="Especialidad" 
                value="Docente Certificado" 
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function InfoItem({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-eduai-deep/20 rounded-xl">
      <div className="w-10 h-10 bg-white dark:bg-eduai-surface rounded-lg flex items-center justify-center shadow-sm">
        {icon}
      </div>
      <div>
        <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">{label}</p>
        <p className="font-semibold text-eduai-deep dark:text-white">{value}</p>
      </div>
    </div>
  )
}