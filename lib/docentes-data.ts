import { Docente } from '@/types/docente';

/**
 * =============================================================================
 * BASE DE DATOS DE DOCENTES REALES CON CARGA LECTIVA — UCV VIRTUAL (FIA - SUBE)
 * Sincronizado directamente desde la programación académica oficial 2026-II
 * =============================================================================
 */
export const DOCENTES_REALES: Docente[] = [
  // --- INGENIERÍA DE SISTEMAS ---
  {
    id: 'doc-sis-001',
    codigo: 'DOC-1001',
    apellidos: 'AMACHE SANCHEZ',
    nombres: 'MILTON FREDDY',
    grado: 'Dr.',
    nombreCompleto: 'Dr. Milton Freddy Amache Sánchez',
    carrera: 'Ingeniería de Sistemas (SUBE a Distancia)',
    facultad: 'Facultad de Ingeniería y Arquitectura',
    asignaturas: [
      'ALGORITMOS Y PROGRAMACIÓN',
      'EXPRESIÓN GRÁFICA',
    ],
    email: 'amachem@ucvvirtual.edu.pe',
    modalidad: 'SUBE a Distancia',
  },
  {
    id: 'doc-sis-002',
    codigo: 'DOC-1002',
    apellidos: 'AGREDA PALOMINO',
    nombres: 'RICARDO NOE',
    grado: 'Mg.',
    nombreCompleto: 'Mg. Ricardo Noe Agreda Palomino',
    carrera: 'Ingeniería de Sistemas (SUBE a Distancia)',
    facultad: 'Facultad de Ingeniería y Arquitectura',
    asignaturas: [
      'FÍSICA GENERAL',
    ],
    email: 'agredar@ucvvirtual.edu.pe',
    modalidad: 'SUBE a Distancia',
  },
  {
    id: 'doc-sis-003',
    codigo: 'DOC-1003',
    apellidos: 'ANTEZANA ELORRIETA',
    nombres: 'ANGEL ESTUARD',
    grado: 'Dr.',
    nombreCompleto: 'Dr. Angel Estuard Antezana Elorrieta',
    carrera: 'Ingeniería de Sistemas (SUBE a Distancia)',
    facultad: 'Facultad de Ingeniería y Arquitectura',
    asignaturas: [
      'MATEMÁTICA PARA LA INGENIERÍA',
    ],
    email: 'antezanaa@ucvvirtual.edu.pe',
    modalidad: 'SUBE a Distancia',
  },
  {
    id: 'doc-sis-004',
    codigo: 'DOC-1004',
    apellidos: 'GUTIERREZ MENDOZA',
    nombres: 'ALICIA YANETT',
    grado: 'Mg.',
    nombreCompleto: 'Mg. Alicia Yanett Gutierrez Mendoza',
    carrera: 'Ingeniería de Sistemas (SUBE a Distancia)',
    facultad: 'Facultad de Ingeniería y Arquitectura',
    asignaturas: [
      'CREATIVIDAD E INNOVACIÓN',
    ],
    email: 'gutierreza@ucvvirtual.edu.pe',
    modalidad: 'SUBE a Distancia',
  },
  {
    id: 'doc-sis-005',
    codigo: 'DOC-1005',
    apellidos: 'MURO NUÑEZ',
    nombres: 'EFRAIN ALEJANDRO',
    grado: 'Mg.',
    nombreCompleto: 'Mg. Efrain Alejandro Muro Nuñez',
    carrera: 'Ingeniería de Sistemas (SUBE a Distancia)',
    facultad: 'Facultad de Ingeniería y Arquitectura',
    asignaturas: [
      'EXPRESIÓN GRÁFICA',
    ],
    email: 'muroe@ucvvirtual.edu.pe',
    modalidad: 'SUBE a Distancia',
  },
  {
    id: 'doc-sis-006',
    codigo: 'DOC-1006',
    apellidos: 'OLMOS SALDIVAR',
    nombres: 'DAVID',
    grado: 'Mg.',
    nombreCompleto: 'Mg. David Olmos Saldivar',
    carrera: 'Ingeniería de Sistemas (SUBE a Distancia)',
    facultad: 'Facultad de Ingeniería y Arquitectura',
    asignaturas: [
      'FUNDAMENTOS DE MODELADO Y ANIMACIÓN',
      'ESTUDIO DEL TRABAJO',
    ],
    email: 'olmosd@ucvvirtual.edu.pe',
    modalidad: 'SUBE a Distancia',
  },

  // --- INGENIERÍA INDUSTRIAL ---
  {
    id: 'doc-ind-001',
    codigo: 'DOC-2001',
    apellidos: 'ARCE VILLANUEVA',
    nombres: 'CHRISTIAN ANTHONY',
    grado: 'Mg.',
    nombreCompleto: 'Mg. Christian Anthony Arce Villanueva',
    carrera: 'Ingeniería Industrial (SUBE a Distancia)',
    facultad: 'Facultad de Ingeniería y Arquitectura',
    asignaturas: [
      'EXPRESIÓN GRÁFICA',
      'INVESTIGACIÓN DE OPERACIONES',
    ],
    email: 'arcec@ucvvirtual.edu.pe',
    modalidad: 'SUBE a Distancia',
  },
  {
    id: 'doc-ind-002',
    codigo: 'DOC-2002',
    apellidos: 'AYALA RIVERA',
    nombres: 'JUAN CARLOS',
    grado: 'Mg.',
    nombreCompleto: 'Mg. Juan Carlos Ayala Rivera',
    carrera: 'Ingeniería Industrial (SUBE a Distancia)',
    facultad: 'Facultad de Ingeniería y Arquitectura',
    asignaturas: [
      'QUÍMICA GENERAL',
    ],
    email: 'ayalaj@ucvvirtual.edu.pe',
    modalidad: 'SUBE a Distancia',
  },
  {
    id: 'doc-ind-003',
    codigo: 'DOC-2003',
    apellidos: 'BRINGAS QUESQUEN',
    nombres: 'PAULO CESAR',
    grado: 'Mg.',
    nombreCompleto: 'Mg. Paulo Cesar Bringas Quesquen',
    carrera: 'Ingeniería Industrial (SUBE a Distancia)',
    facultad: 'Facultad de Ingeniería y Arquitectura',
    asignaturas: [
      'CÁLCULO INTEGRAL Y ECUACIONES DIFERENCIALES',
      'FÍSICA GENERAL',
    ],
    email: 'bringasp@ucvvirtual.edu.pe',
    modalidad: 'SUBE a Distancia',
  },
  {
    id: 'doc-ind-004',
    codigo: 'DOC-2004',
    apellidos: 'CASTILLO CHALCO',
    nombres: 'ISAAC DUHAMEL',
    grado: 'Mg.',
    nombreCompleto: 'Mg. Isaac Duhamel Castillo Chalco',
    carrera: 'Ingeniería Industrial (SUBE a Distancia)',
    facultad: 'Facultad de Ingeniería y Arquitectura',
    asignaturas: [
      'CREATIVIDAD E INNOVACIÓN',
    ],
    email: 'castilloi@ucvvirtual.edu.pe',
    modalidad: 'SUBE a Distancia',
  },
  {
    id: 'doc-ind-005',
    codigo: 'DOC-2005',
    apellidos: 'HERMOZA MEDINA',
    nombres: 'RENZO ALEXANDER',
    grado: 'Dr.',
    nombreCompleto: 'Dr. Renzo Alexander Hermoza Medina',
    carrera: 'Ingeniería Industrial (SUBE a Distancia)',
    facultad: 'Facultad de Ingeniería y Arquitectura',
    asignaturas: [
      'ERGONOMÍA, SEGURIDAD Y SALUD OCUPACIONAL',
    ],
    email: 'hermozar@ucvvirtual.edu.pe',
    modalidad: 'SUBE a Distancia',
  },
  {
    id: 'doc-ind-006',
    codigo: 'DOC-2006',
    apellidos: 'LEEN CUEVA',
    nombres: 'CHRISTIAN NICOLAS',
    grado: 'Dr.',
    nombreCompleto: 'Dr. Christian Nicolas Leen Cueva',
    carrera: 'Ingeniería Industrial (SUBE a Distancia)',
    facultad: 'Facultad de Ingeniería y Arquitectura',
    asignaturas: [
      'CÁLCULO INTEGRAL Y ECUACIONES DIFERENCIALES',
    ],
    email: 'leenc@ucvvirtual.edu.pe',
    modalidad: 'SUBE a Distancia',
  },
  {
    id: 'doc-ind-007',
    codigo: 'DOC-2007',
    apellidos: 'LEWIS DIAZ',
    nombres: 'ARTURO FEDERICO',
    grado: 'Mg.',
    nombreCompleto: 'Mg. Arturo Federico Lewis Diaz',
    carrera: 'Ingeniería Industrial (SUBE a Distancia)',
    facultad: 'Facultad de Ingeniería y Arquitectura',
    asignaturas: [
      'MATEMÁTICA PARA LA INGENIERÍA',
    ],
    email: 'lewisa@ucvvirtual.edu.pe',
    modalidad: 'SUBE a Distancia',
  },
  {
    id: 'doc-ind-008',
    codigo: 'DOC-2008',
    apellidos: 'MARIN LOZANO',
    nombres: 'RICHAR ALEXANDER',
    grado: 'Mg.',
    nombreCompleto: 'Mg. Richar Alexander Marin Lozano',
    carrera: 'Ingeniería Industrial (SUBE a Distancia)',
    facultad: 'Facultad de Ingeniería y Arquitectura',
    asignaturas: [
      'CONTABILIDAD GERENCIAL Y COSTOS',
    ],
    email: 'marinr@ucvvirtual.edu.pe',
    modalidad: 'SUBE a Distancia',
  },
  {
    id: 'doc-ind-009',
    codigo: 'DOC-2009',
    apellidos: 'MARTINEZ JIMENEZ',
    nombres: 'SANDOR LENIN',
    grado: 'Dr.',
    nombreCompleto: 'Dr. Sandor Lenin Martinez Jimenez',
    carrera: 'Ingeniería Industrial (SUBE a Distancia)',
    facultad: 'Facultad de Ingeniería y Arquitectura',
    asignaturas: [
      'CREATIVIDAD E INNOVACIÓN',
    ],
    email: 'martinezs@ucvvirtual.edu.pe',
    modalidad: 'SUBE a Distancia',
  },
  {
    id: 'doc-ind-010',
    codigo: 'DOC-2010',
    apellidos: 'RIVERA RAMIREZ',
    nombres: 'YDANIA VANESSA',
    grado: 'Mg.',
    nombreCompleto: 'Mg. Ydania Vanessa Rivera Ramirez',
    carrera: 'Ingeniería Industrial (SUBE a Distancia)',
    facultad: 'Facultad de Ingeniería y Arquitectura',
    asignaturas: [
      'SIMULACIÓN E INTELIGENCIA DE DATOS',
      'TECNOLOGÍA Y SISTEMAS DE PRODUCCIÓN',
    ],
    email: 'riveray@ucvvirtual.edu.pe',
    modalidad: 'SUBE a Distancia',
  },
  {
    id: 'doc-ind-011',
    codigo: 'DOC-2011',
    apellidos: 'ROJAS HURTADO',
    nombres: 'JENNIFER IRAIDA',
    grado: 'Mg.',
    nombreCompleto: 'Mg. Jennifer Iraida Rojas Hurtado',
    carrera: 'Ingeniería Industrial (SUBE a Distancia)',
    facultad: 'Facultad de Ingeniería y Arquitectura',
    asignaturas: [
      'ECONOMÍA Y FINANZAS',
    ],
    email: 'rojasj@ucvvirtual.edu.pe',
    modalidad: 'SUBE a Distancia',
  },
  {
    id: 'doc-ind-012',
    codigo: 'DOC-2012',
    apellidos: 'VIGO ALVA',
    nombres: 'KATTY VANESA',
    grado: 'Mg.',
    nombreCompleto: 'Mg. Katty Vanesa Vigo Alva',
    carrera: 'Ingeniería Industrial (SUBE a Distancia)',
    facultad: 'Facultad de Ingeniería y Arquitectura',
    asignaturas: [
      'ACCESIBILIDAD Y DISEÑO UNIVERSAL',
      'INVESTIGACIÓN DE OPERACIONES',
    ],
    email: 'vigok@ucvvirtual.edu.pe',
    modalidad: 'SUBE a Distancia',
  },
];

