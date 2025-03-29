/**
 * Extrae y organiza los colores desde el archivo de paleta de colores
 * @param {Object} paletaColores - Objeto con la paleta de colores
 * @returns {Object} Objeto con los colores organizados para usar en la aplicación
 */
export function extractColorsFromPalette(paletaColores) {
  // Si la paleta está vacía o no existe, devolvemos colores por defecto
  if (!paletaColores) {
    return {
      primario: "#aad585",
      secundario: "#7aab53",
      acento1: "#cba3d7", 
      acento2: "#68dad6",
      fondo: "#f8faf5",
      texto: "#3d4d2c",
      textoClaro: "#ffffff",
      pastelVerde: "#d6e9c1",
      pastelLavanda: "#e4d3ed"
    };
  }
  
  // Obtener colores del tema "natural" o usar el primero disponible
  const temaElegido = paletaColores.temasUsuario?.natural || 
                       Object.values(paletaColores.temasUsuario || {})[0] || 
                       {};
  
  // Obtener colores de variaciones o usar valores por defecto
  const variacionesLavanda = paletaColores.variacionesLavanda || {};
  const variacionesTurquesa = paletaColores.variacionesTurquesa || {};
  const variacionesVerde = paletaColores.variacionesVerde || {};
  const pasteles = paletaColores.combinacionesPastel || {};
  
  // Componer objeto de colores
  return {
    // Colores primarios del tema elegido
    primario: temaElegido.primario || "#aad585",
    secundario: temaElegido.secundario || "#7aab53",
    acento1: variacionesLavanda.lavandaBase || "#cba3d7",
    acento2: variacionesTurquesa.turquesaBase || "#68dad6",
    fondo: temaElegido.fondo || "#f8faf5",
    texto: temaElegido.textoOscuro || "#3d4d2c",
    textoClaro: temaElegido.textoClaro || "#ffffff",
    
    // Colores pastel
    pastelVerde: pasteles.pastelVerde || "#d6e9c1",
    pastelLavanda: pasteles.pastelLavanda || "#e4d3ed",
    pastelTurquesa: pasteles.pastelTurquesa || "#b4eeec",
    pastelRosa: pasteles.pastelRosa || "#f8dcef",
    
    // Variaciones de verde
    verdeClaro: variacionesVerde.verdeClaro || "#bfdea0",
    verdeMedio: variacionesVerde.verdeMedio || "#91c46a",
    
    // Variaciones de lavanda
    lavandaClaro: variacionesLavanda.lavandaClaro || "#d4b3e0",
    lavandaMedio: variacionesLavanda.lavandaMedio || "#bb8bcc",
    
    // Variaciones de turquesa
    turquesaClaro: variacionesTurquesa.turquesaClaro || "#8ae3e0",
    turquesaMedio: variacionesTurquesa.turquesaMedio || "#4bc7c3"
  };
}

/**
 * Genera variantes de color para estados de hover, focus, etc.
 * @param {string} color - Color base en formato hexadecimal
 * @param {number} factor - Factor de ajuste (0-1, donde <0.5 oscurece, >0.5 aclara)
 * @returns {string} Color ajustado en formato hexadecimal
 */
export function adjustColor(color, factor = 0.2) {
  // Eliminar el # si existe
  color = color.replace('#', '');
  
  // Convertir a RGB
  const r = parseInt(color.substring(0, 2), 16);
  const g = parseInt(color.substring(2, 4), 16);
  const b = parseInt(color.substring(4, 6), 16);
  
  // Ajustar basado en el factor (oscurecer o aclarar)
  const adjust = factor < 0.5 ? 
    (c) => Math.max(0, Math.floor(c * (1 - Math.abs(factor - 0.5) * 2))) : 
    (c) => Math.min(255, Math.floor(c + (255 - c) * (factor - 0.5) * 2));
  
  // Calcular nuevos valores RGB
  const newR = adjust(r);
  const newG = adjust(g);
  const newB = adjust(b);
  
  // Convertir de vuelta a hexadecimal
  return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
}