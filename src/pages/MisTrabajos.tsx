import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FileText, Clock, Folder, Eye, Trash2, X, CheckCircle, Lightbulb, BookOpen, HelpCircle, Search, Award } from 'lucide-react'

export default function MisTrabajos() {
  const navigate = useNavigate()
  const [trabajos, setTrabajos] = useState<any[]>([])
  const [trabajoVer, setTrabajoVer] = useState<any>(null)
  const [busqueda, setBusqueda] = useState('')
  const [filtroCurso, setFiltroCurso] = useState('Todos')

  // Cargar trabajos desde localStorage
  useEffect(() => {
    const guardados = JSON.parse(localStorage.getItem('eduai_trabajos') || '[]')
    setTrabajos(guardados)
  }, [])

  // Obtener lista de cursos únicos para el filtro
  const cursos = ['Todos', ...Array.from(new Set(trabajos.map(t => t.curso)))]

  // Filtrar trabajos
  const trabajosFiltrados = trabajos.filter(t => {
    const coincideBusqueda = t.titulo.toLowerCase().includes(busqueda.toLowerCase())
    const coincideCurso = filtroCurso === 'Todos' || t.curso === filtroCurso
    return coincideBusqueda && coincideCurso
  })

  const borrarTrabajo = (id: number) => {
    if (!confirm('¿Seguro que deseas eliminar este trabajo?')) return
    const nuevosTrabajos = trabajos.filter(t => t.id !== id)
    setTrabajos(nuevosTrabajos)
    localStorage.setItem('eduai_trabajos', JSON.stringify(nuevosTrabajos))
  }

  const tiposBloque: any = {
    idea: { icono: <Lightbulb className="w-4 h-4 text-yellow-500" />, color: 'border-l-yellow-400 bg-yellow-50 dark:bg-yellow-900/10', nombre: 'Mi Idea' },
    cita: { icono: <BookOpen className="w-4 h-4 text-blue-500" />, color: 'border-l-blue-400 bg-blue-50 dark:bg-blue-900/10', nombre: 'Cita / Referencia' },
    duda: { icono: <HelpCircle className="w-4 h-4 text-red-500" />, color: 'border-l-red-400 bg-red-50 dark:bg-red-900/10', nombre: 'Duda para el profe' },
    conclusion: { icono: <CheckCircle className="w-4 h-4 text-green-500" />, color: 'border-l-green-400 bg-green-50 dark:bg-green-900/10', nombre: 'Conclusión' }
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-eduai-deep dark:text-white flex items-center gap-3">
          <FileText className="w-8 h-8 text-eduai-primary" />
          Mis Trabajos
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Revisa todos los documentos que has guardado en tus clases
        </p>
      </div>

      {/* Tarjeta de estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white dark:bg-eduai-surface rounded-xl p-5 border border-gray-100 dark:border-gray-700 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
            <FileText className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-eduai-deep dark:text-white">{trabajos.length}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Trabajos totales</p>
          </div>
        </div>
        <div className="bg-white dark:bg-eduai-surface rounded-xl p-5 border border-gray-100 dark:border-gray-700 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
            <Folder className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-eduai-deep dark:text-white">{cursos.length - 1}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Cursos con trabajos</p>
          </div>
        </div>
        <div className="bg-white dark:bg-eduai-surface rounded-xl p-5 border border-gray-100 dark:border-gray-700 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg flex items-center justify-center">
            <Award className="w-6 h-6 text-yellow-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-eduai-deep dark:text-white">
              {trabajos.reduce((acc, t) => acc + (t.cantidadBloques || 0), 0)}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Bloques creados</p>
          </div>
        </div>
      </div>

      {/* Buscador y filtros */}
      <div className="bg-white dark:bg-eduai-surface rounded-xl p-4 border border-gray-100 dark:border-gray-700 shadow-sm mb-6">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="🔍 Buscar por título..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-eduai-primary text-eduai-deep dark:text-white"
            />
          </div>
          <select
            value={filtroCurso}
            onChange={(e) => setFiltroCurso(e.target.value)}
            className="px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-eduai-primary text-eduai-deep dark:text-white"
          >
            {cursos.map(curso => (
              <option key={curso} value={curso}>{curso}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Lista de trabajos */}
      {trabajosFiltrados.length === 0 ? (
        <div className="bg-white dark:bg-eduai-surface rounded-xl p-12 text-center border border-gray-100 dark:border-gray-700 shadow-sm">
          <div className="w-24 h-24 mx-auto bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
            <FileText className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-bold text-eduai-deep dark:text-white mb-2">
            {trabajos.length === 0 ? 'Aún no tienes trabajos' : 'No se encontraron resultados'}
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            {trabajos.length === 0 
              ? 'Crea tu primer documento interactivo entrando a una clase' 
              : 'Prueba con otra búsqueda o cambia el filtro'}
          </p>
          {trabajos.length === 0 && (
            <button
              onClick={() => navigate('/clases')}
              className="bg-eduai-primary hover:bg-eduai-deep text-white px-6 py-3 rounded-lg font-medium transition"
            >
              📚 Ir a Mis Clases
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {trabajosFiltrados.map(trabajo => (
            <div
              key={trabajo.id}
              className="bg-white dark:bg-eduai-surface rounded-xl p-5 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md hover:border-eduai-primary transition"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-bold text-eduai-deep dark:text-white mb-1 line-clamp-2">
                    {trabajo.titulo}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                    <Folder className="w-3 h-3" />
                    <span>{trabajo.curso}</span>
                  </div>
                </div>
                <div className="w-10 h-10 bg-eduai-primary/10 rounded-lg flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5 text-eduai-primary" />
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 mb-3">
                <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-300">
                  <Clock className="w-3 h-3" />
                  <span>Guardado: {trabajo.fecha} • {trabajo.hora}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-300 mt-1">
                  <span className="bg-eduai-primary/10 text-eduai-primary px-2 py-0.5 rounded-full font-medium">
                    {trabajo.cantidadBloques} bloques
                  </span>
                  <span className="bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 px-2 py-0.5 rounded-full font-medium">
                    {trabajo.trimestre}
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setTrabajoVer(trabajo)}
                  className="flex-1 flex items-center justify-center gap-2 bg-eduai-primary hover:bg-eduai-deep text-white px-3 py-2 rounded-lg text-sm font-medium transition"
                >
                  <Eye className="w-4 h-4" /> Ver
                </button>
                <button
                  onClick={() => borrarTrabajo(trabajo.id)}
                  className="px-3 py-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-100 transition border border-red-200 dark:border-red-800"
                  title="Eliminar trabajo"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal para ver trabajo */}
      {trabajoVer && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-eduai-surface rounded-xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-white dark:bg-eduai-surface border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex justify-between items-center">
              <div>
                <h2 className="font-bold text-lg text-eduai-deep dark:text-white">{trabajoVer.titulo}</h2>
                <p className="text-xs text-gray-500 mt-1">
                  {trabajoVer.curso} • {trabajoVer.trimestre}
                </p>
              </div>
              <button onClick={() => setTrabajoVer(null)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-2 mb-1">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-semibold text-blue-800 dark:text-blue-300">
                    Guardado el {trabajoVer.fecha} a las {trabajoVer.hora}
                  </span>
                </div>
                <p className="text-xs text-blue-700 dark:text-blue-400">
                  Profesor: {trabajoVer.profesor} • {trabajoVer.cantidadBloques} bloques
                </p>
              </div>

              <div className="space-y-3">
                {trabajoVer.bloques.map((bloque: any, index: number) => {
                  const config = tiposBloque[bloque.tipo]
                  return (
                    <div key={bloque.id} className={`p-4 rounded-lg border-l-4 ${config.color} border border-gray-200 dark:border-gray-700`}>
                      <div className="flex items-center gap-2 mb-2 font-semibold text-sm text-gray-700 dark:text-gray-200">
                        <span className="text-xs font-bold text-gray-400 mr-1">#{index + 1}</span>
                        {config.icono}
                        <span>{config.nombre}</span>
                      </div>
                      <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-line">
                        {bloque.texto}
                      </p>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 px-6 py-3 flex justify-end gap-2">
              <button
                onClick={() => setTrabajoVer(null)}
                className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-200"
              >
                Cerrar
              </button>
              <button
                onClick={() => navigate('/clases')}
                className="px-4 py-2 bg-eduai-primary text-white rounded-lg text-sm font-medium hover:bg-eduai-deep"
              >
                Crear otro trabajo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}