// Alias para compatibilidad hacia atrás
export const DOCENTES_MOCK: Docente[] = DOCENTES_REALES;

/**
 * Normaliza cadenas de texto para búsqueda flexible sin tildes ni mayúsculas.
 */
function normalizeString(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

/**
 * Busca docentes por apellidos, nombres, código o asignatura.
 */
export function buscarDocentes(query: string, carreraFiltro?: string): Docente[] {
  const q = normalizeString(query);
  if (!q && (!carreraFiltro || carreraFiltro === 'todas')) return DOCENTES_REALES;

  return DOCENTES_REALES.filter((doc) => {
    const matchQuery =
      !q ||
      normalizeString(doc.apellidos).includes(q) ||
      normalizeString(doc.nombres).includes(q) ||
      normalizeString(doc.nombreCompleto).includes(q) ||
      normalizeString(doc.codigo).includes(q) ||
      doc.asignaturas.some((asig) => normalizeString(asig).includes(q));

    const matchCarrera =
      !carreraFiltro ||
      carreraFiltro === 'todas' ||
      normalizeString(doc.carrera).includes(normalizeString(carreraFiltro));

    return matchQuery && matchCarrera;
  });
}

/**
 * Obtiene un docente por su ID único.
 */
export function obtenerDocentePorId(id: string): Docente | undefined {
  return DOCENTES_REALES.find((d) => d.id === id);
}

/**
 * Obtiene un docente por su código institucional.
 */
export function obtenerDocentePorCodigo(codigo: string): Docente | undefined {
  return DOCENTES_REALES.find((d) => d.codigo === codigo);
}
