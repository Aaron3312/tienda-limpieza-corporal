import React from 'react';
import catalogoData from '@/data/productos.json';
import { extractColorsFromPalette } from '@/utils/colorUtils';
import paletaColores from '@/data/paleta-colores.json';
import ContactoClient from '@/components/contacto/ContactoClient';

// Esta es la versión estática que se usará en tiempo de construcción
export default function ContactoPage() {
  // Extraer colores de la paleta
  const colores = extractColorsFromPalette(paletaColores);
  
  // Utilizar los datos iniciales del JSON estático
  const informacionNegocio = catalogoData.informacionNegocio || {
    nombre: 'Solo Para Eva',
    contacto: {
      telefono: '+52 55 1802 6391',
      email: 'altardelcielogp@gmail.com',
      redesSociales: {
        facebook: 'https://www.facebook.com/share/18kSRN2JWi/',
        instagram: 'https://www.instagram.com/soloparaeva/'
      },
      horarios: {
        lunesViernes: '9:00 AM - 5:00 PM',
        sabados: '9:00 AM - 5:00 PM',
        domingos: 'Cerrado'
      }
    }
  };

  // Renderizar el componente cliente que mostrará la UI exactamente igual pero con capacidad de actualizar desde Firebase
  return <ContactoClient initialData={informacionNegocio} colores={colores} />;
}