import Actividades from './pages/Actividades'
import MisClases from './pages/MisClases'
import Mensajeria from './pages/Mensajeria'
import Entregas from './pages/Entregas'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import Layout from './components/Layout'

// IMPORTS DE TODAS LAS PÁGINAS
import Login from './pages/Login'
import InicioEstudiante from './pages/InicioEstudiante'
import InicioDocente from './pages/InicioDocente'
import InicioAdmin from './pages/InicioAdmin'
import Calificaciones from './pages/Calificaciones' // ← ¿ESTÁ ESTA LÍNEA?
import Perfil from './pages/Perfil'
import Kahoot from './pages/Kahoot'
import Youtube from './pages/Youtube'
import Classroom from './pages/Classroom'

function AppContent() {
  const { user } = useAuth()
  
  if (!user) return <Login />

  let PaginaInicio
  if (user.rol === 'student') PaginaInicio = <InicioEstudiante />
  else if (user.rol === 'teacher') PaginaInicio = <InicioDocente />
  else PaginaInicio = <InicioAdmin />

  return (
    <Layout role={user.rol} userName={`${user.nombre} ${user.apellido}`}>
      <Routes>
        <Route path="/" element={PaginaInicio} />
        
        {/* 👇 AQUÍ DEBEN ESTAR TODAS LAS RUTAS 👇 */}
        <Route path="/actividades" element={<Actividades />} />
        <Route path="/clases" element={<MisClases />} />
        <Route path="/chats" element={<Mensajeria />} />
        <Route path="/calificaciones" element={<Calificaciones />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/kahoot" element={<Kahoot />} />
        <Route path="/youtube" element={<Youtube />} />
        <Route path="/classroom" element={<Classroom />} />
        <Route path="/entregas" element={<Entregas />} />
        <Route path="*" element={<div className="p-8">Página no encontrada</div>} />
      </Routes>
    </Layout>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  )
}