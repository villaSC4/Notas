'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  EvaluacionMetadata,
  CriterioNivel,
  RetroalimentacionGeneral,
  Evaluacion,
} from '@/types/rubrica';
import {
  RUBRICA_DIMENSIONES,
  calcularResumen,
} from '@/lib/rubrica-data';
import { Navbar } from '@/components/Navbar';
import { MetadataForm } from '@/components/MetadataForm';
import { SectionCard } from '@/components/SectionCard';
import { GeneralFeedbackSection } from '@/components/GeneralFeedbackSection';
import { FloatingScoreBar } from '@/components/FloatingScoreBar';
import { HistoryModal } from '@/components/HistoryModal';
import { PrintReportView } from '@/components/PrintReportView';
import { ToastContainer, ToastMessage } from '@/components/Toast';
import {
  Video,
  Compass,
  Layers,
  Flag,
  FileCheck2,
  Info,
} from 'lucide-react';

const INITIAL_METADATA: EvaluacionMetadata = {
  docente: '',
  observador: '',
  asignatura: '',
  carrera: 'Derecho (SUBE a Distancia)',
  fecha: new Date().toISOString().split('T')[0],
  turno: 'Virtual Síncrono',
  semestre: '2026-I',
  temaClase: '',
  enlaceSesion: '',
};

const INITIAL_RETROALIMENTACION: RetroalimentacionGeneral = {
  fortalezas: '',
  oportunidades: '',
  compromisosDocente: '',
};

