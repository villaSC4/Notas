import fs from 'fs/promises';
import path from 'path';
import { Evaluacion } from '@/types/rubrica';

// Detect Vercel or read-only serverless environment
const isVercel = Boolean(process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME);
const DATA_DIR = isVercel
  ? path.join('/tmp', 'sistema-rubrica-data')
  : path.join(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'evaluaciones.json');
const BUNDLED_FILE = path.join(process.cwd(), 'data', 'evaluaciones.json');

const SEED_EVALUACIONES: Evaluacion[] = [
  {
    id: 'eval-ucv-001',
    docente: 'Dr. Roberto Carlos Sánchez Flores',
    observador: 'Dra. María Elena Ramos (Coordinadora SUBE)',
    asignatura: 'Metodología de la Investigación Científica',
    carrera: 'Derecho (SUBE a Distancia)',
    fecha: '2026-03-24',
    turno: 'Noche (Síncrono)',
    semestre: '2026-I',
    enlaceSesion: 'https://ucv-edu-pe.zoom.us/j/84920194821',
    temaClase: 'Operacionalización de Variables y Matriz de Consistencia',
    puntajeTotal: 18.66,
    estado: 'Aprobado',
    porcentaje: 93,
    respuestas: {
      '1.a': 'cumple',
      '1.b': 'cumple',
      '1.c': 'cumple',
      '2.1.a': 'cumple',
      '2.1.b': 'cumple',
      '2.1.c': 'cumple',
      '2.2.a': 'cumple',
      '2.2.b': 'cumple',
      '2.2.c': 'en_proceso',
      '2.2.d': 'cumple',
      '2.3.a': 'cumple',
      '2.3.b': 'cumple',
      '2.3.c': 'cumple',
    },
    observaciones: {
      presentacion: 'Cumplimiento impecable del protocolo institucional UCV SUBE. Fondo oficial y audio nítido.',
      inicio: 'Excelente conexión inicial. Planteó un caso real de tesis para despertar el interés de los estudiantes.',
      desarrollo: 'Diapositivas de alto nivel pedagógico. Se recomienda motivar a los estudiantes más tímidos a intervenir por audio.',
      cierre: 'Cierre puntual con resumen gráfico y recordatorio de entregas en Blackboard.',
    },
    retroalimentacionGeneral: {
      fortalezas: 'Dominio riguroso de la metodología de investigación, excelente dicción y estructura clara del contenido.',
      oportunidades: 'Diversificar herramientas interactivas (Mentimeter o Padlet) para involucrar a la totalidad de la sala Zoom.',
      compromisosDocente: 'Aplicar encuestas interactivas cada 30 minutos de sesión para dinamizar la participación grupal.',
    },
    createdAt: '2026-03-24T20:45:00.000Z',
  },
  {
    id: 'eval-ucv-002',
    docente: 'Mg. Carmen Rosa Huamán Vílchez',
    observador: 'Mg. Jorge Luis Valdivia (Especialista Pedagógico)',
    asignatura: 'Contabilidad Gerencial y de Costos',
    carrera: 'Contabilidad (SUBE a Distancia)',
    fecha: '2026-03-20',
    turno: 'Sábado Tarde',
    semestre: '2026-I',
    enlaceSesion: 'https://ucv-edu-pe.zoom.us/j/91283746123',
    temaClase: 'Costeo por Procesos y Punto de Equilibrio Multiproducto',
    puntajeTotal: 13.00,
    estado: 'En Observación',
    porcentaje: 65,
    respuestas: {
      '1.a': 'en_proceso',
      '1.b': 'cumple',
      '1.c': 'cumple',
      '2.1.a': 'cumple',
      '2.1.b': 'en_proceso',
      '2.1.c': 'no_cumple',
      '2.2.a': 'cumple',
      '2.2.b': 'en_proceso',
      '2.2.c': 'no_cumple',
      '2.2.d': 'cumple',
      '2.3.a': 'en_proceso',
      '2.3.b': 'en_proceso',
      '2.3.c': 'cumple',
    },
    observaciones: {
      presentacion: 'No activó el fondo oficial institucional UCV SUBE a Distancia durante el primer bloque.',
      inicio: 'Omitió la formulación de preguntas motivadoras o rescate de saberes previos; ingresó directamente a la teoría.',
      desarrollo: 'Buena resolución numérica en Excel pero la sesión fue excesivamente expositiva, con mínima interacción de alumnos.',
      cierre: 'El tiempo quedó corto y la síntesis se realizó de forma acelerada.',
    },
    retroalimentacionGeneral: {
      fortalezas: 'Solvencia técnica y dominio absoluto en el cálculo del costo unitario y punto de equilibrio.',
      oportunidades: 'Planificar la didáctica del inicio con preguntas detonantes y utilizar salas para grupos reducidos en Zoom.',
      compromisosDocente: 'Configurar el fondo virtual institucional y diseñar al menos dos actividades colaborativas por sesión.',
    },
    createdAt: '2026-03-20T17:30:00.000Z',
  },
];

// In-memory fallback if filesystem is completely read-only or in testing
let memoryStore: Evaluacion[] = [...SEED_EVALUACIONES];

async function ensureStorage(): Promise<void> {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    try {
      await fs.access(DATA_FILE);
    } catch {
      // If DATA_FILE doesn't exist, try copying from bundled data if available
      let initialData = SEED_EVALUACIONES;
      try {
        const bundled = await fs.readFile(BUNDLED_FILE, 'utf-8');
        const parsed = JSON.parse(bundled);
        if (Array.isArray(parsed) && parsed.length > 0) {
          initialData = parsed;
        }
      } catch {
        // Use seed
      }
      await fs.writeFile(DATA_FILE, JSON.stringify(initialData, null, 2), 'utf-8');
    }
  } catch (error) {
    console.warn('Storage directory could not be written, using memory cache:', error);
  }
}

export async function getEvaluaciones(): Promise<Evaluacion[]> {
  await ensureStorage();
  try {
    const raw = await fs.readFile(DATA_FILE, 'utf-8');
    const data = JSON.parse(raw);
    if (!Array.isArray(data)) return memoryStore;
    memoryStore = data;
    return data.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  } catch (err) {
    console.warn('Reading from disk failed, returning in-memory store:', err);
    return memoryStore.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }
}

export async function getEvaluacionById(id: string): Promise<Evaluacion | null> {
  const all = await getEvaluaciones();
  return all.find((item) => item.id === id) || null;
}

export async function saveEvaluacion(evaluacion: Evaluacion): Promise<Evaluacion> {
  await ensureStorage();
  const all = await getEvaluaciones();
  const existingIndex = all.findIndex((item) => item.id === evaluacion.id);

  if (existingIndex >= 0) {
    all[existingIndex] = { ...evaluacion, updatedAt: new Date().toISOString() };
  } else {
    all.unshift(evaluacion);
  }

  memoryStore = all;

  try {
    await fs.writeFile(DATA_FILE, JSON.stringify(all, null, 2), 'utf-8');
  } catch (err) {
    console.warn('Could not write to disk, saved in memory:', err);
  }

  return evaluacion;
}

export async function deleteEvaluacion(id: string): Promise<boolean> {
  await ensureStorage();
  const all = await getEvaluaciones();
  const filtered = all.filter((item) => item.id !== id);
  if (filtered.length === all.length) return false;

  memoryStore = filtered;

  try {
    await fs.writeFile(DATA_FILE, JSON.stringify(filtered, null, 2), 'utf-8');
  } catch (err) {
    console.warn('Could not update disk deletion, updated in memory:', err);
  }

  return true;
}
