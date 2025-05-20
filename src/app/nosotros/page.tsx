import React from 'react';
import catalogoData from '@/data/productos.json';
import { extractColorsFromPalette } from '@/utils/colorUtils';
import paletaColores from '@/data/paleta-colores.json';
import NosotrosClient from '@/components/nosotros/NosotrosClient';

// Esta es la versión estática que se usará en tiempo de construcción
export default function NosotrosPage() {
  // Extraer colores de la paleta
  const colores = extractColorsFromPalette(paletaColores);
  
  // Utilizar los datos iniciales del JSON estático
  const informacionNegocio = catalogoData.informacionNegocio || {
    nombre: 'Solo Para Eva',
    eslogan: 'Porque Tú eres la fuente de vida, la luz con la que vemos (Salmos 36:9)',
    descripcion: 'SoloparaEva es una pequeña empresa comprometida con colaborar desde el 2016 con el Bienestar y Salud de las mujeres mediante la oferta de servicios de spa y Cosmética de Autor.',
    vision: 'Ser una empresa comprometida con sus valores.',
    mision: 'Colaborar con el bienestar de la mujer.',
    valores: [
      {valor: 'Amor', cita: '(1ª Juan 4:8) "si no amo, no conozco a Dios; porque Dios es amor."'},
      {valor: 'Respeto', cita: '(Mateo 7:12) "Hacer a los demás todo lo que quiero que me hagan a mi"'},
      {valor: 'Honestidad', cita: '(Efesios 4:25) "Dejar de decir mentiras, digamos siempre la verdad a todos"'},
      {valor: 'Verdad', cita: '(Juan 8:32)… "la verdad me hará libre".'},
      {valor: 'Solidaridad', cita: '(Deuteronomio 15:11) "Siempre habrá pobres la tierra; por eso mi Dios me ordena que comparta generosamente con ellos y con quienes pasen necesidad"'},
      {valor: 'Libertad', cita: '(2 Corintios 3:17) "Donde esta mi Dios, ahí hay libertad"'},
      {valor: 'Paz', cita: '(Filipenses 4:6-7) Si hablo con Dios "experimento su paz, esa paz que supera todo entendimiento y que cuida mi corazón"'}
    ],
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
  return <NosotrosClient initialData={informacionNegocio} colores={colores} />;
}