"use client";

import React from 'react';
import AdminHeader from './AdminHeader';
import AdminMenu from './AdminMenu';
import MensajeNotificacion from './MensajeNotificacion';

export default function AdminLayout({ children, titulo, mensaje, setMensaje }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader titulo={titulo} />
      
      <div className="flex">
        <AdminMenu />
        
        <main className="flex-1 p-6">
          {mensaje?.texto && (
            <MensajeNotificacion 
              mensaje={mensaje.texto} 
              tipo={mensaje.tipo} 
              onClose={() => setMensaje({ texto: '', tipo: '' })} 
            />
          )}
          
          <div className="bg-white rounded-lg shadow-md p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}