import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { clases } from '../data/mockData'
import { ArrowLeft, Save, FileText, Video, Rocket } from 'lucide-react'

export default function ClaseDetalle() {
  const { id } = useParams()
  const navigate = useNavigate()
  
  // Buscar la clase real basada en el ID de la URL
  const claseActual = clases.find(c => c.id === id) || clases[0]

  // Datos de ejemplo para los materiales (luego vendrán de tu BD)
  const materialesProfesor = [
    { id: 1, tipo: "separata", titulo: "SEPARATA 1: Fundamentos para la sostenibilidad", contenido: "La presente separata contiene el desarrollo de los conceptos sobre perspectivas ambientales y toma de decisiones.", fecha: "08 Sep 2026", icono: <FileText className="w-6 h-6 text-blue-600" /> },
    { id: 2, tipo: "motivacion", titulo: "MOTIVACIÓN: Video resumen", contenido: "Comparto el siguiente video como resumen de lo tratado en clase y conceptos adicionales.", fecha: "09 Sep 2026", icono: <Video className="w-6 h-6 text-red-600" /> },
    { id: 3, tipo: "proyecto", titulo: "PROYECTO DE APRENDIZAJE", contenido: "Desarrollo del proyecto final del trimestre sobre conservación ambiental.", fecha: "03 Nov 2026", icono: <Rocket className="w-6 h-6 text-purple-600" /> }
  ]

  const [materialSeleccionado, setMaterialSeleccionado] = useState<any>(null)
  const [documentosEstudiante, setDocumentosEstudiante] = useState<any[]>([])
  const [documentoActivo, setDocumentoActivo] = useState<any>(null)
  const [contenidoDoc, setContenidoDoc] = useState("")
  const [vista, setVista] = useState<"materiales" | "documento">("materiales")

  const crearDocumento = () => {
    const nuevoDoc = {
      id: Date.now(),
      titulo: `Mi respuesta ${documentosEstudiante.length + 1}`,
      fecha: new Date().toLocaleDateString(),
      contenido: ""
    }
    setDocumentosEstudiante([...documentosEstudiante, nuevoDoc])
    setDocumentoActivo(nuevoDoc)
    setContenidoDoc("")
    setVista("documento")
  }

  const guardarDocumento = () => {
    const docsActualizados = documentosEstudiante.map(doc => 
      doc.id === documentoActivo.id ? { ...doc, contenido: contenidoDoc } : doc
    )
    setDocumentosEstudiante(docsActualizados)
    alert("✅ ¡Documento guardado exitosamente!")
    setVista("materiales")
  }

  // VISTA: Editor de documento
  if (vista === "documento" && documentoActivo) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="bg-white dark:bg-eduai-surface border-b border-gray-200 dark:border-gray-700 px-6 py-4">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button onClick={() => setVista("materiales")} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition">
                <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </button>
              <div>
                <div className="text-sm text-gray-500 dark:text-gray-400">{claseActual.nombre}</div>
                <input 
                  type="text" 
                  value={documentoActivo.titulo} 
                  onChange={(e) => setDocumentoActivo({...documentoActivo, titulo: e.target.value})}
                  className="text-xl font-bold text-eduai-deep dark:text-white bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-eduai-primary rounded px-2 py-1 w-80"
                />
              </div>
            </div>
            <button onClick={guardarDocumento} className="bg-eduai-primary hover:bg-eduai-deep text-white px-6 py-2 rounded-lg font-medium transition shadow-sm flex items-center gap-2">
              <Save className="w-4 h-4" /> Guardar
            </button>
          </div>
        </div>

        <div className="max-w-6xl mx-auto p-6">
          <div className="bg-white dark:bg-eduai-surface rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-2">
            <ReactQuill theme="snow" value={contenidoDoc} onChange={setContenidoDoc} className="dark:text-gray-200" style={{ height: '500px' }} />
          </div>
        </div>
      </div>
    )
  }

  // VISTA: Lista de materiales del profesor
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="bg-white dark:bg-eduai-surface border-b border-gray-200 dark:border-gray-700 px-6 py-4">
        <div className="max-w-6xl mx-auto">
          <button onClick={() => navigate('/clases')} className="text-sm text-eduai-primary hover:underline mb-2 flex items-center gap-1">
            <ArrowLeft className="w-4 h-4" /> Volver a Mis Clases
          </button>
          <h1 className="text-2xl font-bold text-eduai-deep dark:text-white">{claseActual.nombre}</h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">Profesor: {claseActual.profesor}</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* COLUMNA IZQUIERDA: Materiales */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">📚 Materiales de la clase</h2>
            {materialesProfesor.map(material => (
              <div key={material.id} onClick={() => setMaterialSeleccionado(material)} className="bg-white dark:bg-eduai-surface rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-5 hover:shadow-md hover:border-eduai-primary transition cursor-pointer">
                <div className="flex items-start gap-4">
                  <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">{material.icono}</div>
                  <div className="flex-1">
                    <h3 className="font-bold text-eduai-deep dark:text-white text-lg mb-1">{material.titulo}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{material.fecha}</p>
                    <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">{material.contenido}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* COLUMNA DERECHA: Acciones */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-eduai-surface rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-5">
              <h3 className="font-semibold text-eduai-deep dark:text-white mb-2">Trimestre Actual</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">En progreso</p>
            </div>

            <button onClick={crearDocumento} className="w-full bg-gradient-to-r from-eduai-primary to-eduai-deep hover:opacity-90 text-white px-6 py-3 rounded-lg font-medium transition shadow-md flex items-center justify-center gap-2">
              <FileText className="w-5 h-5" /> Crear mi documento
            </button>

            {documentosEstudiante.length > 0 && (
              <div className="bg-white dark:bg-eduai-surface rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-5">
                <h3 className="font-semibold text-eduai-deep dark:text-white mb-3">📝 Mis documentos</h3>
                <div className="space-y-2">
                  {documentosEstudiante.map(doc => (
                    <div key={doc.id} onClick={() => { setDocumentoActivo(doc); setContenidoDoc(doc.contenido || ""); setVista("documento") }} className="p-3 bg-gray-50 dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-gray-700 rounded-md cursor-pointer transition border border-gray-200 dark:border-gray-600">
                      <div className="font-medium text-sm text-eduai-deep dark:text-white">{doc.titulo}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{doc.fecha}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal de Material */}
      {materialSeleccionado && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-eduai-surface rounded-lg max-w-3xl w-full max-h-[80vh] overflow-y-auto">
            <div className="sticky top-0 bg-white dark:bg-eduai-surface border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-eduai-deep dark:text-white">{materialSeleccionado.titulo}</h2>
              <button onClick={() => setMaterialSeleccionado(null)} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white text-2xl">✕</button>
            </div>
            <div className="p-6">
              <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 whitespace-pre-line mb-6">
                {materialSeleccionado.contenido}
              </div>
              <button onClick={() => { setMaterialSeleccionado(null); crearDocumento() }} className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition flex items-center gap-2">
                <FileText className="w-4 h-4" /> Responder a este material
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}