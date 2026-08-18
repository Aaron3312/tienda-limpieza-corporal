'use client';

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { LineaCarrito, LineaCarritoResuelta, Producto } from '@/types';
import { MAX_POR_LINEA, calcularEnvio } from '@/lib/comercio';

const CLAVE_ALMACEN = 'soloparaeva.carrito.v1';

interface CartContextType {
  lineas: LineaCarrito[];
  /** Suma de cantidades, para el contador del header. */
  totalPiezas: number;
  hidratado: boolean;
  agregar: (productoId: string, varianteId: string, cantidad?: number) => void;
  cambiarCantidad: (productoId: string, varianteId: string, cantidad: number) => void;
  quitar: (productoId: string, varianteId: string) => void;
  vaciar: () => void;
  /** Cruza el carrito con el catálogo vivo. Los precios nunca salen de aquí hacia el pago. */
  resolver: (productos: Producto[]) => {
    items: LineaCarritoResuelta[];
    subtotal: number;
    envio: number;
    total: number;
  };
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart debe usarse dentro de CartProvider');
  return ctx;
};

const mismaLinea = (l: LineaCarrito, productoId: string, varianteId: string) =>
  l.productoId === productoId && l.varianteId === varianteId;

const acotar = (n: number) => Math.max(1, Math.min(MAX_POR_LINEA, Math.trunc(n)));

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lineas, setLineas] = useState<LineaCarrito[]>([]);
  // Evita el desajuste de hidratación: en el primer render del servidor el
  // carrito siempre está vacío, y localStorage llega después.
  const [hidratado, setHidratado] = useState(false);

  useEffect(() => {
    try {
      const guardado = window.localStorage.getItem(CLAVE_ALMACEN);
      if (guardado) {
        const parseado = JSON.parse(guardado);
        if (Array.isArray(parseado)) setLineas(parseado.filter((l) => l?.productoId && l?.varianteId));
      }
    } catch {
      // Un carrito corrupto no debe tumbar la tienda.
    }
    setHidratado(true);
  }, []);

  useEffect(() => {
    if (!hidratado) return;
    try {
      window.localStorage.setItem(CLAVE_ALMACEN, JSON.stringify(lineas));
    } catch {
      // Modo privado de Safari, por ejemplo.
    }
  }, [lineas, hidratado]);

  const agregar = useCallback((productoId: string, varianteId: string, cantidad = 1) => {
    setLineas((prev) => {
      const existente = prev.find((l) => mismaLinea(l, productoId, varianteId));
      if (!existente) return [...prev, { productoId, varianteId, cantidad: acotar(cantidad) }];
      return prev.map((l) =>
        mismaLinea(l, productoId, varianteId) ? { ...l, cantidad: acotar(l.cantidad + cantidad) } : l,
      );
    });
  }, []);

  const cambiarCantidad = useCallback((productoId: string, varianteId: string, cantidad: number) => {
    setLineas((prev) =>
      prev.map((l) => (mismaLinea(l, productoId, varianteId) ? { ...l, cantidad: acotar(cantidad) } : l)),
    );
  }, []);

  const quitar = useCallback((productoId: string, varianteId: string) => {
    setLineas((prev) => prev.filter((l) => !mismaLinea(l, productoId, varianteId)));
  }, []);

  const vaciar = useCallback(() => setLineas([]), []);

  const resolver = useCallback(
    (productos: Producto[]) => {
      const items: LineaCarritoResuelta[] = lineas.map((linea) => {
        const producto = productos.find((p) => p.id === linea.productoId);
        const variante = producto?.variantes?.find((v) => v.id === linea.varianteId);

        if (!producto || !variante) {
          return {
            ...linea,
            nombre: producto?.nombre ?? 'Producto no disponible',
            tamano: '',
            precioUnitario: 0,
            imagen: producto?.imagen ?? '',
            disponible: false,
          };
        }

        return {
          ...linea,
          nombre: producto.nombre,
          tamano: variante.tamano,
          precioUnitario: Number(variante.precio) || 0,
          imagen: producto.imagen,
          disponible: true,
        };
      });

      const subtotal = items
        .filter((i) => i.disponible)
        .reduce((suma, i) => suma + i.precioUnitario * i.cantidad, 0);
      const envio = calcularEnvio(subtotal);

      return { items, subtotal, envio, total: subtotal + envio };
    },
    [lineas],
  );

  const totalPiezas = useMemo(() => lineas.reduce((s, l) => s + l.cantidad, 0), [lineas]);

  const valor = useMemo(
    () => ({ lineas, totalPiezas, hidratado, agregar, cambiarCantidad, quitar, vaciar, resolver }),
    [lineas, totalPiezas, hidratado, agregar, cambiarCantidad, quitar, vaciar, resolver],
  );

  return <CartContext.Provider value={valor}>{children}</CartContext.Provider>;
}
