'use client';

import React, { useState, useRef, useEffect } from 'react';
import { EvaluacionMetadata } from '@/types/rubrica';
import { Docente } from '@/types/docente';
import { buscarDocentes } from '@/lib/docentes-data';
import { DocenteSearchModal } from './DocenteSearchModal';
import {
  ShieldCheck,
  BookOpen,
  GraduationCap,
  Calendar,
  Video,
  FileSpreadsheet,
  Bookmark,
  Search,
  CheckCircle2,
  Users,
  X,
  BookMarked,
} from 'lucide-react';

interface MetadataFormProps {
  metadata: EvaluacionMetadata;
  onChange: (field: keyof EvaluacionMetadata, value: string) => void;
  errors?: Record<string, string>;
  carreraFiltro?: string;
}

export const MetadataForm: React.FC<MetadataFormProps> = ({
  metadata,
  onChange,
  errors = {},
  carreraFiltro,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedDocente, setSelectedDocente] = useState<Docente | null>(null);
  const [isManualCourse, setIsManualCourse] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Auto-detect selected teacher if metadata has codigoDocente or docente name
  useEffect(() => {
    if (metadata.codigoDocente) {
      const match = buscarDocentes(metadata.codigoDocente, carreraFiltro)[0];
      if (match) setSelectedDocente(match);
    } else if (metadata.docente) {
      const match = buscarDocentes(metadata.docente, carreraFiltro)[0];
      if (match && (match.nombreCompleto.toLowerCase() === metadata.docente.toLowerCase() || `${match.apellidos} ${match.nombres}`.toLowerCase() === metadata.docente.toLowerCase())) {
        setSelectedDocente(match);
      }
    }
  }, [metadata.codigoDocente, metadata.docente, carreraFiltro]);

  // Suggestions filtered in real time as user types
  const suggestions = React.useMemo(() => {
    if (!metadata.docente || metadata.docente.length < 2) return [];
    return buscarDocentes(metadata.docente, carreraFiltro).slice(0, 6);
  }, [metadata.docente, carreraFiltro]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // When a teacher is selected from dropdown or directory modal
  const handleSelectDocente = (doc: Docente) => {
    setSelectedDocente(doc);
    onChange('docente', doc.nombreCompleto);
    onChange('codigoDocente', doc.codigo);
    onChange('carrera', doc.carrera);
    setIsManualCourse(false);
    if (doc.asignaturas && doc.asignaturas.length > 0) {
      onChange('asignatura', doc.asignaturas[0]);
    }
    setShowDropdown(false);
  };

  const handleClearSelectedDocente = () => {
    setSelectedDocente(null);
    onChange('docente', '');
    onChange('codigoDocente', '');
    setIsManualCourse(false);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs overflow-hidden mb-6">
      {/* Directory Modal */}
      <DocenteSearchModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelectDocente={handleSelectDocente}
        selectedCodigo={metadata.codigoDocente}
        carreraFiltro={carreraFiltro}
      />

      {/* Form Header */}
      <div className="bg-slate-50/80 border-b border-slate-200 px-5 sm:px-6 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#143e72] flex items-center justify-center border border-blue-200/60">
            <FileSpreadsheet className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-bold text-slate-800">
              I. Datos Generales de la Sesión Observada
            </h2>
            <p className="text-xs text-slate-500">
              Información de registro institucional del docente y la asignatura síncrona en SUBE
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#143e72] bg-white hover:bg-blue-50/70 border border-blue-200/70 rounded-lg shadow-2xs transition-colors"
        >
          <Users className="w-3.5 h-3.5 text-[#1a569d]" />
          <span>Directorio Docente</span>
        </button>
      </div>

      {/* Grid of inputs */}
      <div className="p-5 sm:p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {/* Docente Observado con Consulta a BD por Apellidos o Código */}
          <div className="relative" ref={searchContainerRef}>
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-1.5">
                <label className="block text-xs font-semibold text-slate-700">
                  Docente Observado <span className="text-[#c82333]">*</span>
                </label>
                {carreraFiltro && (
                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-blue-50 text-[#143e72] border border-blue-200">
                    {carreraFiltro}
                  </span>
                )}
              </div>
              <span className="text-[11px] text-slate-400">
                {carreraFiltro ? `Filtro ${carreraFiltro}` : 'Buscar por apellido o código'}
              </span>
            </div>

            <div className="relative rounded-lg">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={metadata.docente}
                onFocus={() => setShowDropdown(true)}
                onChange={(e) => {
                  onChange('docente', e.target.value);
                  setShowDropdown(true);
                  if (selectedDocente && selectedDocente.nombreCompleto !== e.target.value) {
                    setSelectedDocente(null);
                    onChange('codigoDocente', '');
                  }
                }}
                placeholder={
                  carreraFiltro === 'Industrial'
                    ? 'Buscar docente Industrial (ej. Quispe, DOC-2041)...'
                    : carreraFiltro === 'Sistemas'
                    ? 'Buscar docente Sistemas (ej. Amache, DOC-1001)...'
                    : 'Escriba apellidos (ej. Amache) o código (DOC-)...'
                }
                className={`w-full pl-9 pr-8 py-2 text-sm rounded-lg border bg-white focus:outline-hidden transition-all ${
                  errors.docente
                    ? 'border-rose-400 focus:ring-2 focus:ring-rose-100 text-rose-900 bg-rose-50/20'
                    : 'border-slate-300 focus:border-[#1a569d] focus:ring-2 focus:ring-blue-100/60 text-slate-800'
                }`}
              />
              {metadata.docente && (
                <button
                  type="button"
                  onClick={handleClearSelectedDocente}
                  className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Verified Teacher Badge */}
            {metadata.codigoDocente && (
              <div className="mt-1.5 flex items-center justify-between gap-1.5 px-2.5 py-1 rounded bg-blue-50/70 border border-blue-200/80 text-[11px] text-[#143e72]">
                <span className="flex items-center gap-1 font-semibold truncate">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span>Código: <strong>{metadata.codigoDocente}</strong></span>
                </span>
                <span className="text-[10px] text-slate-500 font-medium truncate">
                  {metadata.carrera ? metadata.carrera.replace(' (SUBE a Distancia)', '') : 'Docente UCV'}
                </span>
              </div>
            )}

            {errors.docente && (
              <p className="mt-1 text-xs text-[#c82333] font-medium">{errors.docente}</p>
            )}

            {/* Reactive Autocomplete Popover */}
            {showDropdown && suggestions.length > 0 && (
              <div className="absolute z-40 left-0 right-0 mt-1 bg-white rounded-xl border border-slate-200 shadow-xl overflow-hidden animate-in fade-in-50 duration-100 max-h-72 overflow-y-auto">
                <div className="px-3 py-1.5 bg-slate-50 border-b border-slate-100 text-[10px] uppercase font-bold text-slate-400 flex items-center justify-between">
                  <span>Docentes {carreraFiltro ? `de ${carreraFiltro}` : ''} encontrados en BD ({suggestions.length})</span>
                  <span>Clic para autocompletar</span>
                </div>
                {suggestions.map((doc) => (
                  <div
                    key={doc.id}
                    onMouseDown={() => handleSelectDocente(doc)}
                    className="p-3 hover:bg-blue-50/60 transition-colors cursor-pointer border-b border-slate-100 last:border-b-0"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold text-slate-900">
                        {doc.nombreCompleto}
                      </span>
                      <span className="text-[10px] font-bold bg-[#143e72] text-white px-1.5 py-0.5 rounded">
                        {doc.codigo}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-500">
                      <span className="font-medium text-[#1a569d]">
                        {doc.carrera.replace(' (SUBE a Distancia)', '')}
                      </span>
                      <span>•</span>
                      <span className="truncate">{doc.email}</span>
                    </div>

                    {doc.asignaturas.length > 0 && (
                      <div className="mt-1 text-[10px] text-slate-400 truncate flex items-center gap-1">
                        <BookMarked className="w-3 h-3 text-slate-400 flex-shrink-0" />
                        <span>Cursos: {doc.asignaturas.slice(0, 2).join(', ')}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Evaluador / Jefatura */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Docente Observador / Evaluador <span className="text-[#c82333]">*</span>
            </label>
            <div className="relative rounded-lg">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={metadata.observador}
                onChange={(e) => onChange('observador', e.target.value)}
                placeholder="Nombre del evaluador o coordinador"
                className={`w-full pl-9 pr-3 py-2 text-sm rounded-lg border bg-white focus:outline-hidden transition-all ${
                  errors.observador
                    ? 'border-rose-400 focus:ring-2 focus:ring-rose-100 text-rose-900 bg-rose-50/20'
                    : 'border-slate-300 focus:border-[#1a569d] focus:ring-2 focus:ring-blue-100/60 text-slate-800'
                }`}
              />
            </div>
            {errors.observador && (
              <p className="mt-1 text-xs text-[#c82333] font-medium">{errors.observador}</p>
            )}
          </div>

          {/* Experiencia Curricular / Asignatura */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold text-slate-700">
                Experiencia Curricular / Asignatura <span className="text-[#c82333]">*</span>
              </label>
              {selectedDocente && selectedDocente.asignaturas.length > 0 && (
                <button
                  type="button"
                  onClick={() => setIsManualCourse(!isManualCourse)}
                  className="text-[11px] text-[#1a569d] hover:underline font-medium"
                >
                  {isManualCourse ? '← Ver cursos asignados' : '✏️ Ingreso manual'}
                </button>
              )}
            </div>

            {selectedDocente && selectedDocente.asignaturas.length > 0 && !isManualCourse ? (
              <div>
                <div className="relative rounded-lg">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <BookOpen className="w-4 h-4 text-[#1a569d]" />
                  </div>
                  <select
                    value={metadata.asignatura}
                    onChange={(e) => onChange('asignatura', e.target.value)}
                    className={`w-full pl-9 pr-3 py-2 text-sm rounded-lg border bg-white focus:outline-hidden transition-all font-semibold ${
                      errors.asignatura
                        ? 'border-rose-400 focus:ring-2 focus:ring-rose-100 text-rose-900 bg-rose-50/20'
                        : 'border-[#1a569d]/60 focus:border-[#1a569d] focus:ring-2 focus:ring-blue-100/60 text-slate-900 bg-blue-50/15'
                    }`}
                  >
                    <option value="">-- Seleccionar curso a supervisar ({selectedDocente.asignaturas.length} disponibles) --</option>
                    {selectedDocente.asignaturas.map((asig, i) => (
                      <option key={i} value={asig}>
                        {asig}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Clickable course chips for quick 1-click selection */}
                <div className="mt-2 flex items-center gap-1.5 flex-wrap">
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                    Cursos asignados:
                  </span>
                  {selectedDocente.asignaturas.map((asig, i) => {
                    const isCurrent = metadata.asignatura === asig;
                    return (
                      <button
                        key={i}
                        type="button"
                        onClick={() => onChange('asignatura', asig)}
                        className={`text-xs px-2.5 py-1 rounded-md border font-semibold transition-all flex items-center gap-1 ${
                          isCurrent
                            ? 'bg-[#143e72] text-white border-[#143e72] shadow-xs'
                            : 'bg-white text-slate-700 border-slate-300 hover:bg-blue-50 hover:border-blue-400 hover:text-[#143e72]'
                        }`}
                      >
                        {isCurrent && <CheckCircle2 className="w-3 h-3 text-emerald-400" />}
                        <span>{asig}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div>
                <div className="relative rounded-lg">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={metadata.asignatura}
                    onChange={(e) => onChange('asignatura', e.target.value)}
                    placeholder="Escriba el nombre oficial de la materia..."
                    className={`w-full pl-9 pr-3 py-2 text-sm rounded-lg border bg-white focus:outline-hidden transition-all ${
                      errors.asignatura
                        ? 'border-rose-400 focus:ring-2 focus:ring-rose-100 text-rose-900 bg-rose-50/20'
                        : 'border-slate-300 focus:border-[#1a569d] focus:ring-2 focus:ring-blue-100/60 text-slate-800'
                    }`}
                  />
                </div>
                {selectedDocente && selectedDocente.asignaturas.length > 0 && (
                  <p className="mt-1 text-[11px] text-slate-500">
                    Cursos detectados del docente:{' '}
                    {selectedDocente.asignaturas.map((a, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          onChange('asignatura', a);
                          setIsManualCourse(false);
                        }}
                        className="text-[#1a569d] hover:underline font-semibold mr-1.5"
                      >
                        {a}
                      </button>
                    ))}
                  </p>
                )}
              </div>
            )}

            {errors.asignatura && (
              <p className="mt-1 text-xs text-[#c82333] font-medium">{errors.asignatura}</p>
            )}
          </div>

          {/* Programa o Carrera */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Programa Académico / Carrera
            </label>
            <div className="relative rounded-lg">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <GraduationCap className="w-4 h-4" />
              </div>
              <input
                type="text"
                list="carreras-sube-list"
                value={metadata.carrera}
                onChange={(e) => onChange('carrera', e.target.value)}
                placeholder="Seleccione o escriba la carrera"
                className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-300 bg-white focus:border-[#1a569d] focus:outline-hidden focus:ring-2 focus:ring-blue-100/60 text-slate-800"
              />
              <datalist id="carreras-sube-list">
                <option value="Ingeniería de Sistemas (SUBE a Distancia)" />
                <option value="Ingeniería Industrial (SUBE a Distancia)" />
                <option value="Derecho (SUBE a Distancia)" />
                <option value="Administración de Empresas (SUBE a Distancia)" />
                <option value="Contabilidad y Finanzas (SUBE a Distancia)" />
                <option value="Psicología (SUBE a Distancia)" />
                <option value="Ciencias de la Comunicación (SUBE a Distancia)" />
              </datalist>
            </div>
          </div>

          {/* Fecha */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Fecha de la Observación <span className="text-[#c82333]">*</span>
            </label>
            <div className="relative rounded-lg">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Calendar className="w-4 h-4" />
              </div>
              <input
                type="date"
                value={metadata.fecha}
                onChange={(e) => onChange('fecha', e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-300 bg-white focus:border-[#1a569d] focus:outline-hidden focus:ring-2 focus:ring-blue-100/60 text-slate-800"
              />
            </div>
          </div>

          {/* Turno y Semestre */}
          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Turno
              </label>
              <select
                value={metadata.turno}
                onChange={(e) => onChange('turno', e.target.value)}
                className="w-full px-2.5 py-2 text-sm rounded-lg border border-slate-300 bg-white focus:border-[#1a569d] focus:outline-hidden focus:ring-2 focus:ring-blue-100/60 text-slate-800"
              >
                <option value="Virtual Síncrono">Virtual Síncrono</option>
                <option value="Mañana (08:00 - 12:00)">Mañana</option>
                <option value="Tarde (14:00 - 18:00)">Tarde</option>
                <option value="Noche (19:00 - 22:30)">Noche</option>
                <option value="Sábado Intensivo">Sábado</option>
                <option value="Domingo Intensivo">Domingo</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Semestre
              </label>
              <input
                type="text"
                value={metadata.semestre}
                onChange={(e) => onChange('semestre', e.target.value)}
                placeholder="2026-I"
                className="w-full px-2.5 py-2 text-sm rounded-lg border border-slate-300 bg-white focus:border-[#1a569d] focus:outline-hidden focus:ring-2 focus:ring-blue-100/60 text-slate-800"
              />
            </div>
          </div>

          {/* Tema del Sílabo */}
          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Tema o Unidad Temática de la Sesión
            </label>
            <div className="relative rounded-lg">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Bookmark className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={metadata.temaClase || ''}
                onChange={(e) => onChange('temaClase', e.target.value)}
                placeholder="Ejemplo: Sesión 05 - Control Estadístico de Procesos o Arquitectura de Microservicios"
                className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-300 bg-white focus:border-[#1a569d] focus:outline-hidden focus:ring-2 focus:ring-blue-100/60 text-slate-800"
              />
            </div>
          </div>

          {/* Enlace Zoom */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Enlace de Grabación o Sala Zoom
            </label>
            <div className="relative rounded-lg">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Video className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={metadata.enlaceSesion || ''}
                onChange={(e) => onChange('enlaceSesion', e.target.value)}
                placeholder="https://ucv-edu-pe.zoom.us/..."
                className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-300 bg-white focus:border-[#1a569d] focus:outline-hidden focus:ring-2 focus:ring-blue-100/60 text-slate-800"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
