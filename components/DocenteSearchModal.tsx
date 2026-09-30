'use client';

import React, { useState, useEffect } from 'react';
import { Docente } from '@/types/docente';
import { DOCENTES_MOCK } from '@/lib/docentes-data';
import {
  X,
  Search,
  Check,
  Building2,
  Users,
} from 'lucide-react';

interface DocenteSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectDocente: (docente: Docente) => void;
  selectedCodigo?: string;
  carreraFiltro?: string;
}

export const DocenteSearchModal: React.FC<DocenteSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectDocente,
  selectedCodigo,
  carreraFiltro,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCarrera, setSelectedCarrera] = useState<string>(carreraFiltro || 'todas');

  useEffect(() => {
    if (carreraFiltro) {
      setSelectedCarrera(carreraFiltro);
    }
  }, [carreraFiltro, isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const carreras = [
    { id: 'todas', label: 'Todos los Docentes (18)' },
    { id: 'Sistemas', label: 'Ing. de Sistemas (6)' },
    { id: 'Industrial', label: 'Ing. Industrial (12)' },
  ];

  const filtered = DOCENTES_MOCK.filter((doc) => {
    const term = searchTerm.toLowerCase().trim();
    const matchSearch =
      !term ||
      doc.apellidos.toLowerCase().includes(term) ||
      doc.nombres.toLowerCase().includes(term) ||
      doc.codigo.toLowerCase().includes(term) ||
      doc.carrera.toLowerCase().includes(term) ||
      doc.asignaturas.some((a) => a.toLowerCase().includes(term));

    const matchCarrera =
      selectedCarrera === 'todas' ||
      doc.carrera.toLowerCase().includes(selectedCarrera.toLowerCase());

    return matchSearch && matchCarrera;
  });

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-docentes-titulo"
      className="modal-overlay fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/50 backdrop-blur-xs transition-opacity"
    >
      <div
        className="bg-white rounded-xl border border-slate-200 shadow-2xl w-full max-w-4xl max-h-[85vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#143e72] text-white flex items-center justify-center shadow-2xs">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <h2 id="modal-docentes-titulo" className="text-base font-bold text-slate-800">
                Directorio y Base de Datos Docente (SUBE a Distancia)
              </h2>
              <p className="text-xs text-slate-500">
                Consulte por código institucional, apellidos o carrera profesional (Sistemas, Industrial, etc.)
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Career Filter Bar */}
        <div className="p-4 sm:p-5 border-b border-slate-200 bg-white flex flex-col gap-3">
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por código (ej. DOC-2041), apellidos (ej. Amache) o curso..."
              className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 bg-white focus:outline-hidden focus:border-[#1a569d] focus:ring-2 focus:ring-blue-100/60 text-slate-800"
            />
          </div>

          {/* Quick Career Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {carreras.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setSelectedCarrera(c.id)}
                className={`px-3 py-1 rounded-md text-xs font-medium whitespace-nowrap transition-colors ${
                  selectedCarrera === c.id
                    ? 'bg-[#143e72] text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Teachers List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
          {filtered.length === 0 ? (
            <div className="text-center py-12 px-4 bg-slate-50 rounded-lg border border-dashed border-slate-300">
              <p className="text-sm font-semibold text-slate-700 mb-1">
                No se encontraron docentes con ese criterio
              </p>
              <p className="text-xs text-slate-500">
                Pruebe buscando por código como &ldquo;DOC-&rdquo; o apellidos como &ldquo;Amache&rdquo;, &ldquo;Quispe&rdquo;, &ldquo;Cabrera&rdquo;.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {filtered.map((doc) => {
                const isSelected = selectedCodigo === doc.codigo;
                return (
                  <div
                    key={doc.id}
                    onClick={() => {
                      onSelectDocente(doc);
                      onClose();
                    }}
                    className={`p-3.5 rounded-lg border transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'bg-blue-50/50 border-[#1a569d] ring-1 ring-[#1a569d]'
                        : 'bg-white border-slate-200 hover:border-[#1a569d] hover:shadow-xs'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-[#143e72] text-white">
                          {doc.codigo}
                        </span>
                        <span className="text-[11px] font-medium text-slate-500 flex items-center gap-1">
                          <Building2 className="w-3 h-3 text-slate-400" />
                          {doc.carrera.replace(' (SUBE a Distancia)', '')}
                        </span>
                      </div>

                      <h4 className="text-sm font-bold text-slate-800 mb-1">
                        {doc.nombreCompleto}
                      </h4>

                      <div className="mt-2 pt-2 border-t border-slate-100">
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                          Asignaturas asignadas:
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {doc.asignaturas.slice(0, 2).map((asig, i) => (
                            <span
                              key={i}
                              className="text-[10px] bg-slate-50 text-slate-600 px-1.5 py-0.5 rounded border border-slate-200"
                            >
                              {asig}
                            </span>
                          ))}
                          {doc.asignaturas.length > 2 && (
                            <span className="text-[10px] text-slate-400">
                              +{doc.asignaturas.length - 2} más
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 pt-2 flex items-center justify-between text-xs">
                      <span className="text-slate-400 text-[11px]">{doc.email}</span>
                      <button
                        type="button"
                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#143e72] bg-blue-50 px-2.5 py-1 rounded hover:bg-[#143e72] hover:text-white transition-colors"
                      >
                        <Check className="w-3 h-3" />
                        Seleccionar
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 border-t border-slate-200 px-6 py-3 flex items-center justify-between text-xs text-slate-500">
          <span>{filtered.length} docente(s) disponible(s)</span>
          <button
            type="button"
            onClick={onClose}
            className="px-3.5 py-1.5 text-xs font-medium text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
