'use client';

import React from 'react';
import Image from 'next/image';
import { EvaluacionMetadata, CriterioNivel, ResumenPuntaje, RetroalimentacionGeneral } from '@/types/rubrica';
import { RUBRICA_DIMENSIONES, calcularPuntajeCriterio } from '@/lib/rubrica-data';

interface PrintReportViewProps {
  metadata: EvaluacionMetadata;
  respuestas: Record<string, CriterioNivel | null>;
  observaciones: Record<string, string>;
  retroalimentacion: RetroalimentacionGeneral;
  resumen: ResumenPuntaje;
}

export const PrintReportView: React.FC<PrintReportViewProps> = ({
  metadata,
  respuestas,
  observaciones,
  retroalimentacion,
  resumen,
}) => {
  const isAprobado = resumen.estado === 'Aprobado';

  const formatNivel = (nivel: CriterioNivel | null) => {
    if (!nivel) return 'Sin Evaluar';
    if (nivel === 'cumple') return 'Cumple (100%)';
    if (nivel === 'en_proceso') return 'En Proceso (50%)';
    return 'No Cumple (0%)';
  };

  return (
    <div className="print-only font-serif text-slate-900 bg-white p-2">
      {/* Official Header with Real UCV Virtual Logo */}
      <div className="border-b-2 border-[#143e72] pb-3 mb-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image
            src="/logo-ucv-virtual.png"
            alt="UCV Virtual Logo"
            width={140}
            height={40}
            priority
            className="h-11 w-auto object-contain"
          />
          <div className="border-l border-slate-300 pl-3">
            <h1 className="text-sm font-bold uppercase tracking-tight text-[#143e72]">
              Universidad César Vallejo
            </h1>
            <p className="text-[11px] font-semibold text-slate-700 uppercase tracking-wide">
              Programa de Formación para Adultos — SUBE a Distancia
            </p>
            <p className="text-[10px] text-slate-500">
              Vicerrectorado Académico • Dirección de Acompañamiento y Evaluación Docente
            </p>
          </div>
        </div>

        <div className="text-right">
          <div className="inline-block border border-[#143e72] px-2.5 py-1 text-center bg-blue-50/40">
            <span className="block text-[9px] uppercase font-bold text-[#143e72]">
              Instrumento Oficial
            </span>
            <span className="text-xs font-bold text-[#c82333]">PRE SUMATIVA</span>
          </div>
          <span className="block text-[9px] text-slate-500 mt-0.5">
            Escala Vigesimal (0 a 20 pts)
          </span>
        </div>
      </div>

      <div className="text-center mb-3">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800 underline decoration-[#143e72] underline-offset-4">
          Ficha Oficial de Observación y Rúbrica de Clase Síncrona
        </h2>
      </div>

      {/* Metadata Table */}
      <table className="print-table mb-3 text-[10.5px]">
        <tbody>
          <tr>
            <th className="w-1/6 text-left">Docente Evaluado:</th>
            <td className="w-2/6 font-semibold">{metadata.docente || '—'}</td>
            <th className="w-1/6 text-left">Observador / Cargo:</th>
            <td className="w-2/6">{metadata.observador || '—'}</td>
          </tr>
          <tr>
            <th className="text-left">Asignatura:</th>
            <td className="font-semibold">{metadata.asignatura || '—'}</td>
            <th className="text-left">Carrera / Programa:</th>
            <td>{metadata.carrera || 'SUBE a Distancia'}</td>
          </tr>
          <tr>
            <th className="text-left">Fecha de Observación:</th>
            <td>{metadata.fecha || '—'}</td>
            <th className="text-left">Turno / Semestre:</th>
            <td>{metadata.turno || 'Virtual'} | {metadata.semestre || '2026-I'}</td>
          </tr>
          {metadata.temaClase && (
            <tr>
              <th className="text-left">Tema de la Sesión:</th>
              <td colSpan={3}>{metadata.temaClase}</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Criteria Breakdown */}
      <h3 className="text-[11px] font-bold uppercase tracking-wider text-[#143e72] mb-1 border-b border-slate-300 pb-0.5">
        1. Matriz de Evaluación por Criterios Didácticos
      </h3>

      <table className="print-table mb-3 text-[10px]">
        <thead>
          <tr>
            <th className="w-10 text-center">Cód.</th>
            <th className="text-left">Criterio e Indicador Observado</th>
            <th className="w-16 text-center">Pond. Máx.</th>
            <th className="w-28 text-center">Nivel Alcanzado</th>
            <th className="w-16 text-center">Puntaje</th>
          </tr>
        </thead>
        <tbody>
          {/* Dimension 1 */}
          <tr className="bg-slate-100 font-bold">
            <td colSpan={2} className="text-[#143e72]">
              1. PRESENTACIÓN DOCENTE EN ENTORNO VIRTUAL (Máx. 4.00 pts)
            </td>
            <td className="text-center font-mono">4.00</td>
            <td></td>
            <td className="text-center font-mono text-[#143e72]">
              {resumen.porSubdimension.presentacion?.puntaje?.toFixed(2) || '0.00'}
            </td>
          </tr>
          {RUBRICA_DIMENSIONES[0].criterios?.map((c) => {
            const nivel = respuestas[c.id] || null;
            const pts = calcularPuntajeCriterio(c.ponderacion, nivel);
            return (
              <tr key={c.id}>
                <td className="text-center font-bold text-slate-700">{c.codigo}</td>
                <td>
                  <strong className="block text-slate-800">{c.nombre}</strong>
                  <span className="text-[9px] text-slate-600">{c.descripcion}</span>
                </td>
                <td className="text-center font-mono">{c.ponderacion.toFixed(2)}</td>
                <td className="text-center font-medium">{formatNivel(nivel)}</td>
                <td className="text-center font-bold font-mono">{pts.toFixed(2)}</td>
              </tr>
            );
          })}
          {observaciones.presentacion && (
            <tr className="bg-slate-50 italic text-[9.5px]">
              <td colSpan={5}>
                <strong>Comentarios Presentación:</strong> {observaciones.presentacion}
              </td>
            </tr>
          )}

          {/* Dimension 2.1 */}
          <tr className="bg-slate-100 font-bold">
            <td colSpan={2} className="text-[#143e72]">
              2.1 ESTRUCTURA DIDÁCTICA: MOMENTO DE INICIO (Máx. 4.00 pts)
            </td>
            <td className="text-center font-mono">4.00</td>
            <td></td>
            <td className="text-center font-mono text-[#143e72]">
              {resumen.porSubdimension.inicio?.puntaje?.toFixed(2) || '0.00'}
            </td>
          </tr>
          {RUBRICA_DIMENSIONES[1].subdimensiones?.[0].criterios.map((c) => {
            const nivel = respuestas[c.id] || null;
            const pts = calcularPuntajeCriterio(c.ponderacion, nivel);
            return (
              <tr key={c.id}>
                <td className="text-center font-bold text-slate-700">{c.codigo}</td>
                <td>
                  <strong className="block text-slate-800">{c.nombre}</strong>
                  <span className="text-[9px] text-slate-600">{c.descripcion}</span>
                </td>
                <td className="text-center font-mono">{c.ponderacion.toFixed(2)}</td>
                <td className="text-center font-medium">{formatNivel(nivel)}</td>
                <td className="text-center font-bold font-mono">{pts.toFixed(2)}</td>
              </tr>
            );
          })}
          {observaciones.inicio && (
            <tr className="bg-slate-50 italic text-[9.5px]">
              <td colSpan={5}>
                <strong>Comentarios Inicio:</strong> {observaciones.inicio}
              </td>
            </tr>
          )}

          {/* Dimension 2.2 */}
          <tr className="bg-slate-100 font-bold">
            <td colSpan={2} className="text-[#143e72]">
              2.2 ESTRUCTURA DIDÁCTICA: MOMENTO DE DESARROLLO (Máx. 8.00 pts)
            </td>
            <td className="text-center font-mono">8.00</td>
            <td></td>
            <td className="text-center font-mono text-[#143e72]">
              {resumen.porSubdimension.desarrollo?.puntaje?.toFixed(2) || '0.00'}
            </td>
          </tr>
          {RUBRICA_DIMENSIONES[1].subdimensiones?.[1].criterios.map((c) => {
            const nivel = respuestas[c.id] || null;
            const pts = calcularPuntajeCriterio(c.ponderacion, nivel);
            return (
              <tr key={c.id}>
                <td className="text-center font-bold text-slate-700">{c.codigo}</td>
                <td>
                  <strong className="block text-slate-800">{c.nombre}</strong>
                  <span className="text-[9px] text-slate-600">{c.descripcion}</span>
                </td>
                <td className="text-center font-mono">{c.ponderacion.toFixed(2)}</td>
                <td className="text-center font-medium">{formatNivel(nivel)}</td>
                <td className="text-center font-bold font-mono">{pts.toFixed(2)}</td>
              </tr>
            );
          })}
          {observaciones.desarrollo && (
            <tr className="bg-slate-50 italic text-[9.5px]">
              <td colSpan={5}>
                <strong>Comentarios Desarrollo:</strong> {observaciones.desarrollo}
              </td>
            </tr>
          )}

          {/* Dimension 2.3 */}
          <tr className="bg-slate-100 font-bold">
            <td colSpan={2} className="text-[#143e72]">
              2.3 ESTRUCTURA DIDÁCTICA: MOMENTO DE CIERRE (Máx. 4.00 pts)
            </td>
            <td className="text-center font-mono">4.00</td>
            <td></td>
            <td className="text-center font-mono text-[#143e72]">
              {resumen.porSubdimension.cierre?.puntaje?.toFixed(2) || '0.00'}
            </td>
          </tr>
          {RUBRICA_DIMENSIONES[1].subdimensiones?.[2].criterios.map((c) => {
            const nivel = respuestas[c.id] || null;
            const pts = calcularPuntajeCriterio(c.ponderacion, nivel);
            return (
              <tr key={c.id}>
                <td className="text-center font-bold text-slate-700">{c.codigo}</td>
                <td>
                  <strong className="block text-slate-800">{c.nombre}</strong>
                  <span className="text-[9px] text-slate-600">{c.descripcion}</span>
                </td>
                <td className="text-center font-mono">{c.ponderacion.toFixed(2)}</td>
                <td className="text-center font-medium">{formatNivel(nivel)}</td>
                <td className="text-center font-bold font-mono">{pts.toFixed(2)}</td>
              </tr>
            );
          })}
          {observaciones.cierre && (
            <tr className="bg-slate-50 italic text-[9.5px]">
              <td colSpan={5}>
                <strong>Comentarios Cierre:</strong> {observaciones.cierre}
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Summary Box */}
      <div className="avoid-break border border-[#143e72] bg-slate-50/50 p-2.5 mb-3 flex items-center justify-between">
        <div>
          <span className="block text-[10px] uppercase font-bold text-slate-600">
            Escala de Evaluación Institucional
          </span>
          <span className="text-[10px] text-slate-500">
            Aprobatorio: $\ge$ 14.00 pts | En Observación: &lt; 14.00 pts
          </span>
        </div>

        <div className="flex items-center gap-5">
          <div className="text-right">
            <span className="block text-[9px] uppercase font-bold text-slate-500">
              Calificación Final
            </span>
            <span className="text-lg font-bold font-mono text-[#143e72]">
              {resumen.puntajeTotal.toFixed(2)} / 20.00 pts
            </span>
          </div>

          <div
            className={`px-3 py-1 border font-bold text-xs uppercase rounded ${
              isAprobado
                ? 'bg-emerald-50 text-emerald-900 border-emerald-500'
                : 'bg-rose-50 text-rose-900 border-rose-500'
            }`}
          >
            Estado: {resumen.estado}
          </div>
        </div>
      </div>

      {/* Feedback & Commitments */}
      <div className="avoid-break mb-5 border border-slate-300 p-2.5 bg-white text-[10px]">
        <h3 className="font-bold text-[#143e72] uppercase text-[10.5px] mb-1.5 border-b border-slate-200 pb-0.5">
          2. Plan de Acompañamiento y Acuerdos de Mejora
        </h3>
        <div className="space-y-1.5">
          <div>
            <strong className="text-slate-800">Fortalezas Destacadas:</strong>
            <p className="text-slate-700 italic pl-2">
              {retroalimentacion.fortalezas || 'Sin observaciones registradas.'}
            </p>
          </div>
          <div>
            <strong className="text-slate-800">Aspectos a Fortalecer:</strong>
            <p className="text-slate-700 italic pl-2">
              {retroalimentacion.oportunidades || 'Sin observaciones registradas.'}
            </p>
          </div>
          <div>
            <strong className="text-slate-800">Compromisos del Docente:</strong>
            <p className="text-slate-700 italic pl-2">
              {retroalimentacion.compromisosDocente || 'Sin compromisos registrados.'}
            </p>
          </div>
        </div>
      </div>

      {/* Official Signature Lines */}
      <div className="avoid-break pt-8 mt-5 border-t border-slate-300">
        <div className="grid grid-cols-3 gap-6 text-center text-[10px]">
          <div>
            <div className="border-b border-slate-600 mb-1 pb-9"></div>
            <p className="font-bold text-slate-800">Firma del Docente Observador</p>
            <p className="text-[9px] text-slate-500">{metadata.observador || 'Nombre del Evaluador'}</p>
            <p className="text-[8.5px] text-slate-400">Coordinación SUBE a Distancia</p>
          </div>

          <div>
            <div className="border-b border-slate-600 mb-1 pb-9"></div>
            <p className="font-bold text-slate-800">Firma del Docente Observado</p>
            <p className="text-[9px] text-slate-500">{metadata.docente || 'Nombre del Docente'}</p>
            <p className="text-[8.5px] text-slate-400">Conformidad de Retroalimentación</p>
          </div>

          <div>
            <div className="border-b border-slate-600 mb-1 pb-9"></div>
            <p className="font-bold text-slate-800">Dirección Académica UCV Virtual</p>
            <p className="text-[9px] text-slate-500">Programa SUBE a Distancia</p>
            <p className="text-[8.5px] text-slate-400">Sede Central - Campus Virtual</p>
          </div>
        </div>
      </div>
    </div>
  );
};