export default function RubricaPage() {
  // Evaluation State
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [metadata, setMetadata] = useState<EvaluacionMetadata>(INITIAL_METADATA);
  const [respuestas, setRespuestas] = useState<Record<string, CriterioNivel | null>>({});
  const [observaciones, setObservaciones] = useState<Record<string, string>>({
    presentacion: '',
    inicio: '',
    desarrollo: '',
    cierre: '',
  });
  const [retroalimentacion, setRetroalimentacion] =
    useState<RetroalimentacionGeneral>(INITIAL_RETROALIMENTACION);

  // App UI State
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [evaluacionesList, setEvaluacionesList] = useState<Evaluacion[]>([]);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Toast Helper
  const addToast = useCallback(
    (type: ToastMessage['type'], title: string, message: string) => {
      const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
      setToasts((prev) => [...prev, { id, type, title, message }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 4500);
    },
    []
  );

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Real-time reactive score calculation
  const resumen = useMemo(() => {
    return calcularResumen(respuestas);
  }, [respuestas]);

  // Fetch past evaluations without synchronous setState inside effect
  const fetchEvaluaciones = useCallback(async () => {
    setIsLoadingHistory(true);
    try {
      const res = await fetch('/api/evaluaciones');
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setEvaluacionesList(data.data);
      }
    } catch (err) {
      console.error('Error fetching evaluaciones:', err);
    } finally {
      setIsLoadingHistory(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;
    async function initLoad() {
      try {
        const res = await fetch('/api/evaluaciones');
        const data = await res.json();
        if (isMounted && data.success && Array.isArray(data.data)) {
          setEvaluacionesList(data.data);
        }
      } catch (err) {
        console.error('Initial load failed:', err);
      }
    }
    initLoad();
    return () => {
      isMounted = false;
    };
  }, []);

  // Handlers for Form Changes
  const handleMetadataChange = (field: keyof EvaluacionMetadata, value: string) => {
    setMetadata((prev) => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors((prev) => {
        const copy = { ...prev };
        delete copy[field];
        return copy;
      });
    }
  };

  const handleSelectNivel = (criterioId: string, nivel: CriterioNivel) => {
    setRespuestas((prev) => ({ ...prev, [criterioId]: nivel }));
  };

  const handleObservacionChange = (sectionId: string, text: string) => {
    setObservaciones((prev) => ({ ...prev, [sectionId]: text }));
  };

  const handleGeneralFeedbackChange = (
    field: keyof RetroalimentacionGeneral,
    value: string
  ) => {
    setRetroalimentacion((prev) => ({ ...prev, [field]: value }));
  };

  // Reset to blank evaluation
  const handleReset = () => {
    if (
      Object.keys(respuestas).length > 0 ||
      metadata.docente ||
      metadata.asignatura
    ) {
      if (
        !confirm(
          '¿Desea iniciar una nueva ficha de observación? Se limpiarán los datos actuales no guardados.'
        )
      ) {
        return;
      }
    }
    setCurrentId(null);
    setMetadata(INITIAL_METADATA);
    setRespuestas({});
    setObservaciones({
      presentacion: '',
      inicio: '',
      desarrollo: '',
      cierre: '',
    });
    setRetroalimentacion(INITIAL_RETROALIMENTACION);
    setFormErrors({});
    addToast('info', 'Ficha Reiniciada', 'Formulario en blanco listo para una nueva observación.');
  };

  // Load past evaluation
  const handleSelectEvaluacion = (item: Evaluacion) => {
    setCurrentId(item.id);
    setMetadata({
      docente: item.docente,
      codigoDocente: item.codigoDocente || '',
      observador: item.observador,
      asignatura: item.asignatura,
      carrera: item.carrera || 'SUBE a Distancia',
      fecha: item.fecha,
      turno: item.turno || 'Virtual Síncrono',
      semestre: item.semestre || '2026-I',
      temaClase: item.temaClase || '',
      enlaceSesion: item.enlaceSesion || '',
    });
    setRespuestas(item.respuestas || {});
    setObservaciones({
      presentacion: item.observaciones?.presentacion || '',
      inicio: item.observaciones?.inicio || '',
      desarrollo: item.observaciones?.desarrollo || '',
      cierre: item.observaciones?.cierre || '',
    });
    if (item.retroalimentacionGeneral) {
      setRetroalimentacion(item.retroalimentacionGeneral);
    }
    setIsHistoryOpen(false);
    addToast(
      'success',
      'Ficha Cargada',
      `Se cargaron los datos de la observación de ${item.docente} (${item.puntajeTotal.toFixed(2)} pts).`
    );
  };

  // Delete evaluation
  const handleDeleteEvaluacion = async (id: string): Promise<boolean> => {
    try {
      const res = await fetch(`/api/evaluaciones/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setEvaluacionesList((prev) => prev.filter((item) => item.id !== id));
        if (currentId === id) {
          handleReset();
        }
        addToast('success', 'Registro Eliminado', 'La evaluación ha sido removida del archivo.');
        return true;
      } else {
        addToast('error', 'Error al Eliminar', data.error || 'No se pudo eliminar el registro.');
        return false;
      }
    } catch {
      addToast('error', 'Error', 'Falla de conexión al intentar eliminar el registro.');
      return false;
    }
  };

  // Save Evaluation
  const handleSave = async () => {
    const errors: Record<string, string> = {};
    if (!metadata.docente.trim()) errors.docente = 'Indique el nombre del docente evaluado.';
    if (!metadata.observador.trim()) errors.observador = 'Indique el nombre del docente observador.';
    if (!metadata.asignatura.trim()) errors.asignatura = 'Indique la asignatura o experiencia curricular.';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      addToast(
        'warning',
        'Campos Requeridos',
        'Por favor complete los campos obligatorios señalados en rojo en la sección de datos generales.'
      );
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (resumen.criteriosEvaluados < resumen.totalCriterios) {
      const pending = resumen.totalCriterios - resumen.criteriosEvaluados;
      const proceed = confirm(
        `Hay ${pending} criterio(s) pendientes de calificación. ¿Desea guardar la ficha en su estado actual?`
      );
      if (!proceed) return;
    }

    setIsSaving(true);
    try {
      const payload = {
        id: currentId || undefined,
        ...metadata,
        respuestas,
        observaciones,
        retroalimentacionGeneral: retroalimentacion,
      };

      const res = await fetch('/api/evaluaciones', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      if (result.success && result.data) {
        setCurrentId(result.data.id);
        addToast(
          'success',
          'Evaluación Guardada',
          `Se registró la evaluación de ${result.data.docente} con puntaje ${result.data.puntajeTotal.toFixed(2)} / 20.00 pts (${result.data.estado}).`
        );
        await fetchEvaluaciones();
      } else {
        addToast('error', 'Error al Guardar', result.error || 'No se pudo registrar la evaluación.');
      }
    } catch (err) {
      console.error('Error saving evaluacion:', err);
      addToast('error', 'Error de Red', 'No se pudo establecer comunicación con el servidor.');
    } finally {
      setIsSaving(false);
    }
  };

  // Print Handler
  const handlePrint = () => {
    window.print();
  };

  // Criteria Groups
  const criteriosPresentacion = RUBRICA_DIMENSIONES[0].criterios || [];
  const subdimensionesDidactica = RUBRICA_DIMENSIONES[1].subdimensiones || [];
  const criteriosInicio = subdimensionesDidactica[0]?.criterios || [];
  const criteriosDesarrollo = subdimensionesDidactica[1]?.criterios || [];
  const criteriosCierre = subdimensionesDidactica[2]?.criterios || [];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Toast Notification Container */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />

      {/* Institutional Top Navbar */}
      <Navbar
        evaluacionesCount={evaluacionesList.length}
        onOpenHistory={() => setIsHistoryOpen(true)}
        onReset={handleReset}
        onPrint={handlePrint}
      />

      {/* Official Print View (only rendered when user prints) */}
      <PrintReportView
        metadata={metadata}
        respuestas={respuestas}
        observaciones={observaciones}
        retroalimentacion={retroalimentacion}
        resumen={resumen}
      />

      {/* Interactive Main View */}
      <main className="no-print flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Humanized Institutional Header Banner */}
        <section aria-label="Información institucional" className="mb-6">
          <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-5 sm:p-6 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5 relative overflow-hidden">
            {/* Subtle soft red/blue edge highlight */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#c82333] via-[#b31b2c] to-[#1a569d]" />

            <div className="flex items-start gap-4 max-w-3xl">
              <div className="hidden sm:flex w-12 h-12 rounded-xl bg-blue-50/80 border border-blue-100 items-center justify-center text-[#143e72] flex-shrink-0 mt-0.5">
                <FileCheck2 className="w-6 h-6" />
              </div>

              <div>
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className="text-[11px] font-semibold text-[#143e72] bg-blue-50 px-2 py-0.5 rounded border border-blue-200/60">
                    UCV Virtual • SUBE a Distancia
                  </span>
                  <span className="text-[11px] font-medium text-slate-500">
                    Acompañamiento Pedagógico de Clases Síncronas en Zoom
                  </span>
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                  Ficha de Observación y Calificación Docente
                </h2>
                <p className="text-xs sm:text-[13px] text-slate-600 mt-1 leading-relaxed">
                  Instrumento de supervisión académica estructurado en escala vigesimal (0.00 a 20.00 puntos).
                  Evalúa la formalidad en el entorno virtual y la secuencia didáctica completa (Inicio, Desarrollo y Cierre).
                </p>
              </div>
            </div>

            {/* Benchmark Chips */}
            <div className="flex flex-row lg:flex-col items-center lg:items-end gap-2 w-full lg:w-auto justify-between lg:justify-center border-t lg:border-t-0 pt-3 lg:pt-0 border-slate-100 flex-shrink-0">
              <div className="inline-flex items-center gap-1.5 text-xs text-slate-700 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>Nota mínima aprobatoria: <strong>14.00 / 20.00 pts</strong></span>
              </div>
              <div className="inline-flex items-center gap-1.5 text-xs text-slate-600">
                <Info className="w-3.5 h-3.5 text-[#1a569d]" />
                <span>13 criterios ponderados</span>
              </div>
            </div>
          </div>
        </section>

        {/* 1. Academic Session Metadata */}
        <section aria-label="Datos generales">
          <MetadataForm
            metadata={metadata}
            onChange={handleMetadataChange}
            errors={formErrors}
          />
        </section>

        {/* Dimension 1: Presentación Docente (4.00 pts) */}
        <section aria-label="Presentación docente">
          <SectionCard
            id="presentacion"
            codigo="1"
            titulo="Dimensión: Presentación Docente"
            descripcion="Condiciones del entorno virtual, vestimenta adecuada, cámara encendida, audio nítido y fondo institucional oficial de SUBE."
            puntajeMaximo={4.00}
            criterios={criteriosPresentacion}
            respuestas={respuestas}
            onSelectNivel={handleSelectNivel}
            observacion={observaciones.presentacion}
            onObservacionChange={(text) => handleObservacionChange('presentacion', text)}
            icon={<Video className="w-4 h-4 text-[#143e72]" />}
          />
        </section>

        {/* Dimension 2 Title Separator */}
        <div className="my-5 flex items-center gap-3">
          <div className="h-px bg-slate-200 flex-1"></div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-600 bg-slate-100/90 px-3 py-1 rounded border border-slate-200">
            Dimensión 2: Estructura Didáctica de la Clase (16.00 pts)
          </span>
          <div className="h-px bg-slate-200 flex-1"></div>
        </div>

        {/* Dimension 2.1: Inicio (4.00 pts) */}
        <section aria-label="Momento de inicio">
          <SectionCard
            id="inicio"
            codigo="2.1"
            titulo="Momento de Inicio"
            descripcion="Saludo cordial, presentación del tema de la sesión, enunciación del objetivo y dinámica de saberes previos o motivación."
            puntajeMaximo={4.00}
            criterios={criteriosInicio}
            respuestas={respuestas}
            onSelectNivel={handleSelectNivel}
            observacion={observaciones.inicio}
            onObservacionChange={(text) => handleObservacionChange('inicio', text)}
            icon={<Compass className="w-4 h-4 text-[#143e72]" />}
          />
        </section>

        {/* Dimension 2.2: Desarrollo (8.00 pts) */}
        <section aria-label="Momento de desarrollo">
          <SectionCard
            id="desarrollo"
            codigo="2.2"
            titulo="Momento de Desarrollo"
            descripcion="Claridad expositiva, soporte con diapositivas legibles o pizarras virtuales, participación activa de los alumnos y dominio disciplinar."
            puntajeMaximo={8.00}
            criterios={criteriosDesarrollo}
            respuestas={respuestas}
            onSelectNivel={handleSelectNivel}
            observacion={observaciones.desarrollo}
            onObservacionChange={(text) => handleObservacionChange('desarrollo', text)}
            icon={<Layers className="w-4 h-4 text-[#143e72]" />}
          />
        </section>

        {/* Dimension 2.3: Cierre (4.00 pts) */}
        <section aria-label="Momento de cierre">
          <SectionCard
            id="cierre"
            codigo="2.3"
            titulo="Momento de Cierre"
            descripcion="Síntesis de ideas clave, verificación del aprendizaje de los estudiantes, absolución de dudas y despedida formal."
            puntajeMaximo={4.00}
            criterios={criteriosCierre}
            respuestas={respuestas}
            onSelectNivel={handleSelectNivel}
            observacion={observaciones.cierre}
            onObservacionChange={(text) => handleObservacionChange('cierre', text)}
            icon={<Flag className="w-4 h-4 text-[#143e72]" />}
          />
        </section>

        {/* Section II: General Feedback & Commitments */}
        <section aria-label="Plan de mejora y acuerdos">
          <GeneralFeedbackSection
            data={retroalimentacion}
            onChange={handleGeneralFeedbackChange}
          />
        </section>
      </main>

      {/* Floating Bottom Results Bar */}
      <FloatingScoreBar
        resumen={resumen}
        onSave={handleSave}
        onPrint={handlePrint}
        isSaving={isSaving}
      />

      {/* History Archive Modal */}
      <HistoryModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        onSelectEvaluacion={handleSelectEvaluacion}
        onDeleteEvaluacion={handleDeleteEvaluacion}
        onRefreshList={fetchEvaluaciones}
        evaluaciones={evaluacionesList}
        isLoading={isLoadingHistory}
      />
    </div>
  );
}
