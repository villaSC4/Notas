import { NextRequest, NextResponse } from 'next/server';
import { getEvaluacionById, deleteEvaluacion } from '@/lib/storage';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const item = await getEvaluacionById(id);
    if (!item) {
      return NextResponse.json(
        { success: false, error: 'Evaluación no encontrada.' },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: item });
  } catch (error) {
    console.error('API GET /api/evaluaciones/[id] error:', error);
    return NextResponse.json(
      { success: false, error: 'Error al buscar la evaluación.' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const deleted = await deleteEvaluacion(id);
    if (!deleted) {
      return NextResponse.json(
        { success: false, error: 'No se encontró la evaluación a eliminar.' },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, message: 'Evaluación eliminada correctamente.' });
  } catch (error) {
    console.error('API DELETE /api/evaluaciones/[id] error:', error);
    return NextResponse.json(
      { success: false, error: 'Error al eliminar la evaluación.' },
      { status: 500 }
    );
  }
}
