"use client";

import React, { useState, useEffect } from 'react';

export default function MensajeNotificacion({ mensaje, tipo = 'exito', onClose, duracion = 5000 }) {
  const [visible, setVisible] = useState(true);
  
  useEffect(() => {
    if (duracion > 0) {
      const timer = setTimeout(() => {
        setVisible(false);
        if (onClose) onClose();
      }, duracion);
      
      return () => clearTimeout(timer);
    }
  }, [duracion, onClose]);
  
  if (!visible) return null;
  
  // Determinar los estilos basados en el tipo de notificación
  const estilos = {
    exito: {
      background: '#d4edda',
      color: '#155724',
      borderColor: '#c3e6cb'
    },
    error: {
      background: '#f8d7da',
      color: '#721c24',
      borderColor: '#f5c6cb'
    },
    info: {
      background: '#d1ecf1',
      color: '#0c5460',
      borderColor: '#bee5eb'
    },
    advertencia: {
      background: '#fff3cd',
      color: '#856404',
      borderColor: '#ffeeba'
    }
  };
  
  const estilo = estilos[tipo] || estilos.info;
  
  return (
    <div 
      className="mb-6 px-4 py-3 rounded relative"
      style={{
        backgroundColor: estilo.background,
        color: estilo.color,
        borderLeft: `4px solid ${estilo.borderColor}`
      }}
      role="alert"
    >
      <span className="block sm:inline">{mensaje}</span>
      
      {onClose && (
        <button
          onClick={() => {
            setVisible(false);
            onClose();
          }}
          className="absolute top-0 bottom-0 right-0 px-4 py-3"
        >
          <svg
            className="h-4 w-4"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      )}
    </div>
  );
}