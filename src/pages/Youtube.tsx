export default function YouTube() {
  return (
    <div className="h-[calc(100vh-100px)] flex flex-col">
      <div className="bg-white p-4 shadow-sm border-b flex justify-between items-center mb-2 rounded-t-xl">
        <h2 className="text-xl font-bold text-red-600 flex items-center gap-2">
          📺 Biblioteca YouTube Educativa
        </h2>
        <input 
          type="text" 
          placeholder="Buscar video..." 
          className="border rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-red-500 outline-none"
        />
      </div>
      
      {/* Ventana integrada de YouTube */}
      <iframe 
        src="https://www.youtube.com/education" 
        className="flex-1 w-full border-none rounded-b-xl shadow-inner bg-gray-50"
        title="YouTube Education"
      />
    </div>
  )
}