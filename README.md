
# Prueba Dazlabs

Este proyecto consta de un CRUD que maneja datos de razas de gatos.
Se divide en dos carpetas una que contiene el frontend y la otra el backend


## Installation

Descargar usando git clone

```bash
  git clone https://github.com/PeterMonkey/dazlabs.git

```
## Levantar la Base de Datos
Este proyecto utilizar MongoDB como base de datos,
puedes levantar un servidor en tu equipo o usar un contenedor docker
```bash
  docker run -d --name my-mongo-container -p 27017:27017 mongo
```
Y la url de coneccion sera:
```bash
  mongodb://localhost:27017/
```

## Configuracion del Backend
```bash
cd dazlabs-back
npm install
```
Debes configurar las variables de entorno como se muestran en el archivo .env.example

#### Esta aplicacion consume una API donde obtiene la informacion sobre los gatos.
[API](https://rapidapi.com/myapos--FqlEzvrlv/api/cat-breeds/playground/apiendpoint_acfdc463-9254-40b5-9326-1e1e6eb2485c)
registrese y cree su api-key


## Configuracion del Frontend
```bash
cd dazlabs-front
npm install
```
### Crea un archivo config.ts dentro de src.
```typescript
export const BACKEND_URI = 'http://localhost:8080'
```
    
## Tech Stack

**Client:** React, TailwindCSS, TypeScript

**Server:** Node, Express, MongoDB

