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
// ---------------------------------------------------------------------------
// Carrito y pedidos
// ---------------------------------------------------------------------------

/** Línea del carrito: se identifica por producto + variante, nunca sólo por producto. */
export interface LineaCarrito {
  productoId: string;
  varianteId: string;
  cantidad: number;
}

/** Línea ya resuelta contra el catálogo, lista para pintarse. */
export interface LineaCarritoResuelta extends LineaCarrito {
  nombre: string;
  tamano: string;
  precioUnitario: number;
  imagen: string;
  disponible: boolean;
}

/**
 * Copia congelada de lo comprado. Guarda nombre y precio del momento de la
 * compra: si el producto cambia de precio después, el pedido histórico no debe
 * moverse.
 */
export interface LineaPedido {
  productoId: string;
  varianteId: string;
  nombre: string;
  tamano: string;
  precioUnitario: number;
  cantidad: number;
}

export interface DireccionEnvio {
  calle: string;
  colonia: string;
  ciudad: string;
  estado: string;
  cp: string;
  pais: string;
}

export interface ClientePedido {
  nombre: string;
  email: string;
  telefono: string;
}

export type EstadoPedido = 'pagado';

export interface Pedido {
  id: string;
  stripeSessionId: string;
  stripePaymentIntentId: string;
  estado: EstadoPedido;
  creadoEn: string;
  cliente: ClientePedido;
  envio: DireccionEnvio;
  items: LineaPedido[];
  subtotal: number;
  envioCosto: number;
  total: number;
  moneda: 'MXN';
  /** Pedido creado sin Stripe, sólo para la demo. Desaparece con llaves reales. */
  simulado?: boolean;
}
