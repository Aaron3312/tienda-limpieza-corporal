# Solo Para Eva

![Landing Page](https://github.com/Aaron3312/tienda-limpieza-corporal/blob/master/landingSoloEva.png?raw=true)

## Descripción

Solo Para Eva es una tienda en línea dedicada a productos artesanales para el cuidado personal. Nuestra plataforma ofrece una amplia gama de productos naturales elaborados con ingredientes de alta calidad, libres de químicos dañinos, respetuosos con la piel y con el medio ambiente.

## Características

- **Catálogo de Productos**: Presentación detallada de productos organizados por categorías (Capilares, Corporales, Faciales, SPA, Kits Personalizados).
- **Diseño Responsive**: Experiencia de usuario optimizada para dispositivos móviles y de escritorio.
- **Filtrado y Ordenación**: Funcionalidad para filtrar productos por categoría y ordenar por relevancia, precio, etc.
- **Páginas de Detalle**: Información detallada de cada producto, incluyendo presentaciones, variedades y precios.
- **Sección de Testimonios**: Opiniones de clientes satisfechos.
- **Página "Sobre Nosotros"**: Información sobre la filosofía y valores de la marca.
- **Formulario de Contacto**: Canal directo para consultas y pedidos.

![Productos](https://github.com/Aaron3312/tienda-limpieza-corporal/blob/master/ProductosSoloEva.png?raw=true)
![Nosotros](https://github.com/Aaron3312/tienda-limpieza-corporal/blob/master/NosotrosSoloEva.png?raw=true)

## Tecnologías Utilizadas

- **Frontend**: React.js, Next.js
- **Estilos**: CSS/SCSS con componentes estilizados
- **Hosting**: Namecheap
- **Dominio**: soloparaeva.lat
- **Optimización de Imágenes**: Next.js Image Optimization
- **Gestión de Estado**: React Context API / Redux
- **Formularios**: React Hook Form

## Requisitos

- Node.js (versión 14.x o superior)
- npm o yarn
- Git

## Instalación

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/soloparaeva.git
   cd soloparaeva
   ```

2. Instalar dependencias:
   ```bash
   npm install
   # o
   yarn install
   ```

3. Crear un archivo `.env.local` con las variables de entorno necesarias:
   ```
   NEXT_PUBLIC_API_URL=your_api_url
   # Otras variables de entorno
   ```

4. Iniciar el servidor de desarrollo:
   ```bash
   npm run dev
   # o
   yarn dev
   ```

5. Abrir [http://localhost:3000](http://localhost:3000) en el navegador para ver la aplicación.

## Estructura del Proyecto

```
soloparaeva/
├── components/          # Componentes React reutilizables
│   ├── Layout/          # Componentes de diseño (Header, Footer, etc.)
│   ├── ProductCard/     # Tarjeta de producto
│   ├── Filters/         # Componentes de filtrado
│   └── UI/              # Componentes de UI generales
├── pages/               # Páginas de Next.js
│   ├── index.js         # Página principal
│   ├── productos/       # Listado de productos
│   ├── productos/[id].js # Página de detalle de producto
│   ├── nosotros.js      # Página "Sobre Nosotros"
│   └── contacto.js      # Página de contacto
├── public/              # Archivos estáticos
│   ├── images/          # Imágenes
│   └── fonts/           # Fuentes
├── styles/              # Archivos de estilos
├── utils/               # Utilidades y helpers
├── contexts/            # Contextos de React
├── hooks/               # Custom hooks
├── services/            # Servicios y APIs
└── config/              # Archivos de configuración
```

## Despliegue

### Producción

1. Construir la aplicación para producción:
   ```bash
   npm run build
   # o
   yarn build
   ```

2. Iniciar el servidor de producción:
   ```bash
   npm start
   # o
   yarn start
   ```

### Hosting con Namecheap

La aplicación está alojada en Namecheap con el dominio `soloparaeva.lat`.

## SEO y Rendimiento

- Implementación de meta etiquetas para SEO
- Optimización de imágenes mediante Next.js Image
- Lazy loading para componentes y rutas
- SSR (Server-Side Rendering) para mejor rendimiento y SEO

## Mantenimiento

### Actualización de Productos

Para actualizar la información de productos:

1. Modificar los datos en la fuente correspondiente (archivos JSON)
2. Ejecutar la compilación si es necesario
3. Desplegar los cambios

## Colaboradores

- [Aaron Hernandez Jimenez] - Desarrollador principal

## Licencia

Todos los derechos reservados © Solo Para Eva 2025.

---

Para cualquier consulta relacionada con el desarrollo o mantenimiento, contactar a [aypierre223@gmail.com]
