'use client';

import React from 'react';
import { ResumenPuntaje } from '@/types/rubrica';
import {
  Save,
  Printer,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from 'lucide-react';

interface FloatingScoreBarProps {
  resumen: ResumenPuntaje;
  onSave: () => void;
  onPrint: () => void;
  isSaving: boolean;
}

export const FloatingScoreBar: React.FC<FloatingScoreBarProps> = ({
  resumen,
  onSave,
  onPrint,
  isSaving,
}) => {
  const isAprobado = resumen.estado === 'Aprobado';
  const progressPercent = Math.min(100, Math.max(0, resumen.porcentaje));

  return (
    <aside
      aria-label="Resumen vigesimal en tiempo real"
      className="floating-bar sticky bottom-0 z-20 bg-white/95 backdrop-blur-md border-t border-slate-200/90 shadow-[0_-4px_16px_rgba(0,0,0,0.05)] py-3 px-4 sm:px-6 transition-all"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4">
        {/* Left: Score & Status */}
        <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-3">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                Puntaje Vigesimal
              </span>
              <div className="flex items-baseline gap-1">
                <span
                  className={`text-2xl sm:text-3xl font-bold font-mono tracking-tight ${
                    isAprobado ? 'text-[#143e72]' : 'text-[#c82333]'
                  }`}
                >
                  {resumen.puntajeTotal.toFixed(2)}
                </span>
                <span className="text-xs font-semibold text-slate-400">/ 20.00 pts</span>
              </div>
            </div>

            {/* Status Badge */}
            <div className="ml-1">
              {isAprobado ? (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Aprobado</span>
                  <span className="text-[10px] font-normal opacity-80">(≥ 14.00)</span>
                </div>
              ) : (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-50 text-[#9e1a27] border border-rose-300">
                  <AlertCircle className="w-3.5 h-3.5 text-[#c82333]" />
                  <span>En Observación</span>
                  <span className="text-[10px] font-normal opacity-80">(&lt; 14.00)</span>
                </div>
              )}
            </div>
          </div>

          {/* Criteria Completed */}
          <div className="hidden sm:flex flex-col text-right md:text-left border-l border-slate-200 pl-4">
            <span className="text-[10px] uppercase font-bold text-slate-400">Evaluados</span>
            <div className="text-xs font-semibold text-slate-700">
              <span className="text-[#143e72] font-bold">{resumen.criteriosEvaluados}</span> de{' '}
              {resumen.totalCriterios} criterios
            </div>
          </div>
        </div>

        {/* Center: Clean Progress Bar with Benchmark */}
        <div className="w-full md:w-72 lg:w-80 flex flex-col gap-1 hidden lg:block">
          <div className="flex justify-between text-[11px] font-medium text-slate-500">
            <span>0</span>
            <span className="text-slate-400">10.5</span>
            <span className="text-[#143e72] font-semibold">14.0 (Aprobatorio)</span>
            <span>20.0</span>
          </div>
          <div className="relative w-full h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
            {/* Threshold Line at 14.00 / 20.00 = 70% */}
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-[#c82333] z-10 opacity-70"
              style={{ left: '70%' }}
              title="Puntaje mínimo aprobatorio (14.00 pts)"
            />
            {/* Fill Bar */}
            <div
              className={`h-full transition-all duration-300 rounded-full ${
                isAprobado ? 'bg-[#143e72]' : 'bg-amber-600'
              }`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-end">
          <button
            type="button"
            onClick={onPrint}
            title="Vista de impresión oficial"
            className="flex-1 md:flex-initial inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 active:bg-slate-100 border border-slate-300 rounded-lg transition-colors"
          >
            <Printer className="w-4 h-4 text-slate-500" />
            <span>Imprimir / PDF</span>
          </button>

          <button
            type="button"
            onClick={onSave}
            disabled={isSaving}
            title="Guardar la evaluación en el sistema"
            className="flex-1 md:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2 text-xs sm:text-sm font-medium text-white bg-[#143e72] hover:bg-[#0f2e54] active:bg-[#0b2442] disabled:opacity-75 disabled:pointer-events-none rounded-lg shadow-2xs transition-colors"
          >
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-white" />
                <span>Guardando...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4 text-blue-200" />
                <span>Guardar Evaluación</span>
              </>
            )}
          </button>
        </div>
      </div>
    </aside>
  );
};
