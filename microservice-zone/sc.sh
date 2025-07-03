#!/bin/bash

# --- Configuración ---
# URL para el servicio de autenticación (puerto 3001)
LOGIN_URL="http://localhost:3001/login"
# URL base para los servicios de Delivery/Zonas (puerto 3000, con prefijo /api/v1)
API_URL="http://localhost:3000/api/v1"
EMAIL="matias@gmail.com"
PASSWORD="matias"
HEADER_JSON="Content-Type: application/json"

# --- Login para obtener el token ---
echo ">>> Iniciando sesión con usuario $EMAIL..."
access_token=$(curl -s -X POST "$LOGIN_URL" \
  -H "$HEADER_JSON" \
  -d "{\"email\": \"$EMAIL\", \"password\": \"$PASSWORD\"}" | jq -r '.accessToken')

if [[ -z "$access_token" || "$access_token" == "null" ]]; then
  echo "❌ ERROR: No se pudo obtener el token de acceso. Verifica credenciales y que el servicio de autenticación esté corriendo."
  exit 1
fi

AUTH_HEADER="Authorization: Bearer $access_token"
echo "✅ Login exitoso. Token obtenido."

# --- Crear Zonas ---
echo ">>> Creando zonas..."

zone1_response=$(curl -s -X POST "$API_URL/zone" \
  -H "$AUTH_HEADER" \
  -H "$HEADER_JSON" \
  -d "{\"name\": \"Zona Centro\", \"location\": { \"lat\": -31.4, \"lng\": -64.2 }, \"radius\": 10}")
zone1=$(echo "$zone1_response" | jq -r '.id')

zone2_response=$(curl -s -X POST "$API_URL/zone" \
  -H "$AUTH_HEADER" \
  -H "$HEADER_JSON" \
  -d "{\"name\": \"Zona Norte\", \"location\": { \"lat\": -31.5, \"lng\": -64.3 }, \"radius\": 15}")
zone2=$(echo "$zone2_response" | jq -r '.id')

echo "Zona 1 ID: $zone1"
echo "Zona 2 ID: $zone2"

# Verificar si se obtuvieron IDs de zona válidos
if [[ -z "$zone1" || "$zone1" == "null" || -z "$zone2" || "$zone2" == "null" ]]; then
  echo "❌ ERROR: No se pudieron crear zonas o capturar sus IDs."
  echo "Zona 1 Raw Response: $zone1_response"
  echo "Zona 2 Raw Response: $zone2_response"
  exit 1
fi

echo "✅ Zonas creadas exitosamente."
