"use client"
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import CustomImage from '@/components/CustomImage';

// Define the CartItem type
interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export default function CartPage() {
  // Sample cart items - in a real application, you would get these from localStorage or a state management solution
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading cart items from storage
    // In a real application, you'd fetch from localStorage or an API
    setTimeout(() => {
      setCartItems([
        {
          id: 1,
          name: "Jabón de Lavanda",
          price: 12.99,
          quantity: 2,
          image: "/images/jabon0.jpeg"
        },
        {
          id: 2,
          name: "Crema Hidratante Natural",
          price: 24.95,
          quantity: 1,
          image: "/images/jabon1.jpeg"
        },
        {
          id: 3,
          name: "Aceite Esencial de Rosas",
          price: 18.50,
          quantity: 1,
          image: "/images/jabon2.jpeg"
        }
      ]);
      setLoading(false);
    }, 300);
  }, []);

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 0 ? 4.99 : 0;
  const total = subtotal + shipping;

  // Handle quantity change
  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  // Handle item removal
  const removeItem = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  return (
    <div className="bg-white">
      {/* Header banner */}
      <div className="relative bg-indigo-800 h-40">
        <div className="absolute inset-0">
          <CustomImage
            src="/images/lavandaFondo.jpeg"
            alt="Productos naturales para el cuidado personal"
            width={1920}
            height={400}
            className="w-full h-full object-cover object-center opacity-80"
          />
          <div className="absolute inset-0 bg-indigo-700 mix-blend-multiply" />
        </div>
        <div className="relative max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 flex items-center h-full">
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Tu Carrito de Compras
          </h1>
        </div>
      </div>

      {/* Cart content */}
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-indigo-600 text-lg">Cargando tu carrito...</div>
          </div>
        ) : cartItems.length === 0 ? (
          <div className="text-center py-16">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            <h2 className="mt-2 text-lg font-medium text-gray-900">Tu carrito está vacío</h2>
            <p className="mt-1 text-sm text-gray-500">
              Aún no has agregado productos a tu carrito.
            </p>
            <div className="mt-6">
              <Link href="/productos" className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Explorar productos
              </Link>
            </div>
          </div>
        ) : (
          <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
            <div className="lg:col-span-7">
              <h2 className="text-xl font-medium text-gray-900">Artículos en tu carrito</h2>

              <ul role="list" className="border-t border-b border-gray-200 divide-y divide-gray-200 mt-6">
                {cartItems.map((product) => (
                  <li key={product.id} className="flex py-6 sm:py-8">
                    <div className="flex-shrink-0 relative h-24 w-24 sm:h-32 sm:w-32 rounded-md overflow-hidden border border-gray-200">
                      <CustomImage
                        src={product.image}
                        alt={product.name}
                        width={150}
                        height={150}
                        className="w-full h-full object-center object-cover"
                      />
                    </div>

                    <div className="ml-4 flex-1 flex flex-col sm:ml-6">
                      <div>
                        <div className="flex justify-between">
                          <h3 className="text-base font-medium text-gray-900">
                            <Link href={`/productos/${product.id}`} className="hover:text-indigo-600">
                              {product.name}
                            </Link>
                          </h3>
                          <p className="ml-4 text-base font-medium text-gray-900">
                            €{product.price.toFixed(2)}
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 flex-1 flex items-end justify-between">
                        <div className="flex items-center">
                          <button
                            type="button"
                            onClick={() => updateQuantity(product.id, product.quantity - 1)}
                            className="text-gray-500 hover:text-indigo-600 p-1"
                          >
                            <span className="sr-only">Reducir cantidad</span>
                            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                              <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
                            </svg>
                          </button>

                          <span className="text-base font-medium text-gray-700 mx-2">
                            {product.quantity}
                          </span>

                          <button
                            type="button"
                            onClick={() => updateQuantity(product.id, product.quantity + 1)}
                            className="text-gray-500 hover:text-indigo-600 p-1"
                          >
                            <span className="sr-only">Aumentar cantidad</span>
                            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeItem(product.id)}
                          className="ml-4 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          <span>Eliminar</span>
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Order summary */}
            <div className="mt-10 lg:mt-0 lg:col-span-5">
              <div className="bg-gray-50 rounded-lg px-4 py-6 sm:p-6 lg:p-8">
                <h2 className="text-lg font-medium text-gray-900">Resumen de tu orden</h2>

                <div className="mt-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600">Subtotal</p>
                    <p className="text-sm font-medium text-gray-900">€{subtotal.toFixed(2)}</p>
                  </div>

                  <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                    <p className="text-sm text-gray-600">Envío</p>
                    <p className="text-sm font-medium text-gray-900">€{shipping.toFixed(2)}</p>
                  </div>

                  <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                    <p className="text-base font-medium text-gray-900">Total</p>
                    <p className="text-base font-medium text-gray-900">€{total.toFixed(2)}</p>
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    type="button"
                    className="w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Proceder al pago
                  </button>
                </div>

                <div className="mt-6 text-sm text-center">
                  <p className="text-gray-500">
                    o{' '}
                    <Link href="/productos" className="text-indigo-600 font-medium hover:text-indigo-500">
                      Continuar comprando
                    </Link>
                  </p>
                </div>
              </div>

              {/* Secure payment notice */}
              <div className="mt-6 bg-white border border-gray-200 rounded-lg p-4">
                <div className="flex items-center">
                  <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <p className="ml-2 text-sm text-gray-500">
                    Pago seguro garantizado. Tus datos están protegidos.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}