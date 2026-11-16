export default function Classroom() {
  return (
    <div className="h-[calc(100vh-100px)] flex flex-col">
      <div className="bg-white p-4 shadow-sm border-b flex justify-between items-center mb-2 rounded-t-xl">
        <h2 className="text-xl font-bold text-green-600 flex items-center gap-2">
          🔗 Google Classroom Integrado
        </h2>
        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Sincronizado</span>
      </div>
      
      {/* Ventana integrada de Classroom */}
      <iframe 
        src="https://classroom.google.com/u/0/h/st?hl=es" 
        className="flex-1 w-full border-none rounded-b-xl shadow-inner bg-gray-50"
        title="Google Classroom"
      />
    </div>
  )
}