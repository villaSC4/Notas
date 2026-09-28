'use client';

import React from 'react';
import { CriterioDefinition, CriterioNivel } from '@/types/rubrica';
import { calcularPuntajeCriterio } from '@/lib/rubrica-data';
import { Check, Minus, X } from 'lucide-react';

interface CriterionRowProps {
  criterio: CriterioDefinition;
  selectedNivel: CriterioNivel | null;
  onSelectNivel: (nivel: CriterioNivel) => void;
  index?: number;
}

export const CriterionRow: React.FC<CriterionRowProps> = ({
  criterio,
  selectedNivel,
  onSelectNivel,
}) => {
  const puntosObtenidos = calcularPuntajeCriterio(criterio.ponderacion, selectedNivel);
  const puntosMitad = (Math.round(criterio.ponderacion * 0.5 * 100) / 100).toFixed(2);
  const puntosTotal = criterio.ponderacion.toFixed(2);

  return (
    <div
      className={`p-4 sm:p-4.5 rounded-xl border transition-colors ${
        selectedNivel
          ? 'bg-white border-slate-200 shadow-2xs'
          : 'bg-slate-50/60 border-slate-200/80 hover:bg-white hover:border-slate-300'
      }`}
    >
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 sm:gap-4">
        {/* Left: Code, Name, Descriptor */}
        <div className="flex-1 pr-0 lg:pr-4">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="inline-flex items-center justify-center px-2 py-0.5 rounded text-xs font-semibold bg-[#143e72] text-white">
              {criterio.codigo}
            </span>
            <h4 className="text-sm font-bold text-slate-800 tracking-tight">
              {criterio.nombre}
            </h4>
            <span className="text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
              Valor: {puntosTotal} pts
            </span>
          </div>
          <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed">
            {criterio.descripcion}
          </p>
        </div>

        {/* Right: Natural Segmented Controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2.5 lg:flex-shrink-0">
          <div
            className="inline-flex p-1 rounded-lg bg-slate-100/90 border border-slate-200 w-full sm:w-auto"
            role="radiogroup"
            aria-label={`Calificación para ${criterio.nombre}`}
          >
            {/* 1. No Cumple */}
            <button
              type="button"
              role="radio"
              aria-checked={selectedNivel === 'no_cumple'}
              onClick={() => onSelectNivel('no_cumple')}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                selectedNivel === 'no_cumple'
                  ? 'bg-white text-[#9e1a27] font-semibold shadow-xs border border-rose-300 ring-1 ring-rose-100'
                  : 'text-slate-600 hover:text-rose-800 hover:bg-slate-200/50'
              }`}
            >
              <X className={`w-3.5 h-3.5 ${selectedNivel === 'no_cumple' ? 'text-[#c82333]' : 'text-slate-400'}`} />
              <span>No Cumple</span>
              <span className="text-[10px] opacity-75 font-normal">(0.00)</span>
            </button>

            {/* 2. En Proceso */}
            <button
              type="button"
              role="radio"
              aria-checked={selectedNivel === 'en_proceso'}
              onClick={() => onSelectNivel('en_proceso')}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                selectedNivel === 'en_proceso'
                  ? 'bg-white text-[#854d0e] font-semibold shadow-xs border border-amber-300 ring-1 ring-amber-100'
                  : 'text-slate-600 hover:text-amber-800 hover:bg-slate-200/50'
              }`}
            >
              <Minus className={`w-3.5 h-3.5 ${selectedNivel === 'en_proceso' ? 'text-amber-600' : 'text-slate-400'}`} />
              <span>En Proceso</span>
              <span className="text-[10px] opacity-75 font-normal">({puntosMitad})</span>
            </button>

            {/* 3. Cumple */}
            <button
              type="button"
              role="radio"
              aria-checked={selectedNivel === 'cumple'}
              onClick={() => onSelectNivel('cumple')}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                selectedNivel === 'cumple'
                  ? 'bg-white text-[#143e72] font-semibold shadow-xs border border-blue-300 ring-1 ring-blue-100'
                  : 'text-slate-600 hover:text-blue-900 hover:bg-slate-200/50'
              }`}
            >
              <Check className={`w-3.5 h-3.5 ${selectedNivel === 'cumple' ? 'text-[#1a569d]' : 'text-slate-400'}`} />
              <span>Cumple</span>
              <span className="text-[10px] opacity-75 font-normal">({puntosTotal})</span>
            </button>
          </div>

          {/* Points Display */}
          <div className="w-full sm:w-20 text-right sm:text-center flex sm:flex-col items-center justify-between sm:justify-center px-2 py-1 bg-slate-50 rounded-lg border border-slate-200">
            <span className="text-[10px] text-slate-500 uppercase font-medium">Nota</span>
            <span
              className={`text-xs font-mono font-bold ${
                selectedNivel === 'cumple'
                  ? 'text-[#143e72]'
                  : selectedNivel === 'en_proceso'
                  ? 'text-amber-700'
                  : selectedNivel === 'no_cumple'
                  ? 'text-[#c82333]'
                  : 'text-slate-400'
              }`}
            >
              {selectedNivel ? `${puntosObtenidos.toFixed(2)} pts` : '—'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
