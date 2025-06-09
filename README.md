# Solo Para Eva - Tienda de Productos de Limpieza Corporal

![Landing Page](https://github.com/Aaron3312/tienda-limpieza-corporal/blob/master/landingSoloEva.png?raw=true)

## 📋 Descripción

**Solo Para Eva** es una plataforma de comercio electrónico especializada en productos artesanales para el cuidado personal y la limpieza corporal. Nuestra tienda en línea ofrece una amplia gama de productos naturales elaborados con ingredientes de alta calidad, libres de químicos dañinos, respetuosos con la piel y con el medio ambiente.

La aplicación está desarrollada con tecnologías modernas de React y Next.js, proporcionando una experiencia de usuario fluida, responsive y optimizada para SEO.

## ✨ Características Principales

### 🛍️ Funcionalidades de E-commerce
- **Catálogo Completo**: Presentación detallada de productos organizados por categorías (Capilares, Corporales, Faciales, SPA, Kits Personalizados)
- **Sistema de Filtrado**: Filtros avanzados por categoría, precio y características
- **Carrito de Compras**: Gestión completa del carrito con persistencia
- **Páginas de Detalle**: Información detallada de cada producto con variantes y precios
- **Productos Relacionados**: Sugerencias inteligentes basadas en categorías

### 🎨 Diseño y UX
- **Diseño Responsive**: Experiencia optimizada para móviles, tablets y escritorio
- **Animaciones Fluidas**: Implementadas con Framer Motion
- **Tema Personalizable**: Sistema de colores dinámico configurable desde admin
- **Interfaz Moderna**: Componentes UI construidos con Radix UI y Tailwind CSS

### 🔧 Panel de Administración
- **Gestión de Productos**: CRUD completo para productos y categorías
- **Configuración de Colores**: Personalización del esquema de colores del sitio
- **Dashboard Analytics**: Métricas y estadísticas del negocio
- **Importación Masiva**: Herramientas para importar datos de productos
- **Autenticación**: Sistema seguro de login para administradores

### 🌐 Funcionalidades Adicionales
- **Sección "Nosotros"**: Información dinámica sobre la filosofía y valores de la marca
- **Testimonios**: Sistema de testimonios de clientes
- **Formulario de Contacto**: Canal directo para consultas y pedidos
- **SEO Optimizado**: Meta tags dinámicos y optimización para motores de búsqueda

![Productos](https://github.com/Aaron3312/tienda-limpieza-corporal/blob/master/ProductosSoloEva.png?raw=true)
![Nosotros](https://github.com/Aaron3312/tienda-limpieza-corporal/blob/master/NosotrosSoloEva.png?raw=true)

## 🛠️ Tecnologías Utilizadas

### Frontend
- **Next.js 15.2.4** - Framework React con SSR y optimizaciones
- **React 19** - Biblioteca de interfaces de usuario
- **TypeScript 5** - Tipado estático para JavaScript
- **Tailwind CSS 4** - Framework de CSS utilitario
- **Framer Motion 12.6.2** - Biblioteca de animaciones

### UI Components
- **Radix UI** - Componentes primitivos accesibles
- **Lucide React** - Iconografía moderna
- **Class Variance Authority** - Gestión de variantes de componentes

### Backend & Base de Datos
- **Firebase 11.7.3** - Backend as a Service
- **Firestore** - Base de datos NoSQL en tiempo real
- **Firebase Auth** - Sistema de autenticación

### Herramientas de Desarrollo
- **ESLint 9** - Linting de código
- **PostCSS** - Procesador de CSS
- **Git** - Control de versiones

### Hosting y Dominio
- **Namecheap** - Hosting web
- **soloparaeva.lat** - Dominio personalizado

## 📋 Requisitos del Sistema

- **Node.js** (versión 18.x o superior)
- **npm** o **yarn**
- **Git**
- Cuenta de **Firebase** (para funcionalidades backend)

## 🚀 Instalación y Configuración

### 1. Clonar el Repositorio
```bash
git clone https://github.com/Aaron3312/tienda-limpieza-corporal.git
cd tienda-limpieza-corporal
```

### 2. Instalar Dependencias
```bash
npm install
# o
yarn install
```

### 3. Configurar Variables de Entorno
Crear un archivo `.env.local` en la raíz del proyecto:
```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Other configurations
NEXT_PUBLIC_SITE_URL=https://soloparaeva.lat
```

### 4. Ejecutar en Desarrollo
```bash
npm run dev
# o
yarn dev
```

La aplicación estará disponible en [http://localhost:3000](http://localhost:3000)

## 📁 Estructura del Proyecto

```
tienda-limpieza-corporal/
├── src/
│   ├── app/                      # App Router de Next.js
│   │   ├── admin/               # Panel de administración
│   │   │   ├── colores/         # Gestión de colores
│   │   │   ├── configuracion/   # Configuración general
│   │   │   ├── dashboard/       # Dashboard principal
│   │   │   ├── import/          # Importación de datos
│   │   │   ├── login/           # Login de admin
│   │   │   └── productos/       # Gestión de productos
│   │   ├── carrito/             # Página del carrito
│   │   ├── contacto/            # Página de contacto
│   │   ├── nosotros/            # Página "Sobre Nosotros"
│   │   ├── productos/           # Catálogo y detalles
│   │   └── layout.tsx           # Layout principal
│   ├── components/              # Componentes React
│   │   ├── admin/               # Componentes del admin
│   │   ├── layout/              # Header, Footer
│   │   ├── productos/           # Componentes de productos
│   │   ├── ui/                  # Componentes UI base
│   │   └── testimonios/         # Componentes de testimonios
│   ├── context/                 # Contextos de React
│   ├── data/                    # Datos estáticos (JSON)
│   ├── lib/                     # Configuraciones y utilidades
│   ├── services/                # Servicios de Firebase
│   ├── types/                   # Definiciones de TypeScript
│   └── utils/                   # Funciones utilitarias
├── public/                      # Archivos estáticos
│   └── images/                  # Imágenes de productos
├── components.json              # Configuración de shadcn/ui
├── next.config.ts               # Configuración de Next.js
├── tailwind.config.js           # Configuración de Tailwind
└── tsconfig.json               # Configuración de TypeScript
```

## 🛠️ Scripts Disponibles

```bash
# Desarrollo con Turbopack
npm run dev

# Construcción para producción
npm run build

# Iniciar servidor de producción
npm start

# Linting del código
npm run lint
```

## 🚀 Despliegue

### Construcción para Producción
```bash
npm run build
npm start
```

### Configuración de Firebase
1. Crear un proyecto en [Firebase Console](https://console.firebase.google.com/)
2. Habilitar Firestore Database
3. Configurar reglas de seguridad
4. Obtener las credenciales y actualizar `.env.local`

### Hosting con Namecheap
La aplicación está configurada para desplegarse en Namecheap con el dominio `soloparaeva.lat`.

## 🔒 Funcionalidades de Seguridad

- **Autenticación Firebase**: Sistema seguro de login para administradores
- **Reglas de Firestore**: Control de acceso a datos sensibles
- **Variables de Entorno**: Configuración segura de credenciales
- **Validación de Datos**: Validación tanto en frontend como backend

## 📈 SEO y Performance

- **SSR/SSG**: Server-Side Rendering para mejor SEO
- **Meta Tags Dinámicos**: SEO optimizado por página
- **Optimización de Imágenes**: Next.js Image Optimization
- **Lazy Loading**: Carga perezosa de componentes
- **Bundle Optimization**: Código dividido automáticamente

## 🏪 Categorías de Productos

1. **Productos Capilares**: Jabones y shampoos sólidos naturales
2. **Productos Corporales**: Jabones artesanales, exfoliantes, cremas
3. **Productos Faciales**: Cremas hidratantes, exfoliantes, bálsamos
4. **Productos SPA**: Bombas efervescentes, sales aromáticas
5. **Kits Personalizados**: Combos especiales y regalos personalizados

## 👥 Contribución

Para contribuir al proyecto:

1. Fork el repositorio
2. Crear una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Añadir nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crear un Pull Request

## 📞 Soporte y Contacto

- **Desarrollador Principal**: Aaron Hernández Jiménez
- **Email**: aypierre223@gmail.com
- **Sitio Web**: [soloparaeva.lat](https://soloparaeva.lat)

## 📄 Licencia

Todos los derechos reservados © Solo Para Eva 2025.

---

**Hecho con ❤️ por Aaron Hernández Jiménez**