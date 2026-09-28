import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rúbrica de Observación Docente - SUBE a Distancia (UCV)",
  description:
    "Sistema Institucional de Evaluación y Acompañamiento Docente para el programa SUBE a Distancia de la Universidad César Vallejo.",
  keywords: ["UCV", "SUBE", "Observación Docente", "Rúbrica Vigesimal", "Universidad César Vallejo"],
  authors: [{ name: "Universidad César Vallejo - Programa SUBE" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900">
        {children}
      </body>
    </html>
  );
}
