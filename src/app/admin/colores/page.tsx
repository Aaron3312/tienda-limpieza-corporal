'use client';

import { useState, useEffect, useCallback } from 'react';
import { getColores, actualizarColores } from '@/services/firestore';
import { Colores } from '@/types';
import { Button } from '@/components/ui/button';
import { Save, RefreshCw, Check } from 'lucide-react';

/* ─── colour definitions ─────────────────────────────────────────────────── */

const COLOR_FIELDS: {
  key: keyof Colores;
  label: string;
  desc: string;
}[] = [
  { key: 'primario',      label: 'Primario',      desc: 'Botones, nav activo, badges' },
  { key: 'secundario',    label: 'Secundario',     desc: 'Fondos alternativos, íconos' },
  { key: 'acento1',       label: 'Acento 1',       desc: 'Tags, highlights, badges' },
  { key: 'acento2',       label: 'Acento 2',       desc: 'Detalle y decoraciones' },
  { key: 'fondo',         label: 'Fondo',          desc: 'Color de fondo de la página' },
  { key: 'pastelVerde',   label: 'Pastel verde',   desc: 'Fondos suaves, secciones claras' },
  { key: 'pastelLavanda', label: 'Pastel lavanda', desc: 'Fondos de tarjetas, secciones' },
  { key: 'textoOscuro',   label: 'Texto oscuro',   desc: 'Títulos y texto principal' },
  { key: 'texto',         label: 'Texto cuerpo',   desc: 'Párrafos y descripciones' },
  { key: 'textoClaro',    label: 'Texto claro',    desc: 'Texto sobre fondos oscuros' },
];

const DEFAULTS: Colores = {
  primario:      '#5C7A3E',
  secundario:    '#68dad6',
  acento1:       '#aad585',
  acento2:       '#cba3d7',
  textoOscuro:   '#1C2B12',
  textoClaro:    '#ffffff',
  fondo:         '#F7F4EF',
  pastelVerde:   '#EDE8DF',
  pastelLavanda: '#f2bae0',
  texto:         '#5A5A5A',
};

/* ─── helpers ────────────────────────────────────────────────────────────── */

function isValidHex(v: string) {
  return /^#[0-9A-Fa-f]{6}$/.test(v);
}

/* ─── page ───────────────────────────────────────────────────────────────── */

