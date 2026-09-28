'use client';

import React, { useState, useEffect } from 'react';
import { Evaluacion } from '@/types/rubrica';
import {
  X,
  History,
  Search,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Trash2,
  Calendar,
  User,
  BookOpen,
  Download,
  Loader2,
  RefreshCw,
} from 'lucide-react';

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectEvaluacion: (evaluacion: Evaluacion) => void;
  onDeleteEvaluacion: (id: string) => Promise<boolean>;
  onRefreshList: () => Promise<void>;
  evaluaciones: Evaluacion[];
  isLoading: boolean;
}

export const HistoryModal: React.FC<HistoryModalProps> = ({
  isOpen,
  onClose,
  onSelectEvaluacion,
  onDeleteEvaluacion,
  onRefreshList,
  evaluaciones,
  isLoading,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterEstado, setFilterEstado] = useState<'todos' | 'Aprobado' | 'En Observación'>('todos');
  const [deletingId, setDeletingId] = useState<string | null>(null);

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

  const filtered = evaluaciones.filter((item) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      item.docente.toLowerCase().includes(term) ||
      item.asignatura.toLowerCase().includes(term) ||
      item.observador.toLowerCase().includes(term) ||
      (item.carrera && item.carrera.toLowerCase().includes(term));

    const matchesEstado =
      filterEstado === 'todos' || item.estado === filterEstado;

    return matchesSearch && matchesEstado;
  });

  const handleDelete = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (confirm('¿Está seguro de que desea eliminar este registro de evaluación? Esta acción no se puede deshacer.')) {
      setDeletingId(id);
      await onDeleteEvaluacion(id);
      setDeletingId(null);
    }
  };

  const handleExportJSON = (e: React.MouseEvent, item: Evaluacion) => {
    e.stopPropagation();
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(item, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `evaluacion_${item.docente.replace(/\s+/g, '_')}_${item.fecha}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-historial-titulo"
      className="modal-overlay fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/50 backdrop-blur-xs transition-opacity"
    >
      <div
        className="bg-white rounded-xl border border-slate-200 shadow-xl w-full max-w-4xl max-h-[85vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#143e72] text-white flex items-center justify-center shadow-2xs">
              <History className="w-4 h-4" />
            </div>
            <div>
              <h2 id="modal-historial-titulo" className="text-base font-bold text-slate-800">
                Archivo de Evaluaciones Docentes
              </h2>
              <p className="text-xs text-slate-500">
                Registros históricos de acompañamiento pedagógico en SUBE a Distancia
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={onRefreshList}
              title="Actualizar listado"
              className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-200/60 rounded-lg transition-colors"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-[#1a569d]' : ''}`} />
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filters and Search Bar */}
        <div className="p-4 sm:p-5 border-b border-slate-200 bg-white flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:w-80">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por docente, asignatura..."
              className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 bg-white focus:outline-hidden focus:border-[#1a569d] focus:ring-2 focus:ring-blue-100/60 text-slate-800"
            />
          </div>

          <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            <button
              type="button"
              onClick={() => setFilterEstado('todos')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                filterEstado === 'todos'
                  ? 'bg-[#143e72] text-white'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              Todos ({evaluaciones.length})
            </button>
            <button
              type="button"
              onClick={() => setFilterEstado('Aprobado')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                filterEstado === 'Aprobado'
                  ? 'bg-emerald-700 text-white'
                  : 'bg-white text-emerald-800 border border-emerald-200 hover:bg-emerald-50'
              }`}
            >
              Aprobados ({evaluaciones.filter((e) => e.estado === 'Aprobado').length})
            </button>
            <button
              type="button"
              onClick={() => setFilterEstado('En Observación')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                filterEstado === 'En Observación'
                  ? 'bg-[#9e1a27] text-white'
                  : 'bg-white text-[#9e1a27] border border-rose-200 hover:bg-rose-50'
              }`}
            >
              En Observación ({evaluaciones.filter((e) => e.estado === 'En Observación').length})
            </button>
          </div>
        </div>

        {/* Evaluations List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-2.5">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-14 text-slate-500">
              <Loader2 className="w-7 h-7 animate-spin text-[#1a569d] mb-2" />
              <p className="text-xs font-medium">Consultando registros guardados...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-14 px-4 bg-slate-50 rounded-lg border border-dashed border-slate-300">
              <p className="text-xs sm:text-sm font-semibold text-slate-700 mb-1">
                No se encontraron evaluaciones registradas
              </p>
              <p className="text-xs text-slate-500">
                {searchTerm
                  ? 'Pruebe con otros términos de búsqueda.'
                  : 'Complete una rúbrica en el formulario principal y presione "Guardar Evaluación".'}
              </p>
            </div>
          ) : (
            filtered.map((item) => {
              const isAprobado = item.estado === 'Aprobado';
              return (
                <div
                  key={item.id}
                  onClick={() => onSelectEvaluacion(item)}
                  className="group p-4 rounded-lg border border-slate-200 hover:border-[#1a569d] hover:shadow-xs bg-white transition-all cursor-pointer flex flex-col md:flex-row items-start md:items-center justify-between gap-3"
                >
                  {/* Left: Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="text-sm font-bold text-slate-900 group-hover:text-[#143e72] transition-colors flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-slate-400" />
                        {item.docente}
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-medium">
                        {item.carrera || 'SUBE a Distancia'}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                        {item.asignatura}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        {item.fecha}
                      </span>
                      <span>
                        Observador: <strong className="text-slate-700">{item.observador}</strong>
                      </span>
                    </div>
                  </div>

                  {/* Right: Score, Status & Actions */}
                  <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 pt-2.5 md:pt-0 border-slate-100">
                    <div className="flex flex-col items-end">
                      <span className="text-base font-bold font-mono text-[#143e72]">
                        {Number(item.puntajeTotal).toFixed(2)}{' '}
                        <span className="text-xs font-normal text-slate-400">/ 20.00</span>
                      </span>
                      <div className="mt-0.5">
                        {isAprobado ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            Aprobado
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-[#9e1a27] border border-rose-200">
                            <AlertCircle className="w-3 h-3 text-[#c82333]" />
                            En Observación
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Quick actions */}
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={(e) => handleExportJSON(e, item)}
                        title="Exportar archivo JSON"
                        className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded transition-colors"
                      >
                        <Download className="w-4 h-4" />
                      </button>

                      <button
                        type="button"
                        disabled={deletingId === item.id}
                        onClick={(e) => handleDelete(e, item.id)}
                        title="Eliminar evaluación"
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded transition-colors"
                      >
                        {deletingId === item.id ? (
                          <Loader2 className="w-4 h-4 animate-spin text-rose-600" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </button>

                      <div className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-[#143e72] bg-blue-50 group-hover:bg-[#143e72] group-hover:text-white rounded transition-colors border border-blue-200/60 ml-1">
                        <span>Cargar</span>
                        <ArrowRight className="w-3 h-3" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 border-t border-slate-200 px-6 py-3 flex items-center justify-between text-xs text-slate-500">
          <span>{filtered.length} registro(s) en archivo</span>
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
