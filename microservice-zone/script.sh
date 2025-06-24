#!/bin/bash

# Login y servicios
LOGIN_URL="http://localhost:3001/login"
API_URL="http://localhost:3000"
EMAIL="matias@gmail.com"
PASSWORD="matias"
HEADER_JSON="Content-Type: application/json"

echo ">>> Iniciando sesión con usuario $EMAIL..."
access_token=$(curl -s -X POST $LOGIN_URL \
  -H "$HEADER_JSON" \
  -d '{
    "email": "'"$EMAIL"'",
    "password": "'"$PASSWORD"'"
  }' | jq -r '.accessToken')

if [[ -z "$access_token" || "$access_token" == "null" ]]; then
  echo "❌ ERROR: No se pudo obtener el token de acceso."
  exit 1
fi

AUTH_HEADER="Authorization: Bearer $access_token"
echo "✅ Login exitoso. Token obtenido."

# Crear zonas
echo ">>> Creando zonas..."
zone1=$(curl -s -X POST $API_URL/zone -H "$AUTH_HEADER" -H "$HEADER_JSON" -d '{
  "name": "Zona Centro",
  "location": { "lat": -31.4, "lng": -64.2 },
  "radius": 10
}' | jq -r '.id')

zone2=$(curl -s -X POST $API_URL/zone -H "$AUTH_HEADER" -H "$HEADER_JSON" -d '{
  "name": "Zona Norte",
  "location": { "lat": -31.5, "lng": -64.3 },
  "radius": 15
}' | jq -r '.id')

echo "Zona 1 ID: $zone1"
echo "Zona 2 ID: $zone2"

# Crear delivery
echo ">>> Creando repartidor..."
delivery=$(curl -s -X POST $API_URL/delivery -H "$AUTH_HEADER" -H "$HEADER_JSON" -d '{
  "personId": 2,
  "location": { "lat": -31.4, "lng": -64.2 },
  "radius": 5
}' | jq -r '.id')

echo "Delivery ID: $delivery"

# Actualizar ubicación
echo ">>> Actualizando ubicación..."
curl -s -X PUT $API_URL/delivery/$delivery/location -H "$AUTH_HEADER" -H "$HEADER_JSON" -d '{
  "location": { "lat": -31.41, "lng": -64.23 }
}' | jq

# Cambiar estado
echo ">>> Cambiando estado a 'in_route'..."
curl -s -X PUT $API_URL/delivery/$delivery/status -H "$AUTH_HEADER" -H "$HEADER_JSON" -d '{
  "status": "in_route"
}' | jq

# Buscar por proximidad
echo ">>> Buscar por proximidad..."
curl -s -X GET $API_URL/delivery/findByProximity -H "$AUTH_HEADER" -H "$HEADER_JSON" -d '{
  "location": { "lat": -31.4, "lng": -64.2 },
  "radius": 10
}' | jq

# Buscar por zona
echo ">>> Buscar por zona..."
curl -s -X GET $API_URL/delivery/findByZone -H "$AUTH_HEADER" -H "$HEADER_JSON" -d '{
  "zoneId": '"$zone1"'
}' | jq

# Asignar zonas
echo ">>> Asignando zonas al delivery..."
curl -s -X POST $API_URL/delivery/$delivery/assignZone -H "$AUTH_HEADER" -H "$HEADER_JSON" -d '{
  "zoneIds": ['"$zone1"', '"$zone2"']
}' | jq

# Ver zonas del delivery
echo ">>> Zonas del delivery..."
curl -s $API_URL/delivery/$delivery/zones -H "$AUTH_HEADER" | jq

# Quitar zona
echo ">>> Quitando zona $zone1..."
curl -s -X DELETE $API_URL/delivery/$delivery/zone/$zone1 -H "$AUTH_HEADER" | jq

# Eliminar delivery
echo ">>> Eliminando delivery..."
curl -s -X DELETE $API_URL/delivery/$delivery -H "$AUTH_HEADER" | jq

# Eliminar zonas
echo ">>> Eliminando zonas..."
curl -s -X DELETE $API_URL/zone/$zone1 -H "$AUTH_HEADER" | jq
curl -s -X DELETE $API_URL/zone/$zone2 -H "$AUTH_HEADER" | jq

echo "✅ Script completado exitosamente"
