import { DimensionDefinition, CriterioNivel, ResumenPuntaje } from '@/types/rubrica';

export const RUBRICA_DIMENSIONES: DimensionDefinition[] = [
  {
    id: 'presentacion',
    codigo: '1',
    titulo: 'Presentación Docente',
    puntajeMaximo: 4.00,
    descripcion: 'Aspectos formales de comunicación, ambiente virtual, imagen corporativa y dominio tecnológico en Zoom.',
    criterios: [
      {
        id: '1.a',
        codigo: '1.a',
        nombre: 'Imagen y Entorno',
        descripcion: 'Vestimenta adecuada, encuadre de cámara centrado, iluminación correcta y uso del fondo oficial del programa SUBE a Distancia.',
        ponderacion: 1.33,
      },
      {
        id: '1.b',
        codigo: '1.b',
        nombre: 'Audio y Dicción',
        descripcion: 'Calidad de audio clara (sin eco ni ruido de fondo), tono de voz adecuado, modulación y dinamismo al hablar.',
        ponderacion: 1.33,
      },
      {
        id: '1.c',
        codigo: '1.c',
        nombre: 'Manejo de Zoom',
        descripcion: 'Uso fluido de herramientas básicas (compartir pantalla, control de micrófonos, cámara encendida durante toda la sesión).',
        ponderacion: 1.34,
      },
    ],
  },
  {
    id: 'estructura_didactica',
    codigo: '2',
    titulo: 'Estructura Didáctica de la Sesión',
    puntajeMaximo: 16.00,
    descripcion: 'Secuencia pedagógica de la sesión síncrona: momentos de Inicio, Desarrollo y Cierre del aprendizaje.',
    subdimensiones: [
      {
        id: 'inicio',
        codigo: '2.1',
        titulo: '2.1 Momento de Inicio',
        puntajeMaximo: 4.00,
        criterios: [
          {
            id: '2.1.a',
            codigo: '2.1.a',
            nombre: 'Saludo y Presentación del Tema',
            descripcion: 'Saludo cordial a los estudiantes y presentación formal del tema a desarrollar en la sesión síncrona.',
            ponderacion: 1.33,
          },
          {
            id: '2.1.b',
            codigo: '2.1.b',
            nombre: 'Enunciación del Objetivo',
            descripcion: 'Enunciación clara del objetivo o resultado de aprendizaje esperado de la sesión.',
            ponderacion: 1.33,
          },
          {
            id: '2.1.c',
            codigo: '2.1.c',
            nombre: 'Motivación y Saberes Previos',
            descripcion: 'Estrategia pedagógica de motivación o rescate de saberes previos (pregunta clave, caso rápido, encuesta o dilema).',
            ponderacion: 1.34,
          },
        ],
      },
      {
        id: 'desarrollo',
        codigo: '2.2',
        titulo: '2.2 Momento de Desarrollo',
        puntajeMaximo: 8.00,
        criterios: [
          {
            id: '2.2.a',
            codigo: '2.2.a',
            nombre: 'Claridad y Estructura del Contenido',
            descripcion: 'Explicación clara, sintetizada y estructurada del contenido disciplinar según el silabo.',
            ponderacion: 2.00,
          },
          {
            id: '2.2.b',
            codigo: '2.2.b',
            nombre: 'Recursos Visuales y Tecnológicos',
            descripcion: 'Uso de recursos visuales de apoyo (diapositivas legibles, diagramas o pizarrón virtual Mentimeter, Padlet, etc.).',
            ponderacion: 2.00,
          },
          {
            id: '2.2.c',
            codigo: '2.2.c',
            nombre: 'Participación Activa',
            descripcion: 'Incentivación efectiva y constante de la participación activa de los estudiantes durante la clase.',
            ponderacion: 2.00,
          },
          {
            id: '2.2.d',
            codigo: '2.2.d',
            nombre: 'Dominio Temático y Rigor',
            descripcion: 'Dominio sólido del tema, rigor conceptual, resolución de dudas y contextualización profesional.',
            ponderacion: 2.00,
          },
        ],
      },
      {
        id: 'cierre',
        codigo: '2.3',
        titulo: '2.3 Momento de Cierre',
        puntajeMaximo: 4.00,
        criterios: [
          {
            id: '2.3.a',
            codigo: '2.3.a',
            nombre: 'Síntesis y Resumen',
            descripcion: 'Síntesis o resumen claro de las ideas y conclusiones clave explicadas durante la sesión.',
            ponderacion: 1.33,
          },
          {
            id: '2.3.b',
            codigo: '2.3.b',
            nombre: 'Verificación de la Comprensión',
            descripcion: 'Verificación de la comprensión de los estudiantes (preguntas de cierre, retroalimentación o espacio para dudas).',
            ponderacion: 1.33,
          },
          {
            id: '2.3.c',
            codigo: '2.3.c',
            nombre: 'Conclusión y Despedida',
            descripcion: 'Conclusión formal de la sesión, indicaciones sobre actividades en plataforma Trilce/Blackboard y despedida.',
            ponderacion: 1.34,
          },
        ],
      },
    ],
  },
];

