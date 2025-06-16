Guía:

1. Levantar el docker

```bash
docker compose up -d
```

2. Correr el backend

```bash
npm run start:dev
```

3. Cargar la base de datos con lo básico

```bash
cat init.sql | docker exec -i postgres-db psql -U postgres -d users
```