export default function ColoresPage() {
  const [formData, setFormData] = useState<Colores>(DEFAULTS);
  const [loading, setLoading]   = useState(true);
  const [saving, setSaving]     = useState(false);
  const [saved, setSaved]       = useState(false);
  const [error, setError]       = useState<string | null>(null);

  useEffect(() => {
    getColores()
      .then(c => { if (c) setFormData({ ...DEFAULTS, ...c }); })
      .catch(() => setError('Error al cargar los colores.'))
      .finally(() => setLoading(false));
  }, []);

  const set = useCallback((key: keyof Colores, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
    setSaved(false);
  }, []);

  const handleSave = async () => {
    try {
      setSaving(true);
      setError(null);
      await actualizarColores(formData);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err: any) {
      setError('Error al guardar: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const f = formData;

  return (
    <div className="space-y-6 pb-10">

      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Colores</h2>
          <p className="text-sm text-muted-foreground mt-0.5">
            Paleta de color del sitio. Los cambios se reflejan en vivo.
          </p>
        </div>
        <Button onClick={handleSave} disabled={saving} size="sm" className="shrink-0">
          {saving ? (
            <><RefreshCw className="mr-2 h-4 w-4 animate-spin" />Guardando…</>
          ) : saved ? (
            <><Check className="mr-2 h-4 w-4" />Guardado</>
          ) : (
            <><Save className="mr-2 h-4 w-4" />Guardar cambios</>
          )}
        </Button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary" />
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_340px] gap-6">

          {/* ── Color grid ── */}
          <div className="bg-white rounded-xl border p-5">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
              Paleta
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-3 gap-4">
              {COLOR_FIELDS.map(({ key, label, desc }) => {
                const val = (f[key] as string | undefined) || DEFAULTS[key] || '#000000';
                const valid = isValidHex(val);
                return (
                  <ColorTile
                    key={key}
                    label={label}
                    desc={desc}
                    value={val}
                    valid={valid}
                    onChange={v => set(key, v)}
                  />
                );
              })}
            </div>
          </div>

          {/* ── Live preview ── */}
          <div className="space-y-4">
            <div className="bg-white rounded-xl border p-5">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
                Vista previa
              </p>

              {/* Simulated page section */}
              <div className="rounded-xl overflow-hidden border" style={{ backgroundColor: f.fondo }}>
                {/* Nav bar */}
                <div className="px-4 py-3 flex items-center justify-between" style={{ backgroundColor: f.primario }}>
                  <span className="text-sm font-bold" style={{ color: f.textoClaro }}>Solo Para Eva</span>
                  <div className="flex gap-2">
                    {[f.acento1, f.acento2].map((c, i) => (
                      <div key={i} className="w-2 h-2 rounded-full" style={{ backgroundColor: c }} />
                    ))}
                  </div>
                </div>

                {/* Hero section */}
                <div className="px-4 py-5" style={{ backgroundColor: f.pastelVerde || f.fondo }}>
                  <p className="text-xs font-semibold mb-1" style={{ color: f.primario }}>
                    Bienvenida
                  </p>
                  <h3 className="text-base font-bold leading-tight mb-2" style={{ color: f.textoOscuro }}>
                    Cosméticos Naturales
                  </h3>
                  <p className="text-xs mb-3 leading-relaxed" style={{ color: f.texto || f.textoOscuro }}>
                    Productos elaborados con los mejores ingredientes naturales.
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    <button className="px-3 py-1.5 rounded-lg text-xs font-semibold" style={{ backgroundColor: f.primario, color: f.textoClaro }}>
                      Ver productos
                    </button>
                    <button className="px-3 py-1.5 rounded-lg text-xs font-semibold border" style={{ borderColor: f.primario, color: f.primario, backgroundColor: 'transparent' }}>
                      Saber más
                    </button>
                  </div>
                </div>

                {/* Product card row */}
                <div className="px-4 pb-4 pt-1">
                  <div className="rounded-xl overflow-hidden border bg-white shadow-sm">
                    <div className="h-16" style={{ backgroundColor: f.secundario, opacity: 0.35 }} />
                    <div className="p-3">
                      <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-medium mb-1.5" style={{ backgroundColor: f.acento1, color: f.textoOscuro }}>
                        Hidratación
                      </span>
                      <p className="text-xs font-semibold leading-tight" style={{ color: f.textoOscuro }}>
                        Sérum Vitamina C
                      </p>
                      <p className="text-[10px] mt-0.5" style={{ color: f.texto || f.textoOscuro }}>
                        Ilumina y unifica el tono
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs font-bold" style={{ color: f.primario }}>$185</span>
                        <button className="px-2 py-1 rounded-md text-[10px] font-semibold" style={{ backgroundColor: f.acento2 || f.primario, color: f.textoClaro }}>
                          Agregar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer strip */}
                <div className="px-4 py-2.5 text-[10px]" style={{ backgroundColor: f.textoOscuro, color: f.textoClaro }}>
                  © 2026 Solo Para Eva · Todos los derechos reservados
                </div>
              </div>

              {/* Palette strip */}
              <div className="mt-4 flex gap-1.5 flex-wrap">
                {COLOR_FIELDS.map(({ key }) => {
                  const v = (f[key] as string | undefined) || DEFAULTS[key] || '#000';
                  return (
                    <div
                      key={key}
                      title={key}
                      className="w-6 h-6 rounded-full border border-white shadow-sm ring-1 ring-black/10 shrink-0"
                      style={{ backgroundColor: v }}
                    />
                  );
                })}
              </div>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}

/* ─── ColorTile ──────────────────────────────────────────────────────────── */

function ColorTile({
  label, desc, value, valid, onChange,
}: {
  label: string;
  desc: string;
  value: string;
  valid: boolean;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      {/* Swatch — clicking it opens the hidden color input */}
      <label className="cursor-pointer group relative block aspect-square rounded-xl border-2 border-transparent hover:border-primary/40 transition-all overflow-hidden shadow-sm"
        style={{ backgroundColor: valid ? value : '#ccc' }}>
        <input
          type="color"
          value={valid ? value : '#000000'}
          onChange={e => onChange(e.target.value)}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors rounded-xl" />
      </label>

      {/* Info + hex input */}
      <div>
        <p className="text-xs font-semibold text-gray-800 leading-tight">{label}</p>
        <p className="text-[10px] text-gray-400 leading-tight mb-1">{desc}</p>
        <input
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
          maxLength={7}
          className={`w-full text-xs font-mono px-2 py-1 rounded-md border focus:outline-none focus:ring-2 focus:ring-primary/40 ${
            valid ? 'border-gray-200 bg-gray-50' : 'border-red-300 bg-red-50 text-red-600'
          }`}
        />
      </div>
    </div>
  );
}