// Flat list of all 13 criteria for quick lookup
export const TODOS_LOS_CRITERIOS = RUBRICA_DIMENSIONES.flatMap((dim) => {
  if (dim.criterios) return dim.criterios;
  if (dim.subdimensiones) {
    return dim.subdimensiones.flatMap((sub) => sub.criterios);
  }
  return [];
});

export const TOTAL_CRITERIOS_COUNT = TODOS_LOS_CRITERIOS.length; // 13

export function calcularPuntajeCriterio(ponderacion: number, nivel: CriterioNivel | null): number {
  if (!nivel || nivel === 'no_cumple') return 0;
  if (nivel === 'en_proceso') return Math.round(ponderacion * 0.5 * 100) / 100;
  if (nivel === 'cumple') return ponderacion;
  return 0;
}

export function calcularResumen(respuestas: Record<string, CriterioNivel | null>): ResumenPuntaje {
  let puntajeTotal = 0;
  let criteriosEvaluados = 0;
  const porSubdimension: Record<string, { puntaje: number; maximo: number }> = {
    presentacion: { puntaje: 0, maximo: 4.00 },
    inicio: { puntaje: 0, maximo: 4.00 },
    desarrollo: { puntaje: 0, maximo: 8.00 },
    cierre: { puntaje: 0, maximo: 4.00 },
  };

  TODOS_LOS_CRITERIOS.forEach((crit) => {
    const nivel = respuestas[crit.id] || null;
    if (nivel !== null && nivel !== undefined) {
      criteriosEvaluados += 1;
    }
    const pts = calcularPuntajeCriterio(crit.ponderacion, nivel);
    puntajeTotal += pts;

    // Categorizar por subdimension
    if (crit.id.startsWith('1.')) {
      porSubdimension.presentacion.puntaje += pts;
    } else if (crit.id.startsWith('2.1.')) {
      porSubdimension.inicio.puntaje += pts;
    } else if (crit.id.startsWith('2.2.')) {
      porSubdimension.desarrollo.puntaje += pts;
    } else if (crit.id.startsWith('2.3.')) {
      porSubdimension.cierre.puntaje += pts;
    }
  });

  // Redondear puntajes a 2 decimales para evitar problemas de coma flotante
  puntajeTotal = Math.min(20.00, Math.round(puntajeTotal * 100) / 100);
  Object.keys(porSubdimension).forEach((k) => {
    porSubdimension[k].puntaje = Math.round(porSubdimension[k].puntaje * 100) / 100;
  });

  const porcentaje = Math.round((puntajeTotal / 20.00) * 100);
  const estado: 'Aprobado' | 'En Observación' = puntajeTotal >= 14.00 ? 'Aprobado' : 'En Observación';

  return {
    puntajeTotal,
    puntajeMaximo: 20.00,
    porcentaje,
    estado,
    criteriosEvaluados,
    totalCriterios: TOTAL_CRITERIOS_COUNT,
    porSubdimension,
  };
}

export const SUGERENCIAS_FEEDBACK = {
  presentacion: [
    'Excelente presentación con fondo institucional oficial de SUBE.',
    'Se sugiere ajustar el encuadre de la cámara para centrar el rostro.',
    'Audio impecable y sin interferencias acústicas.',
    'Revisar la iluminación frontal para mejorar la nitidez en cámara.',
    'Manejo óptimo de controles en Zoom.',
  ],
  inicio: [
    'Presentación puntual del objetivo de aprendizaje.',
    'Muy buena dinámica inicial para rescatar conocimientos previos.',
    'Se recomienda dedicar al menos 3 minutos a la motivación del tema.',
    'Excelente conexión entre la temática del curso y la realidad profesional.',
  ],
  desarrollo: [
    'Diapositivas didácticas con diseño limpio y buena legibilidad.',
    'Gran dinamismo y fomento constante de la participación por chat y micrófono.',
    'Se sugiere integrar pizarras colaborativas como Padlet o Mentimeter.',
    'Sólido dominio conceptual y claridad explicativa.',
    'Adecuada gestión del tiempo en los bloques temáticos.',
  ],
  cierre: [
    'Conclusión clara que resume los puntos más importantes de la clase.',
    'Espacio adecuado para resolver dudas y consultas finales.',
    'Recordar indicar las actividades asincrónicas en Blackboard con fechas límite.',
    'Despedida cordial y motivadora.',
  ],
};
