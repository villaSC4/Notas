export interface Docente {
  id: string;
  codigo: string; // Ej. "DOC-10492" o "UCV-8021"
  apellidos: string;
  nombres: string;
  grado: string; // Ej. "Ing.", "Mg.", "Dr."
  nombreCompleto: string;
  carrera: string; // Ej. "Ingeniería de Sistemas (SUBE a Distancia)"
  facultad: string;
  asignaturas: string[];
  email: string;
  modalidad: string;
}
