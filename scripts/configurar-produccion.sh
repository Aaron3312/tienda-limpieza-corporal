#!/usr/bin/env bash
# Deja Stripe y Vercel listos para producción. Requiere `stripe` y `vercel`
# con sesión iniciada, y .env.local con STRIPE_SECRET_KEY.
#
#   bash scripts/configurar-produccion.sh
#
# Hace tres cosas, todas idempotentes:
#   1. Registra (o reemplaza) el webhook de Stripe apuntando a producción.
#   2. Sube STRIPE_SECRET_KEY a Vercel (Production y Preview).
#   3. Sube el secreto del webhook a Vercel (Production).
#
# Después hay que volver a desplegar para que Vercel tome las variables.
set -euo pipefail

SITIO="${SITIO:-https://www.soloparaeva.com}"
URL_WEBHOOK="$SITIO/api/webhooks/stripe"

leer_env() {
  grep -E "^$1=" .env.local | head -1 | cut -d= -f2- | tr -d '"' | tr -d "'"
}

echo "→ Webhook de Stripe en $URL_WEBHOOK"
EXISTENTE=$(stripe webhook_endpoints list --limit 50 | python3 -c "
import sys, json
for e in json.load(sys.stdin)['data']:
    if e['url'] == '$URL_WEBHOOK':
        print(e['id']); break")
if [ -n "$EXISTENTE" ]; then
  echo "  ya existía ($EXISTENTE); se reemplaza porque el secreto sólo se muestra al crearlo"
  stripe webhook_endpoints delete "$EXISTENTE" >/dev/null
fi
RESPUESTA=$(stripe webhook_endpoints create \
  --url "$URL_WEBHOOK" \
  --enabled-events checkout.session.completed \
  --description "Solo Para Eva - produccion (Vercel)")
WEBHOOK_SECRET=$(echo "$RESPUESTA" | python3 -c "import sys, json; print(json.load(sys.stdin)['secret'])")
echo "  creado. Secreto: ${WEBHOOK_SECRET:0:10}…"

STRIPE_KEY=$(leer_env STRIPE_SECRET_KEY)
if [ -z "$STRIPE_KEY" ]; then
  echo "✗ Falta STRIPE_SECRET_KEY en .env.local" >&2
  exit 1
fi
case "$STRIPE_KEY" in
  sk_test_*) echo "  ⚠ La llave es de PRUEBA (sk_test). Para cobrar de verdad, activa la cuenta en Stripe y cambia a sk_live_ en Vercel." ;;
esac

subir() { # nombre valor entorno
  vercel env rm "$1" "$3" -y >/dev/null 2>&1 || true
  printf '%s' "$2" | vercel env add "$1" "$3" >/dev/null
  echo "  $1 → $3"
}

echo "→ Variables en Vercel"
subir STRIPE_SECRET_KEY "$STRIPE_KEY" production
subir STRIPE_SECRET_KEY "$STRIPE_KEY" preview
subir STRIPE_WEBHOOK_SECRET "$WEBHOOK_SECRET" production

RESEND=$(leer_env RESEND_API_KEY)
if [ -n "$RESEND" ]; then
  subir RESEND_API_KEY "$RESEND" production
  subir RESEND_API_KEY "$RESEND" preview
  FROM=$(leer_env RESEND_FROM); [ -n "$FROM" ] && subir RESEND_FROM "$FROM" production
else
  echo "  (sin RESEND_API_KEY en .env.local: los pedidos se crean pero no salen correos)"
fi

echo
echo "Listo. Ahora despliega: vercel --prod   (o haz merge a master si Vercel está conectado a GitHub)"
echo "Los previews no reciben webhooks (URL variable): ahí la página de éxito mostrará 'registrando pedido' sin cerrar."
