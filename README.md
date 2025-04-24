# 🧾 Microservicio: Delivery (Zonas y Búsqueda por Proximidad)

Este microservicio gestiona zonas de entrega y permite asignar repartidores según su proximidad o zona.

---

## 📦 Endpoints

### 🔹 Zonas de Entrega

#### ▶ `POST /zone`

Crea una nueva zona de entrega.

```json
Request:
{
  "name": "Zona Centro",
  "location": {
    "lat": 31.4,
    "lng": 64.2
  },
  "radius": 10
}

Response:
{
  "id": 1,
  "name": "Zona Centro",
  "location": {
    "lat": 31.4,
    "lng": 64.2
  },
  "radius": 10
}
```

#### 📄 `GET /zone`

Obtiene todas las zonas de entrega.

```json
Response:
[
  {
    "id": 1,
    "name": "Zona Centro",
    "location": {
      "lat": 31.4,
      "lng": 64.2
    },
    "radius": 10
  }
]
```

#### 📄 `GET /zone/:id`

Obtiene una zona específica por ID.

#### ✏ `PUT /zone/:id`

Actualiza completamente una zona.

#### 🛠 `PATCH /zone/:id`

Actualiza parcialmente una zona (ej: sólo el radio).

#### ❌ `DELETE /zone/:id`

Elimina una zona.

```json
Response:
{
  "message": "Zone deleted"
}
```

---

### 🔹 Repartidores

#### ▶ `POST /delivery`

Crea un repartidor con su ubicación actual.

```json
Request:
{
  "personId": 2,
  "location": {
    "lat": 31.4,
    "lng": 64.2
  },
  "radius": 5
}

Response:
{
  "id": 1,
  "personId": 2,
  "location": {
    "lat": 31.4,
    "lng": 64.2
  },
  "radius": 5,
  "status": "available"
}
```

#### ✏ `PUT /delivery/:id/location`

Actualiza la ubicación del repartidor.

#### 🛠 `PUT /delivery/:id/status`

Actualiza el estado (`available`, `in_route`, etc.).

---

### 🔎 Búsquedas

#### 🧭 `GET /delivery/findByProximity`

Busca los repartidores más cercanos a una ubicación dada.

```json
Request:
{
  "location": {
    "lat": 31.4,
    "lng": 64.2
  },
  "radius": 10
}
```

#### 📄 `GET /delivery/findByZone`

Busca repartidores asociados a una zona específica.

```json
Request:
{
  "zoneId": 1
}
```

---

### 🔗 Asociación entre Repartidores y Zonas

#### ▶ `POST /delivery/:id/assignZone`

Asocia un repartidor a una o más zonas.

```json
Request:
{
  "zoneIds": [1, 2]
}
```

#### 📄 `GET /delivery/:id/zones`

Obtiene todas las zonas asociadas a un repartidor.

#### ❌ `DELETE /delivery/:id/zone/:zoneId`

Desasocia una zona del repartidor.

```json
Response:
{
  "message": "Zone removed from delivery"
}
```

#### ❌ `DELETE /delivery/:id`

Elimina un repartidor.

```json
Response:
{
  "message": "Delivery deleted"
}
```

---

## 📌 Descripción Adicional

- **Zonas de entrega:** Representan áreas con nombre, ubicación (lat/lng) y radio.
- **Asignación de repartidores:** Un repartidor puede estar en múltiples zonas.
- **Búsqueda por proximidad:** Asigna el repartidor más cercano.
- **Búsqueda por zona:** Filtra por zonas específicas.

---
