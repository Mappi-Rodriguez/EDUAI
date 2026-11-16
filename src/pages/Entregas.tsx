import { useState } from 'react'
import { FileText, Clock, CheckCircle, AlertCircle, Eye, Download } from 'lucide-react'

// Datos de ejemplo simulando entregas reales
const ENTREGAS_DATA = [
  { id: 1, alumno: 'Mariapaz Rodríguez', tarea: 'Ensayo Revolución Industrial', curso: 'Historia', fecha: 'Hace 2 horas', estado: 'Pendiente', archivo: 'ensayo_mariapaz.pdf' },
  { id: 2, alumno: 'Lupe Martínez', tarea: 'Ejercicios de Álgebra', curso: 'Matemáticas', fecha: 'Hace 5 horas', estado: 'Pendiente', archivo: 'algebra_lupe.docx' },
  { id: 3, alumno: 'Ashlie Gómez', tarea: 'Informe de Laboratorio', curso: 'Ciencias', fecha: 'Hace 1 día', estado: 'Revisado', nota: 18, archivo: 'lab_ashlie.pdf' },
  { id: 4, alumno: 'Nathan Galvez', tarea: 'Lectura Comprensiva', curso: 'Comunicación', fecha: 'Hace 2 días', estado: 'Atrasado', archivo: 'lectura_nathan.pdf' },
]

export default function Entregas() {
  const [filtro, setFiltro] = useState('Todos') // Todos, Pendiente, Revisado

  const entregasFiltradas = filtro === 'Todos' 
    ? ENTREGAS_DATA 
    : ENTREGAS_DATA.filter(e => e.estado === filtro)

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      
      {/* ENCABEZADO */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-eduai-deep">Buzón de Entregas</h1>
          <p className="text-gray-500 text-sm mt-1">Revisa y califica los trabajos de tus estudiantes.</p>
        </div>
        
        {/* Filtros rápidos */}
        <div className="flex bg-white p-1 rounded-lg border border-gray-200 shadow-sm">
          {['Todos', 'Pendiente', 'Revisado', 'Atrasado'].map((f) => (
            <button
              key={f}
              onClick={() => setFiltro(f)}
              className={`px-4 py-2 text-sm font-medium rounded-md transition ${
                filtro === f 
                  ? 'bg-eduai-primary text-white shadow-sm' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* LISTA DE ENTREGAS */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-500 uppercase text-xs font-semibold">
              <tr>
                <th className="px-6 py-4">Estudiante</th>
                <th className="px-6 py-4">Tarea / Curso</th>
                <th className="px-6 py-4">Fecha Entrega</th>
                <th className="px-6 py-4">Estado</th>
                <th className="px-6 py-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {entregasFiltradas.map((entrega) => (
                <tr key={entrega.id} className="hover:bg-gray-50 transition-colors">
                  
                  {/* Alumno */}
                  <td className="px-6 py-4 font-medium text-gray-800 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-eduai-light flex items-center justify-center text-xs font-bold text-eduai-primary">
                      {entrega.alumno.charAt(0)}
                    </div>
                    {entrega.alumno}
                  </td>

                  {/* Tarea */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-gray-700">
                      <FileText className="w-4 h-4 text-gray-400" />
                      <span className="font-medium">{entrega.tarea}</span>
                    </div>
                    <span className="text-xs text-gray-500 ml-6">{entrega.curso}</span>
                  </td>

                  {/* Fecha */}
                  <td className="px-6 py-4 text-gray-500">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {entrega.fecha}
                    </div>
                  </td>

                  {/* Estado */}
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold
                      ${entrega.estado === 'Pendiente' ? 'bg-yellow-100 text-yellow-700' : ''}
                      ${entrega.estado === 'Revisado' ? 'bg-green-100 text-green-700' : ''}
                      ${entrega.estado === 'Atrasado' ? 'bg-red-100 text-red-700' : ''}
                    `}>
                      {entrega.estado === 'Pendiente' && <AlertCircle className="w-3 h-3" />}
                      {entrega.estado === 'Revisado' && <CheckCircle className="w-3 h-3" />}
                      {entrega.estado}
                      {entrega.nota && <span className="ml-1 bg-white/50 px-1.5 rounded">{entrega.nota}</span>}
                    </span>
                  </td>

                  {/* Acciones */}
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="p-2 text-gray-500 hover:text-eduai-primary hover:bg-blue-50 rounded-lg transition" title="Ver archivo">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-500 hover:text-eduai-primary hover:bg-blue-50 rounded-lg transition" title="Descargar">
                        <Download className="w-4 h-4" />
                      </button>
                      {entrega.estado === 'Pendiente' && (
                        <button className="px-3 py-1.5 bg-eduai-primary text-white text-xs font-medium rounded-lg hover:bg-eduai-deep transition">
                          Calificar
                        </button>
                      )}
                    </div>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
          
          {entregasFiltradas.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              No hay entregas con este filtro.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}