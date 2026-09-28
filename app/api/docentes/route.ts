import { NextRequest, NextResponse } from 'next/server';
import { buscarDocentes, DOCENTES_MOCK } from '@/lib/docentes-data';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('q') || '';
    const carrera = searchParams.get('carrera') || '';

    const resultados = buscarDocentes(query, carrera);

    return NextResponse.json({
      success: true,
      data: resultados,
      count: resultados.length,
      total: DOCENTES_MOCK.length,
    });
  } catch (error) {
    console.error('API GET /api/docentes error:', error);
    return NextResponse.json(
      { success: false, error: 'Error al consultar la base de datos de docentes.' },
      { status: 500 }
    );
  }
}
