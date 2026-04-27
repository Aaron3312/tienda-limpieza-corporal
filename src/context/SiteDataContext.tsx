'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { getColores, getInformacionNegocio } from '@/services/firestore';
import { Colores, InformacionNegocio } from '@/types';

// Design system colors derived from Firestore Colores
export interface SiteColors {
  bg:    string;
  dark:  string;
  green: string;
  sage:  string;
  muted: string;
  body:  string;
  raw:   Colores;
}

const DEFAULT_COLORS: SiteColors = {
  bg:    '#F7F4EF',
  dark:  '#1C2B12',
  green: '#5C7A3E',
  sage:  '#aad585',
  muted: '#EDE8DF',
  body:  '#5A5A5A',
  raw: {
    primario:    '#5C7A3E',
    secundario:  '#68dad6',
    acento1:     '#aad585',
    acento2:     '#cba3d7',
    textoOscuro: '#1C2B12',
    textoClaro:  '#ffffff',
    fondo:       '#F7F4EF',
    texto:       '#5A5A5A',
    pastelVerde: '#EDE8DF',
    pastelLavanda: '#e6e6fa',
  },
};

const DEFAULT_INFO: InformacionNegocio = {
  nombre: 'Solo Para Eva',
  eslogan: '',
  descripcion: '',
  vision: '',
  mision: '',
  valores: [],
  contacto: {
    telefono: '+52 55 1802 6391',
    email: 'altardelcielogp@gmail.com',
    redesSociales: {
      facebook: 'https://www.facebook.com/share/18kSRN2JWi/',
      instagram: 'https://www.instagram.com/soloparaeva/',
    },
    horarios: {
      lunesViernes: '9:00 AM – 5:00 PM',
      sabados: '9:00 AM – 5:00 PM',
      domingos: 'Cerrado',
    },
  },
};

function coloresTo(c: Colores): SiteColors {
  return {
    bg:    c.fondo       || '#F7F4EF',
    dark:  c.textoOscuro || '#1C2B12',
    green: c.primario    || '#5C7A3E',
    sage:  c.acento1     || '#aad585',
    muted: c.pastelVerde || '#EDE8DF',
    body:  c.texto       || '#5A5A5A',
    raw:   c,
  };
}

interface SiteDataContextType {
  C: SiteColors;
  info: InformacionNegocio;
  loading: boolean;
}

const SiteDataContext = createContext<SiteDataContextType>({
  C: DEFAULT_COLORS,
  info: DEFAULT_INFO,
  loading: true,
});

export function useSiteData() {
  return useContext(SiteDataContext);
}

export function SiteDataProvider({ children }: { children: React.ReactNode }) {
  const [C, setC]       = useState<SiteColors>(DEFAULT_COLORS);
  const [info, setInfo] = useState<InformacionNegocio>(DEFAULT_INFO);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getColores(), getInformacionNegocio()]).then(([colores, infNegocio]) => {
      if (colores) setC(coloresTo(colores));
      if (infNegocio) setInfo(infNegocio);
      setLoading(false);
    });
  }, []);

  return (
    <SiteDataContext.Provider value={{ C, info, loading }}>
      {children}
    </SiteDataContext.Provider>
  );
}
