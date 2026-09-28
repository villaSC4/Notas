'use client';

import React from 'react';
import { CheckCircle2, AlertTriangle, XCircle, Info, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'warning' | 'error' | 'info';
  title: string;
  message: string;
}

interface ToastContainerProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div
      role="region"
      aria-label="Notificaciones del sistema"
      className="toast-container fixed top-24 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none"
    >
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isWarning = toast.type === 'warning';
        const isError = toast.type === 'error';

        return (
          <div
            key={toast.id}
            role="status"
            className={`pointer-events-auto p-4 rounded-xl border shadow-lg flex items-start gap-3 backdrop-blur-md transition-all duration-300 animate-in slide-in-from-right-5 ${
              isSuccess
                ? 'bg-emerald-50/95 border-emerald-300 text-emerald-950'
                : isWarning
                ? 'bg-amber-50/95 border-amber-300 text-amber-950'
                : isError
                ? 'bg-rose-50/95 border-rose-300 text-rose-950'
                : 'bg-blue-50/95 border-blue-300 text-blue-950'
            }`}
          >
            <div className="flex-shrink-0 mt-0.5">
              {isSuccess && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
              {isWarning && <AlertTriangle className="w-5 h-5 text-amber-600" />}
              {isError && <XCircle className="w-5 h-5 text-rose-600" />}
              {!isSuccess && !isWarning && !isError && <Info className="w-5 h-5 text-blue-600" />}
            </div>

            <div className="flex-1">
              <h5 className="text-xs font-bold leading-tight">{toast.title}</h5>
              <p className="text-xs mt-0.5 text-slate-700 leading-snug">{toast.message}</p>
            </div>

            <button
              type="button"
              onClick={() => onDismiss(toast.id)}
              className="text-slate-400 hover:text-slate-700 p-0.5 rounded transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
