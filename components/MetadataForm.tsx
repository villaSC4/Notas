'use client';

import React from 'react';
import { EvaluacionMetadata } from '@/types/rubrica';
import {
  User,
  ShieldCheck,
  BookOpen,
  GraduationCap,
  Calendar,
  Video,
  FileSpreadsheet,
  Bookmark,
} from 'lucide-react';

interface MetadataFormProps {
  metadata: EvaluacionMetadata;
  onChange: (field: keyof EvaluacionMetadata, value: string) => void;
  errors?: Record<string, string>;
}

export const MetadataForm: React.FC<MetadataFormProps> = ({
  metadata,
  onChange,
  errors = {},
}) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs overflow-hidden mb-6">
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
        <span className="text-[11px] font-medium text-slate-500 bg-white px-2.5 py-1 rounded border border-slate-200 hidden sm:inline-block">
          Campos requeridos con (*)
        </span>
      </div>

      {/* Grid of inputs */}
      <div className="p-5 sm:p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {/* Docente */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Docente Observado <span className="text-[#c82333]">*</span>
            </label>
            <div className="relative rounded-lg">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <User className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={metadata.docente}
                onChange={(e) => onChange('docente', e.target.value)}
                placeholder="Apellidos y Nombres del docente"
                className={`w-full pl-9 pr-3 py-2 text-sm rounded-lg border bg-white focus:outline-hidden transition-all ${
                  errors.docente
                    ? 'border-rose-400 focus:ring-2 focus:ring-rose-100 text-rose-900 bg-rose-50/20'
                    : 'border-slate-300 focus:border-[#1a569d] focus:ring-2 focus:ring-blue-100/60 text-slate-800'
                }`}
              />
            </div>
            {errors.docente && (
              <p className="mt-1 text-xs text-[#c82333] font-medium">{errors.docente}</p>
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

          {/* Asignatura */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Experiencia Curricular / Asignatura <span className="text-[#c82333]">*</span>
            </label>
            <div className="relative rounded-lg">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <BookOpen className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={metadata.asignatura}
                onChange={(e) => onChange('asignatura', e.target.value)}
                placeholder="Nombre oficial de la materia"
                className={`w-full pl-9 pr-3 py-2 text-sm rounded-lg border bg-white focus:outline-hidden transition-all ${
                  errors.asignatura
                    ? 'border-rose-400 focus:ring-2 focus:ring-rose-100 text-rose-900 bg-rose-50/20'
                    : 'border-slate-300 focus:border-[#1a569d] focus:ring-2 focus:ring-blue-100/60 text-slate-800'
                }`}
              />
            </div>
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
                <option value="Derecho (SUBE a Distancia)" />
                <option value="Administración de Empresas (SUBE a Distancia)" />
                <option value="Contabilidad y Finanzas (SUBE a Distancia)" />
                <option value="Ingeniería Industrial (SUBE a Distancia)" />
                <option value="Ingeniería de Sistemas (SUBE a Distancia)" />
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
                placeholder="Ejemplo: Sesión 05 - Estructura de la Demanda y Cautelares"
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
