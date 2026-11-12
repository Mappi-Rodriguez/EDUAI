// src/components/Logo.tsx

interface LogoProps {
  size?: 'small' | 'medium' | 'large'
  showText?: boolean
}

export default function Logo({ size = 'medium', showText = true }: LogoProps) {
  const sizes = {
    small: { icon: 32, text: 'text-lg' },
    medium: { icon: 48, text: 'text-2xl' },
    large: { icon: 80, text: 'text-4xl' },
  }

  const currentSize = sizes[size]

  return (
    <div className="flex items-center gap-3">
      {/* Ícono SVG del logo */}
      <svg 
        width={currentSize.icon} 
        height={currentSize.icon} 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Libro abierto */}
        <path 
          d="M20 60 L50 70 L80 60 L80 80 L50 90 L20 80 Z" 
          fill="#263D70"
        />
        <path 
          d="M20 60 L50 70 L50 90 L20 80 Z" 
          fill="#1a2d5a"
        />
        
        {/* Red de nodos (IA) */}
        <circle cx="35" cy="45" r="4" fill="#5278D8" />
        <circle cx="50" cy="35" r="5" fill="#5278D8" />
        <circle cx="65" cy="45" r="4" fill="#A99BEF" />
        <circle cx="42" cy="55" r="3" fill="#A99BEF" />
        <circle cx="58" cy="55" r="4" fill="#5278D8" />
        <circle cx="50" cy="50" r="3" fill="#A99BEF" />
        
        {/* Líneas conectando nodos */}
        <line x1="35" y1="45" x2="50" y2="35" stroke="#5278D8" strokeWidth="1.5" />
        <line x1="50" y1="35" x2="65" y2="45" stroke="#5278D8" strokeWidth="1.5" />
        <line x1="35" y1="45" x2="42" y2="55" stroke="#A99BEF" strokeWidth="1" />
        <line x1="65" y1="45" x2="58" y2="55" stroke="#A99BEF" strokeWidth="1" />
        <line x1="42" y1="55" x2="50" y2="50" stroke="#A99BEF" strokeWidth="1" />
        <line x1="58" y1="55" x2="50" y2="50" stroke="#A99BEF" strokeWidth="1" />
        <line x1="50" y1="35" x2="50" y2="50" stroke="#5278D8" strokeWidth="1.5" />
      </svg>

      {/* Texto EDUAI */}
      {showText && (
        <span className={`${currentSize.text} font-bold text-eduai-deep dark:text-white`}>
          EDUAI
        </span>
      )}
    </div>
  )
}