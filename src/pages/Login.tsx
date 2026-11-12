import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { GraduationCap, User, Shield, Eye, EyeOff } from 'lucide-react'

export default function Login() {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  
  // Campos del formulario
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    password: '',
    grado: '',
    seccion: '',
    rol: 'student' as 'student' | 'teacher' | 'admin'
  })

  const { login, register } = useAuth()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (isLogin) {
      // Login
      const success = login(formData.email, formData.password)
      if (!success) {
        setError('Email o contraseña incorrectos')
      }
    } else {
      // Registro
      if (!formData.nombre || !formData.apellido || !formData.email || !formData.password) {
        setError('Por favor completa todos los campos obligatorios')
        return
      }

      if (formData.rol === 'student' && (!formData.grado || !formData.seccion)) {
        setError('Los estudiantes deben ingresar grado y sección')
        return
      }

      const success = register(formData)
      if (!success) {
        setError('Este email ya está registrado')
      }
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-eduai-deep via-eduai-primary to-eduai-lavender flex items-center justify-center p-4">
      <div className="bg-white dark:bg-eduai-surface rounded-2xl shadow-2xl w-full max-w-md p-8">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-eduai-primary to-eduai-lavender rounded-2xl mb-4">
            <GraduationCap className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-eduai-deep dark:text-white">EDUAI</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            {isLogin ? 'Inicia sesión en tu cuenta' : 'Crea tu cuenta nueva'}
          </p>
        </div>

        {/* Toggle Login/Registro */}
        <div className="flex gap-2 mb-6 bg-gray-100 dark:bg-eduai-deep/30 p-1 rounded-lg">
          <button
            type="button"
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors ${
              isLogin ? 'bg-white dark:bg-eduai-surface text-eduai-primary shadow-sm' : 'text-gray-500'
            }`}
          >
            Iniciar Sesión
          </button>
          <button
            type="button"
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors ${
              !isLogin ? 'bg-white dark:bg-eduai-surface text-eduai-primary shadow-sm' : 'text-gray-500'
            }`}
          >
            Registrarse
          </button>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Campos de Registro (solo se muestran si no es login) */}
          {!isLogin && (
            <>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Nombre *
                  </label>
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-eduai-primary dark:bg-eduai-deep/30 dark:text-white"
                    placeholder="Mariapaz"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Apellido *
                  </label>
                  <input
                    type="text"
                    name="apellido"
                    value={formData.apellido}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-eduai-primary dark:bg-eduai-deep/30 dark:text-white"
                    placeholder="Rodríguez"
                  />
                </div>
              </div>

              {/* Select de Rol */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Soy... *
                </label>
                <select
                  name="rol"
                  value={formData.rol}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-eduai-primary dark:bg-eduai-deep/30 dark:text-white"
                >
                  <option value="student">🎓 Estudiante</option>
                  <option value="teacher">👨‍🏫 Docente</option>
                  <option value="admin">🛡️ Administrador</option>
                </select>
              </div>

              {/* Grado y Sección (solo para estudiantes) */}
              {formData.rol === 'student' && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Grado *
                    </label>
                    <input
                      type="text"
                      name="grado"
                      value={formData.grado}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-eduai-primary dark:bg-eduai-deep/30 dark:text-white"
                      placeholder="10°"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Sección *
                    </label>
                    <input
                      type="text"
                      name="seccion"
                      value={formData.seccion}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-eduai-primary dark:bg-eduai-deep/30 dark:text-white"
                      placeholder="A"
                    />
                  </div>
                </div>
              )}
            </>
          )}

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-eduai-primary dark:bg-eduai-deep/30 dark:text-white"
              placeholder="tu@email.com"
              required
            />
          </div>

          {/* Contraseña */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Contraseña *
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-eduai-primary dark:bg-eduai-deep/30 dark:text-white pr-10"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Botón Submit */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-eduai-primary to-eduai-lavender text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
          >
            {isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
          {isLogin ? '¿No tienes cuenta? ' : '¿Ya tienes cuenta? '}
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-eduai-primary font-medium hover:underline"
          >
            {isLogin ? 'Regístrate aquí' : 'Inicia sesión'}
          </button>
        </p>
      </div>
    </div>
  )
}