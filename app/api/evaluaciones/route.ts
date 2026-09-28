import { NextRequest, NextResponse } from 'next/server';
import { getEvaluaciones, saveEvaluacion } from '@/lib/storage';
import { calcularResumen } from '@/lib/rubrica-data';
import { Evaluacion } from '@/types/rubrica';

export async function GET() {
  try {
    const list = await getEvaluaciones();
    return NextResponse.json({ success: true, data: list, count: list.length });
  } catch (error) {
    console.error('API GET /api/evaluaciones error:', error);
    return NextResponse.json(
      { success: false, error: 'No se pudo obtener el historial de evaluaciones.' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      id,
      docente,
      observador,
      asignatura,
      carrera,
      fecha,
      turno,
      semestre,
      enlaceSesion,
      temaClase,
      respuestas = {},
      observaciones = {},
      retroalimentacionGeneral = { fortalezas: '', oportunidades: '', compromisosDocente: '' },
    } = body;

    if (!docente?.trim()) {
      return NextResponse.json(
        { success: false, error: 'El nombre del docente es obligatorio.' },
        { status: 400 }
      );
    }
    if (!observador?.trim()) {
      return NextResponse.json(
        { success: false, error: 'El nombre del evaluador/jefatura es obligatorio.' },
        { status: 400 }
      );
    }
    if (!asignatura?.trim()) {
      return NextResponse.json(
        { success: false, error: 'El nombre de la asignatura es obligatorio.' },
        { status: 400 }
      );
    }

    // Calcular puntaje garantizado en backend para evitar manipulaciones
    const resumen = calcularResumen(respuestas);

    const nuevaEvaluacion: Evaluacion = {
      id: id || `eval-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      docente: docente.trim(),
      observador: observador.trim(),
      asignatura: asignatura.trim(),
      carrera: carrera?.trim() || 'General - SUBE',
      fecha: fecha || new Date().toISOString().split('T')[0],
      turno: turno || 'Virtual Síncrono',
      semestre: semestre || '2026-I',
      enlaceSesion: enlaceSesion?.trim() || '',
      temaClase: temaClase?.trim() || '',
      puntajeTotal: resumen.puntajeTotal,
      estado: resumen.estado,
      porcentaje: resumen.porcentaje,
      respuestas,
      observaciones,
      retroalimentacionGeneral,
      createdAt: new Date().toISOString(),
    };

    const saved = await saveEvaluacion(nuevaEvaluacion);

    return NextResponse.json(
      { success: true, message: 'Evaluación registrada exitosamente.', data: saved },
      { status: 201 }
    );
  } catch (error) {
    console.error('API POST /api/evaluaciones error:', error);
    return NextResponse.json(
      { success: false, error: 'Ocurrió un error al procesar y guardar la evaluación.' },
      { status: 500 }
    );
  }
}
