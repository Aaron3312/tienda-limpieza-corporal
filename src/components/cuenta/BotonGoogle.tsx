'use client';

import { Loader2 } from 'lucide-react';

function IconoGoogle() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9 3.6l6.7-6.7C35.6 2.6 30.2 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.8 6.1C12.3 13.5 17.7 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.3 5.5-4.8 7.2l7.5 5.8c4.4-4.1 7.1-10.1 7.1-17.5z" />
      <path fill="#FBBC05" d="M10.4 28.7A14.5 14.5 0 0 1 9.5 24c0-1.6.3-3.2.8-4.7l-7.8-6.1A24 24 0 0 0 0 24c0 3.9.9 7.5 2.6 10.8l7.8-6.1z" />
      <path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.5-5.8c-2.1 1.4-4.9 2.3-8.4 2.3-6.3 0-11.7-4-13.6-9.8l-7.8 6.1C6.5 42.6 14.6 48 24 48z" />
    </svg>
  );
}

interface Props {
  onClick: () => void;
  ocupado?: boolean;
  etiqueta?: string;
  borde: string;
  texto: string;
  className?: string;
}

export default function BotonGoogle({
  onClick,
  ocupado = false,
  etiqueta = 'Continuar con Google',
  borde,
  texto,
  className = '',
}: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={ocupado}
      className={`inline-flex items-center justify-center gap-3 px-6 py-3.5 rounded-md text-sm tracking-wide border bg-white transition-all hover:-translate-y-px hover:shadow-md active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      style={{ borderColor: borde, color: texto }}
    >
      {ocupado ? <Loader2 size={18} strokeWidth={1.5} className="animate-spin" /> : <IconoGoogle />}
      {etiqueta}
    </button>
  );
}
