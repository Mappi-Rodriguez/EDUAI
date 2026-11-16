import { useState } from 'react'

export default function Kahoot() {
  const [cargando, setCargando] = useState(true)

  return (
    <div className="h-[calc(100vh-120px)] flex flex-col bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Barra superior integrada */}
      <div className="bg-purple-600 text-white px-6 py-3 flex justify-between items-center shadow-md z-10">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🎮</span>
          <h2 className="font-bold text-lg">Creador de Kahoot - Modo Integrado</h2>
        </div>
        <div className="text-xs bg-purple-700 px-3 py-1 rounded-full opacity-80">
          Vista dentro de EDUAI
        </div>
      </div>

      {/* Contenedor del Iframe */}
      <div className="flex-1 relative bg-gray-50">
        {cargando && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50 z-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
              <p className="text-purple-600 font-medium">Conectando con Kahoot...</p>
              <p className="text-xs text-gray-400 mt-2">Esto puede tardar unos segundos</p>
            </div>
          </div>
        )}
        
        {/* Iframe con Proxy para evitar bloqueos de seguridad */}
        <iframe 
          src="https://corsproxy.io/?https://create.kahoot.it"
          className="w-full h-full border-none"
          title="Kahoot Integrado"
          onLoad={() => setCargando(false)}
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        />
      </div>
    </div>
  )
}