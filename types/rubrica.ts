export type CriterioNivel = 'no_cumple' | 'en_proceso' | 'cumple';

export interface CriterioDefinition {
  id: string;
  codigo: string;
  nombre: string;
  descripcion: string;
  ponderacion: number;
}

export interface SubdimensionDefinition {
  id: string;
  codigo: string;
  titulo: string;
  puntajeMaximo: number;
  criterios: CriterioDefinition[];
}

export interface DimensionDefinition {
  id: string;
  codigo: string;
  titulo: string;
  puntajeMaximo: number;
  descripcion: string;
  subdimensiones?: SubdimensionDefinition[];
  criterios?: CriterioDefinition[];
}

export interface EvaluacionMetadata {
  docente: string;
  observador: string;
  asignatura: string;
  carrera: string;
  fecha: string;
  turno: string;
  semestre: string;
  enlaceSesion?: string;
  temaClase?: string;
}

export interface RetroalimentacionGeneral {
  fortalezas: string;
  oportunidades: string;
  compromisosDocente: string;
}

export interface Evaluacion {
  id: string;
  docente: string;
  observador: string;
  asignatura: string;
  carrera?: string;
  fecha: string;
  turno?: string;
  semestre?: string;
  enlaceSesion?: string;
  temaClase?: string;
  puntajeTotal: number;
  estado: 'Aprobado' | 'En Observación';
  porcentaje: number;
  respuestas: Record<string, CriterioNivel | null>;
  observaciones: Record<string, string>; // por sección: presentacion, inicio, desarrollo, cierre
  retroalimentacionGeneral?: RetroalimentacionGeneral;
  createdAt: string;
  updatedAt?: string;
}

export interface ResumenPuntaje {
  puntajeTotal: number;
  puntajeMaximo: number;
  porcentaje: number;
  estado: 'Aprobado' | 'En Observación';
  criteriosEvaluados: number;
  totalCriterios: number;
  porSubdimension: Record<string, { puntaje: number; maximo: number }>;
}
