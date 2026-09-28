'use client';

import React from 'react';
import { CriterioDefinition, CriterioNivel } from '@/types/rubrica';
import { CriterionRow } from './CriterionRow';
import { calcularPuntajeCriterio, SUGERENCIAS_FEEDBACK } from '@/lib/rubrica-data';
import { MessageSquare, Plus } from 'lucide-react';

interface SectionCardProps {
  id: string; // 'presentacion' | 'inicio' | 'desarrollo' | 'cierre'
  codigo: string;
  titulo: string;
  descripcion?: string;
  puntajeMaximo: number;
  criterios: CriterioDefinition[];
  respuestas: Record<string, CriterioNivel | null>;
  onSelectNivel: (criterioId: string, nivel: CriterioNivel) => void;
  observacion: string;
  onObservacionChange: (text: string) => void;
  icon?: React.ReactNode;
}

export const SectionCard: React.FC<SectionCardProps> = ({
  id,
  codigo,
  titulo,
  descripcion,
  puntajeMaximo,
  criterios,
  respuestas,
  onSelectNivel,
  observacion,
  onObservacionChange,
  icon,
}) => {
  let subtotal = 0;
  criterios.forEach((c) => {
    const nivel = respuestas[c.id];
    subtotal += calcularPuntajeCriterio(c.ponderacion, nivel || null);
  });
  subtotal = Math.round(subtotal * 100) / 100;
  const porcentaje = Math.round((subtotal / puntajeMaximo) * 100);

  const sugerencias = SUGERENCIAS_FEEDBACK[id as keyof typeof SUGERENCIAS_FEEDBACK] || [];

  const handleAddSugerencia = (sug: string) => {
    if (!observacion.trim()) {
      onObservacionChange(sug);
    } else if (!observacion.includes(sug)) {
      onObservacionChange(`${observacion.trim()} ${sug}`);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs overflow-hidden mb-6">
      {/* Section Header */}
      <div className="bg-slate-50/70 border-b border-slate-200 px-5 sm:px-6 py-3.5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            {icon && (
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#143e72] flex items-center justify-center border border-blue-200/60 flex-shrink-0">
                {icon}
              </div>
            )}
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-[#143e72] text-white">
                  Sección {codigo}
                </span>
                <h3 className="text-sm sm:text-base font-bold text-slate-800">
                  {titulo}
                </h3>
              </div>
              {descripcion && (
                <p className="text-xs text-slate-500 mt-0.5">{descripcion}</p>
              )}
            </div>
          </div>

          {/* Subtotal */}
          <div className="flex items-center gap-3 self-end sm:self-center bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-2xs">
            <div className="text-right">
              <span className="block text-[10px] uppercase font-bold text-slate-400">
                Subtotal
              </span>
              <span className="text-xs sm:text-sm font-bold font-mono text-[#143e72]">
                {subtotal.toFixed(2)}{' '}
                <span className="text-xs font-normal text-slate-400">/ {puntajeMaximo.toFixed(2)} pts</span>
              </span>
            </div>
            <div className="w-14 h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
              <div
                className="h-full bg-[#1a569d] transition-all duration-200"
                style={{ width: `${Math.min(100, Math.max(0, porcentaje))}%` }}
              />
            </div>
            <span className="text-xs font-semibold text-slate-600 min-w-7 text-right">
              {porcentaje}%
            </span>
          </div>
        </div>
      </div>

      {/* Criteria Rows */}
      <div className="p-5 sm:p-6 space-y-3">
        {criterios.map((criterio, idx) => (
          <CriterionRow
            key={criterio.id}
            criterio={criterio}
            selectedNivel={respuestas[criterio.id] || null}
            onSelectNivel={(nivel) => onSelectNivel(criterio.id, nivel)}
            index={idx}
          />
        ))}

        {/* Section Observation / Feedback */}
        <div className="mt-5 pt-4 border-t border-slate-100">
          <div className="flex items-center justify-between mb-2">
            <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 uppercase tracking-wide">
              <MessageSquare className="w-3.5 h-3.5 text-[#1a569d]" />
              Observaciones del Acompañamiento: {titulo}
            </label>
            <span className="text-[11px] text-slate-400">Anotaciones del observador</span>
          </div>

          {/* Realistic suggested feedback tags */}
          {sugerencias.length > 0 && (
            <div className="feedback-quick-pills mb-2 flex items-center gap-1.5 flex-wrap">
              <span className="text-[11px] text-slate-500 font-medium mr-1">
                Comentarios frecuentes:
              </span>
              {sugerencias.map((sug, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleAddSugerencia(sug)}
                  className="inline-flex items-center gap-1 text-[11px] text-slate-600 bg-slate-50 hover:bg-blue-50 hover:text-[#143e72] px-2 py-0.5 rounded border border-slate-200 transition-colors"
                >
                  <Plus className="w-2.5 h-2.5 text-slate-400" />
                  {sug}
                </button>
              ))}
            </div>
          )}

          <textarea
            rows={2}
            value={observacion}
            onChange={(e) => onObservacionChange(e.target.value)}
            placeholder={`Redacte comentarios u orientaciones pedagógicas sobre el momento de ${titulo.toLowerCase()}...`}
            className="w-full text-xs sm:text-sm px-3 py-2 rounded-lg border border-slate-300 bg-white placeholder-slate-400 focus:outline-hidden focus:border-[#1a569d] focus:ring-2 focus:ring-blue-100/60 text-slate-800 transition-all"
          />
        </div>
      </div>
    </div>
  );
};
