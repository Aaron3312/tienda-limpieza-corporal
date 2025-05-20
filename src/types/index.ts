// Definición de tipos para los datos de la tienda

export interface Variante {
    id: string;
    nombre: string;
    precio: number;
    tamano: string;
  }
  
  export interface Producto {
    id: string;
    nombre: string;
    descripcion: string;
    categoria: string;
    variantes: Variante[];
    variedades?: string[];
    imagen: string;
    destacado: boolean;
  }
  
  export interface Categoria {
    id: string;
    nombre: string;
    descripcion: string;
  }
  
  export interface Valor {
    valor: string;
    cita: string;
  }
  
  export interface RedesSociales {
    facebook: string;
    instagram: string;
  }
  
  export interface Horarios {
    lunesViernes: string;
    sabados: string;
    domingos: string;
  }
  
  export interface Contacto {
    telefono: string;
    email: string;
    redesSociales: RedesSociales;
    horarios: Horarios;
  }
  
  export interface InformacionNegocio {
    nombre: string;
    eslogan: string;
    descripcion: string;
    vision: string;
    mision: string;
    valores: Valor[];
    contacto: Contacto;
  }
  
  export interface Colores {
    primario: string;
    secundario: string;
    acento1: string;
    acento2: string;
    textoOscuro: string;
    textoClaro: string;
    fondo: string;
    pastelLavanda?: string;
    texto?: string;
    pastelVerde?: string;
  }
  
  export interface AppData {
    categorias: Categoria[];
    productos: Producto[];
    colores: Colores;
    informacionNegocio: InformacionNegocio;
  }