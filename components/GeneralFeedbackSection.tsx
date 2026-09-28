'use client';

import React from 'react';
import { RetroalimentacionGeneral } from '@/types/rubrica';
import { CheckCircle2, TrendingUp, Handshake, MessageSquareText } from 'lucide-react';

interface GeneralFeedbackSectionProps {
  data: RetroalimentacionGeneral;
  onChange: (field: keyof RetroalimentacionGeneral, value: string) => void;
}

export const GeneralFeedbackSection: React.FC<GeneralFeedbackSectionProps> = ({
  data,
  onChange,
}) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs overflow-hidden mb-10">
      <div className="bg-slate-50/80 border-b border-slate-200 px-5 sm:px-6 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#143e72] flex items-center justify-center border border-blue-200/60">
            <MessageSquareText className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-slate-800">
              II. Plan de Acompañamiento y Acuerdos de Mejora Pedagógica
            </h3>
            <p className="text-xs text-slate-500">
              Cierre reflexivo entre el docente observador y el docente observado para la mejora continua
            </p>
          </div>
        </div>
      </div>

      <div className="p-5 sm:p-6 grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* 1. Fortalezas */}
        <div className="flex flex-col">
          <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-slate-700 mb-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            1. Fortalezas Pedagógicas
          </label>
          <textarea
            rows={4}
            value={data.fortalezas}
            onChange={(e) => onChange('fortalezas', e.target.value)}
            placeholder="Describa los aspectos destacados observados en la sesión (claridad didáctica, dominio disciplinar, interacción con los alumnos)..."
            className="w-full text-xs sm:text-sm p-3 rounded-lg border border-slate-300 bg-white placeholder-slate-400 focus:outline-hidden focus:border-[#1a569d] focus:ring-2 focus:ring-blue-100/60 text-slate-800 flex-1 resize-y"
          />
        </div>

        {/* 2. Oportunidades de Mejora */}
        <div className="flex flex-col">
          <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-slate-700 mb-2">
            <TrendingUp className="w-4 h-4 text-[#c82333]" />
            2. Aspectos a Fortalecer
          </label>
          <textarea
            rows={4}
            value={data.oportunidades}
            onChange={(e) => onChange('oportunidades', e.target.value)}
            placeholder="Puntos concretos de mejora identificados para ajustar en la planificación o conducción de la clase en Zoom..."
            className="w-full text-xs sm:text-sm p-3 rounded-lg border border-slate-300 bg-white placeholder-slate-400 focus:outline-hidden focus:border-[#1a569d] focus:ring-2 focus:ring-blue-100/60 text-slate-800 flex-1 resize-y"
          />
        </div>

        {/* 3. Compromisos Acordados */}
        <div className="flex flex-col">
          <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-slate-700 mb-2">
            <Handshake className="w-4 h-4 text-[#143e72]" />
            3. Compromisos del Docente
          </label>
          <textarea
            rows={4}
            value={data.compromisosDocente}
            onChange={(e) => onChange('compromisosDocente', e.target.value)}
            placeholder="Compromisos asumidos por el docente para la siguiente fecha de acompañamiento o supervisión académica..."
            className="w-full text-xs sm:text-sm p-3 rounded-lg border border-slate-300 bg-white placeholder-slate-400 focus:outline-hidden focus:border-[#1a569d] focus:ring-2 focus:ring-blue-100/60 text-slate-800 flex-1 resize-y"
          />
        </div>
      </div>
    </div>
  );
};
