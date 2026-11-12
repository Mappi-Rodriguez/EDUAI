import { Routes, Route } from 'react-router-dom'
import { useAuth } from './contexts/AuthContext'
import Layout from './components/Layout'
import Login from './pages/Login'
import InicioEstudiante from './pages/InicioEstudiante'
import InicioDocente from './pages/InicioDocente'
import InicioAdmin from './pages/InicioAdmin'
import MisClases from './pages/MisClases'
import ClaseDetalle from './pages/ClaseDetalle' // ← Agregamos la nueva
import Perfil from './pages/Perfil'
import Asistente from './pages/Asistente'

function App() {
  const { user, logout } = useAuth()

  if (!user) {
    return <Login />
  }

  const renderInicio = () => {
    switch (user.rol) {
      case 'student': return <InicioEstudiante />
      case 'teacher': return <InicioDocente />
      case 'admin': return <InicioAdmin />
      default: return <InicioEstudiante />
    }
  }

  return (
    <Layout 
      role={user.rol} 
      setRole={() => {}}
      onLogout={logout}
      userName={`${user.nombre} ${user.apellido}`}
      userImage={`https://ui-avatars.com/api/?name=${user.nombre}+${user.apellido}&background=5278D8&color=fff`}
    >
      <Routes>
        <Route path="/" element={renderInicio()} />
        <Route path="/clases" element={<MisClases />} />
        <Route path="/clases/:id" element={<ClaseDetalle />} /> {/* ← Ruta nueva */}
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/asistente" element={<Asistente />} />
      </Routes>
    </Layout>
  )
}

export default App