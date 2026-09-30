'use client';

import React from 'react';
import Image from 'next/image';
import { History, RotateCcw, Printer } from 'lucide-react';

interface NavbarProps {
  evaluacionesCount: number;
  onOpenHistory: () => void;
  onReset: () => void;
  onPrint: () => void;
  escuelaNombre?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  evaluacionesCount,
  onOpenHistory,
  onReset,
  onPrint,
  escuelaNombre,
}) => {
  return (
    <header className="institutional-header sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Official Logo & Departmental Title */}
          <div className="flex items-center gap-4">
            {/* UCV Virtual Pill Logo */}
            <div className="flex items-center">
              <Image
                src="/logo-ucv-virtual.png"
                alt="Logo Oficial UCV Virtual"
                width={130}
                height={36}
                priority
                className="h-9 sm:h-10 w-auto object-contain select-none"
              />
            </div>

            {/* Vertical Divider */}
            <div className="hidden sm:block h-9 w-px bg-slate-200"></div>

            {/* Department Details */}
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                  Rúbrica de Observación Docente
                </h1>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-rose-50 text-[#9e1a27] border border-rose-200/80 tracking-wide uppercase">
                  Pre Sumativa
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-blue-50 text-[#143e72] border border-blue-200/70">
                  SUBE a Distancia
                </span>
                {escuelaNombre && (
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold border shadow-2xs ${
                    escuelaNombre.includes('Industrial')
                      ? 'bg-amber-50 text-amber-900 border-amber-300'
                      : 'bg-emerald-50 text-emerald-900 border-emerald-300'
                  }`}>
                    DAC {escuelaNombre}
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 font-normal hidden sm:block">
                Vicerrectorado Académico • Dirección de Acompañamiento y Evaluación Docente
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <nav aria-label="Acciones de la ficha de evaluación" className="header-actions flex items-center gap-2 sm:gap-2.5">
            <button
              type="button"
              onClick={onReset}
              title="Limpiar datos e iniciar nueva evaluación"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 active:bg-slate-100 rounded-lg transition-colors border border-slate-300"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
              <span className="hidden md:inline">Nueva Ficha</span>
            </button>

            <button
              type="button"
              onClick={onOpenHistory}
              title="Ver archivo de evaluaciones guardadas"
              className="relative inline-flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-medium text-[#143e72] bg-blue-50/60 hover:bg-blue-100/70 active:bg-blue-100 rounded-lg transition-colors border border-blue-200/70"
            >
              <History className="w-3.5 h-3.5 text-[#1a569d]" />
              <span className="hidden sm:inline">Historial</span>
              {evaluacionesCount > 0 && (
                <span className="ml-0.5 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold leading-none text-white bg-[#1a569d] rounded-full">
                  {evaluacionesCount}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={onPrint}
              title="Imprimir informe oficial o guardar en PDF"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-medium text-white bg-[#143e72] hover:bg-[#0f2e54] active:bg-[#0b2442] rounded-lg shadow-2xs transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Imprimir / PDF</span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};
