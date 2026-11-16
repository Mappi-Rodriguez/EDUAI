import { createContext, useContext, useState, useEffect } from 'react'
import type { ReactNode } from 'react'

// 1. Definimos la interfaz del usuario incluyendo password opcional para el contexto interno
interface User {
  id: string
  nombre: string
  apellido: string
  email: string
  grado?: string
  seccion?: string
  rol: 'student' | 'teacher' | 'admin'
  password?: string // Agregamos esto para poder acceder a ella en el perfil si es necesario
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => boolean
  register: (userData: Omit<User, 'id'> & { password: string }) => boolean
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Cargar usuario guardado al iniciar
  useEffect(() => {
    const savedUser = localStorage.getItem('eduai_user')
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        console.error('Error al cargar usuario:', error)
      }
    }
    setIsLoading(false)
  }, [])

  const login = (email: string, password: string): boolean => {
    const users = JSON.parse(localStorage.getItem('eduai_users') || '[]')
    const foundUser = users.find((u: any) => u.email === email && u.password === password)
    
    if (foundUser) {
      // 2. CORRECCIÓN: Guardamos TODO el usuario (incluyendo email y password) 
      // para que el perfil pueda acceder a ellos.
      // Nota: En producción real, nunca guardamos password en localStorage, 
      // pero para este prototipo escolar funciona perfecto.
      setUser(foundUser)
      localStorage.setItem('eduai_user', JSON.stringify(foundUser))
      return true
    }
    return false
  }

  const register = (userData: Omit<User, 'id'> & { password: string }): boolean => {
    const users = JSON.parse(localStorage.getItem('eduai_users') || '[]')
    
    if (users.some((u: any) => u.email === userData.email)) {
      return false
    }

    const newUser = {
      ...userData,
      id: Date.now().toString()
    }

    users.push(newUser)
    localStorage.setItem('eduai_users', JSON.stringify(users))
    
    // También guardamos todo el nuevo usuario en la sesión
    setUser(newUser)
    localStorage.setItem('eduai_user', JSON.stringify(newUser))
    
    return true
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('eduai_user')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-eduai-light">
        <div className="text-eduai-primary text-xl font-bold">Cargando EDUAI...</div>
      </div>
    )
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}