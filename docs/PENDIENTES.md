# Pendientes

## Para dejar el e-commerce cobrando en producción

- [ ] Correr `bash scripts/configurar-produccion.sh` (registra el webhook de Stripe en producción y sube las llaves a Vercel). Requiere `stripe login` y `vercel login`.
- [ ] Desplegar a producción (merge de `feat/ecommerce-demo` a `master` o `vercel --prod`).
- [ ] Activar la cuenta de Stripe (hoy es sandbox, `charges_enabled: false`) y pasar a llaves `sk_live_`.
- [ ] Resend: crear cuenta, verificar el dominio `soloparaeva.lat` o `soloparaeva.com`, poner `RESEND_API_KEY` y `RESEND_FROM` en `.env.local` y Vercel. Sin esto los pedidos se crean pero no salen correos.
- [ ] Google Cloud → pantalla de consentimiento OAuth: cambiar el nombre público `project-700460250662` por "Solo Para Eva" (es lo que ve la clienta en la ventana de Google).
- [ ] Dar rol admin a la dueña: `npm run admin -- grant altardelcielogp@gmail.com` (entra con Google en `/admin/login`).
- [ ] Borrar el pedido de prueba "Jenny Rosen" (stripe@example.com) desde Firestore, o cancelarlo desde `/admin/pedidos`.

## Panel de administración (sin relación con el cobro)

- [ ] `/admin/import` sólo debe estar disponible en desarrollo (el menú ya lo oculta en producción; falta bloquear la ruta).
- [ ] `/admin/configuracion`: revisar que la configuración se aplique a todos los textos del sitio.
- [ ] `/admin/colores`: el cambio de colores no se refleja en botones y fondos.
- [ ] `/admin/productos`: mejorar UX/UI y vista móvil; verificar alta, edición y borrado.

## Ideas siguientes

- OXXO como método de pago (no está disponible en la cuenta de Stripe actual).
- Inventario por variante (hoy sólo hay tope de 10 piezas por línea).
- Reembolsos desde el panel (hoy se hacen en el dashboard de Stripe).
