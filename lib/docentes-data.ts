import { Docente } from '@/types/docente';

export const DOCENTES_MOCK: Docente[] = [
  // --- INGENIERÍA DE SISTEMAS ---
  {
    id: 'doc-sis-001',
    codigo: 'DOC-2041',
    apellidos: 'Amache Valdivia',
    nombres: 'Carlos Alberto',
    grado: 'Mg.',
    nombreCompleto: 'Mg. Carlos Alberto Amache Valdivia',
    carrera: 'Ingeniería de Sistemas (SUBE a Distancia)',
    facultad: 'Facultad de Ingeniería y Arquitectura',
    asignaturas: [
      'Desarrollo de Aplicaciones Web y Móviles',
      'Arquitectura de Software y Cloud',
      'Base de Datos Avanzadas',
      'Ingeniería de Requerimientos',
    ],
    email: 'camache@ucvvirtual.edu.pe',
    modalidad: 'SUBE a Distancia',
  },
  {
    id: 'doc-sis-002',
    codigo: 'DOC-2042',
    apellidos: 'Quispe Flores',
    nombres: 'Roberto Miguel',
    grado: 'Dr.',
    nombreCompleto: 'Dr. Roberto Miguel Quispe Flores',
    carrera: 'Ingeniería de Sistemas (SUBE a Distancia)',
    facultad: 'Facultad de Ingeniería y Arquitectura',
    asignaturas: [
      'Inteligencia Artificial y Machine Learning',
      'Sistemas Distribuidos y Concurrencia',
      'Seguridad Informática y Criptografía',
      'Taller de Tesis en Sistemas',
    ],
    email: 'rquispef@ucvvirtual.edu.pe',
    modalidad: 'SUBE a Distancia',
  },
  {
    id: 'doc-sis-003',
    codigo: 'DOC-2043',
    apellidos: 'Mendoza Huamán',
    nombres: 'Patricia Roxana',
    grado: 'Mg.',
    nombreCompleto: 'Mg. Patricia Roxana Mendoza Huamán',
    carrera: 'Ingeniería de Sistemas (SUBE a Distancia)',
    facultad: 'Facultad de Ingeniería y Arquitectura',
    asignaturas: [
      'Gestión de Proyectos de Tecnologías de Información',
      'Modelamiento y Gestión de Procesos de Negocio (BPM)',
      'Diseño y Evaluación de Interfaces (UX/UI)',
    ],
    email: 'pmendozah@ucvvirtual.edu.pe',
    modalidad: 'SUBE a Distancia',
  },
  {
    id: 'doc-sis-004',
    codigo: 'DOC-2044',
    apellidos: 'Valdivia Sánchez',
    nombres: 'Jorge Luis',
    grado: 'Ing.',
    nombreCompleto: 'Ing. Jorge Luis Valdivia Sánchez',
    carrera: 'Ingeniería de Sistemas (SUBE a Distancia)',
    facultad: 'Facultad de Ingeniería y Arquitectura',
    asignaturas: [
      'Redes y Comunicaciones de Datos',
      'Cloud Computing y DevOps',
      'Sistemas Operativos y Virtualización',
    ],
    email: 'jvaldivias@ucvvirtual.edu.pe',
    modalidad: 'SUBE a Distancia',
  },
  {
    id: 'doc-sis-005',
    codigo: 'DOC-2045',
    apellidos: 'Zevallos Ramos',
    nombres: 'Fernando David',
    grado: 'Mg.',
    nombreCompleto: 'Mg. Fernando David Zevallos Ramos',
    carrera: 'Ingeniería de Sistemas (SUBE a Distancia)',
    facultad: 'Facultad de Ingeniería y Arquitectura',
    asignaturas: [
      'Big Data & Data Analytics',
      'Minería de Datos y Business Intelligence',
      'Programación Orientada a Objetos',
    ],
    email: 'fzevallos@ucvvirtual.edu.pe',
    modalidad: 'SUBE a Distancia',
  },

  // --- INGENIERÍA INDUSTRIAL ---
  {
    id: 'doc-ind-001',
    codigo: 'DOC-3051',
    apellidos: 'Amache Morales',
    nombres: 'Luis Fernando',
    grado: 'Mg.',
    nombreCompleto: 'Mg. Luis Fernando Amache Morales',
    carrera: 'Ingeniería Industrial (SUBE a Distancia)',
    facultad: 'Facultad de Ingeniería y Arquitectura',
    asignaturas: [
      'Gestión de Operaciones y Logística',
      'Control Estadístico de la Calidad',
      'Optimización de Procesos Industriales',
      'Investigación de Operaciones I',
    ],
    email: 'lamachem@ucvvirtual.edu.pe',
    modalidad: 'SUBE a Distancia',
  },
  {
    id: 'doc-ind-002',
    codigo: 'DOC-3052',
    apellidos: 'Cabrera Rojas',
    nombres: 'Walter Andrés',
    grado: 'Dr.',
    nombreCompleto: 'Dr. Walter Andrés Cabrera Rojas',
    carrera: 'Ingeniería Industrial (SUBE a Distancia)',
    facultad: 'Facultad de Ingeniería y Arquitectura',
    asignaturas: [
      'Seguridad y Salud Ocupacional (SST)',
      'Ergonomía y Productividad del Trabajo',
      'Diseño y Distribución de Plantas Industriales',
      'Gestión de Mantenimiento Industrial',
    ],
    email: 'wcabrerar@ucvvirtual.edu.pe',
    modalidad: 'SUBE a Distancia',
  },
  {
    id: 'doc-ind-003',
    codigo: 'DOC-3053',
    apellidos: 'Flores Tello',
    nombres: 'Silvia Elena',
    grado: 'Mg.',
    nombreCompleto: 'Mg. Silvia Elena Flores Tello',
    carrera: 'Ingeniería Industrial (SUBE a Distancia)',
    facultad: 'Facultad de Ingeniería y Arquitectura',
    asignaturas: [
      'Supply Chain Management y Compras Estratégicas',
      'Planeamiento y Control de la Producción (PCP)',
      'Simulación de Sistemas Industriales',
    ],
    email: 'sflorest@ucvvirtual.edu.pe',
    modalidad: 'SUBE a Distancia',
  },
  {
    id: 'doc-ind-004',
    codigo: 'DOC-3054',
    apellidos: 'Morales Quispe',
    nombres: 'César Augusto',
    grado: 'Ing.',
    nombreCompleto: 'Ing. César Augusto Morales Quispe',
    carrera: 'Ingeniería Industrial (SUBE a Distancia)',
    facultad: 'Facultad de Ingeniería y Arquitectura',
    asignaturas: [
      'Costos y Presupuestos Industriales',
      'Ingeniería de Métodos y Tiempos',
      'Gestión Ambiental y Ecoeficiencia',
    ],
    email: 'cmoralesq@ucvvirtual.edu.pe',
    modalidad: 'SUBE a Distancia',
  },
  {
    id: 'doc-ind-005',
    codigo: 'DOC-3055',
    apellidos: 'Saldaña Paredes',
    nombres: 'Ana María',
    grado: 'Mg.',
    nombreCompleto: 'Mg. Ana María Saldaña Paredes',
    carrera: 'Ingeniería Industrial (SUBE a Distancia)',
    facultad: 'Facultad de Ingeniería y Arquitectura',
    asignaturas: [
      'Lean Manufacturing y Metodología 5S',
      'Sistemas Integrados de Gestión (ISO 9001, 14001, 45001)',
      'Formulación y Evaluación de Proyectos Industriales',
    ],
    email: 'asaldanap@ucvvirtual.edu.pe',
    modalidad: 'SUBE a Distancia',
  },

  // --- DERECHO ---
  {
    id: 'doc-der-001',
    codigo: 'DOC-1011',
    apellidos: 'Sánchez Flores',
    nombres: 'Roberto Carlos',
    grado: 'Dr.',
    nombreCompleto: 'Dr. Roberto Carlos Sánchez Flores',
    carrera: 'Derecho (SUBE a Distancia)',
    facultad: 'Facultad de Derecho y Humanidades',
    asignaturas: [
      'Metodología de la Investigación Científica',
      'Derecho Constitucional y Tutelar',
      'Derecho Procesal Penal II',
    ],
    email: 'rsanchezfl@ucvvirtual.edu.pe',
    modalidad: 'SUBE a Distancia',
  },
  {
    id: 'doc-der-002',
    codigo: 'DOC-1012',
    apellidos: 'Morales Quispe',
    nombres: 'Elena Patricia',
    grado: 'Mg.',
    nombreCompleto: 'Mg. Elena Patricia Morales Quispe',
    carrera: 'Derecho (SUBE a Distancia)',
    facultad: 'Facultad de Derecho y Humanidades',
    asignaturas: [
      'Derecho Procesal Constitucional',
      'Derecho de Familia y Sucesiones',
      'Acto Jurídico y Derechos Reales',
    ],
    email: 'emoralesqu@ucvvirtual.edu.pe',
    modalidad: 'SUBE a Distancia',
  },
  {
    id: 'doc-der-003',
    codigo: 'DOC-1013',
    apellidos: 'Huamán Ramos',
    nombres: 'Juan Carlos',
    grado: 'Dr.',
    nombreCompleto: 'Dr. Juan Carlos Huamán Ramos',
    carrera: 'Derecho (SUBE a Distancia)',
    facultad: 'Facultad de Derecho y Humanidades',
    asignaturas: [
      'Litigación Oral y Argumentación Jurídica',
      'Derecho Penal Económico y de la Empresa',
      'Criminología y Política Criminal',
    ],
    email: 'jhuamanr@ucvvirtual.edu.pe',
    modalidad: 'SUBE a Distancia',
  },

  // --- ADMINISTRACIÓN DE EMPRESAS ---
  {
    id: 'doc-adm-001',
    codigo: 'DOC-4061',
    apellidos: 'Huamán Vílchez',
    nombres: 'Carmen Rosa',
    grado: 'Mg.',
    nombreCompleto: 'Mg. Carmen Rosa Huamán Vílchez',
    carrera: 'Administración de Empresas (SUBE a Distancia)',
    facultad: 'Facultad de Ciencias Empresariales',
    asignaturas: [
      'Contabilidad Gerencial y de Costos',
      'Dirección Estratégica Empresarial',
      'Gestión del Talento Humano',
    ],
    email: 'chuamanv@ucvvirtual.edu.pe',
    modalidad: 'SUBE a Distancia',
  },
  {
    id: 'doc-adm-002',
    codigo: 'DOC-4062',
    apellidos: 'Ramos Alarcón',
    nombres: 'Diego Alonso',
    grado: 'Dr.',
    nombreCompleto: 'Dr. Diego Alonso Ramos Alarcón',
    carrera: 'Administración de Empresas (SUBE a Distancia)',
    facultad: 'Facultad de Ciencias Empresariales',
    asignaturas: [
      'Finanzas Corporativas y Mercado de Capitales',
      'Marketing Digital y Gestión Comercial',
      'Emprendimiento e Innovación de Negocios',
    ],
    email: 'dramosa@ucvvirtual.edu.pe',
    modalidad: 'SUBE a Distancia',
  },

  // --- CONTABILIDAD Y FINANZAS ---
  {
    id: 'doc-con-001',
    codigo: 'DOC-5071',
    apellidos: 'Paredes Díaz',
    nombres: 'Milagros Soledad',
    grado: 'Mg.',
    nombreCompleto: 'Mg. Milagros Soledad Paredes Díaz',
    carrera: 'Contabilidad y Finanzas (SUBE a Distancia)',
    facultad: 'Facultad de Ciencias Empresariales',
    asignaturas: [
      'Auditoría Financiera y Gubernamental',
      'Normas Internacionales de Información Financiera (NIIF)',
      'Tributación Empresarial y Fiscalización',
    ],
    email: 'mparedesd@ucvvirtual.edu.pe',
    modalidad: 'SUBE a Distancia',
  },

  // --- PSICOLOGÍA ---
  {
    id: 'doc-psi-001',
    codigo: 'DOC-6081',
    apellidos: 'Vargas Mendoza',
    nombres: 'Claudia Lucía',
    grado: 'Dra.',
    nombreCompleto: 'Dra. Claudia Lucía Vargas Mendoza',
    carrera: 'Psicología (SUBE a Distancia)',
    facultad: 'Facultad de Ciencias de la Salud',
    asignaturas: [
      'Psicología Organizacional y del Trabajo',
      'Técnicas de Entrevista y Observación Psicológica',
      'Psicología del Aprendizaje y Neurociencias',
    ],
    email: 'cvargasm@ucvvirtual.edu.pe',
    modalidad: 'SUBE a Distancia',
  },
];

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
 * Busca docentes por apellidos, nombres o código institucional.
 */
export function buscarDocentes(query: string, carreraFiltro?: string): Docente[] {
  const q = normalizeString(query);
  if (!q && !carreraFiltro) return DOCENTES_MOCK;

  return DOCENTES_MOCK.filter((doc) => {
    const matchQuery =
      !q ||
      normalizeString(doc.apellidos).includes(q) ||
      normalizeString(doc.nombres).includes(q) ||
      normalizeString(doc.nombreCompleto).includes(q) ||
      normalizeString(doc.codigo).includes(q);

    const matchCarrera =
      !carreraFiltro ||
      normalizeString(doc.carrera).includes(normalizeString(carreraFiltro));

    return matchQuery && matchCarrera;
  });
}
