// src/data/mockData.ts

export const usuarios = {
  estudiante: {
    nombre: "Mariapaz Rodríguez",
    rol: "Estudiante",
    avatar: "https://ui-avatars.com/api/?name=Mariapaz+Rodriguez&background=5278D8&color=fff"
  },
  docente: {
    nombre: "Prof. Daniela Torres",
    rol: "Docente",
    avatar: "https://ui-avatars.com/api/?name=Daniela+Torres&background=A99BEF&color=fff"
  },
  admin: {
    nombre: "Magpi Rodríguez",
    rol: "Superadministrador",
    avatar: "https://ui-avatars.com/api/?name=Magpi+Rodriguez&background=263D70&color=fff"
  }
}

export const clases = [
  { id: 1, nombre: "Educación Física", profesor: "Prof. García", color: "bg-orange-500", alumnos: 32 },
  { id: 2, nombre: "Matemáticas II", profesor: "Prof. Daniela Torres", color: "bg-blue-500", alumnos: 28 },
  { id: 3, nombre: "Historia Universal", profesor: "Prof. Rodríguez", color: "bg-purple-500", alumnos: 30 },
  { id: 4, nombre: "Ciencias Naturales", profesor: "Prof. López", color: "bg-green-500", alumnos: 25 },
]

export const estudiantesPlantel = [
  { nombre: "Mariapaz Rodríguez", clase: "Matemáticas II", progreso: 92 },
  { nombre: "Lupe Martínez", clase: "Historia Universal", progreso: 85 },
  { nombre: "Ashlie Gómez", clase: "Ciencias Naturales", progreso: 95 },
  { nombre: "Fabiana Ruiz", clase: "Educación Física", progreso: 88 },
]