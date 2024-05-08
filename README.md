## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.



## Development
Pasos para levantar la app en desarrollo

1. levantar la base de datos
```
docker compose up -i
```

## Prisma commands

* inicia el proyecto de prisma 
```
npx prisma init 
```




2. Crear una copia de el .env.template y renombrarlo a .env
3. Reemplazar las variables de entorno 
4. Instalar los paquetes ```npm i```
5. Iniciar el servidor de desarrollo ```npm run dev```
6. Ejeutar los comandos de prisma:
    * agrega la base de datos ```npx prisma migrate dev```
    * migración por cada modificación de tablas```npx prisma generate```
7. Ejecutar el endpoint seed (localhost:3000/api/seed) para crear los datos de la base de datos local

8. Ejecutar el siguiente comando para generar AUTH_SECRET 
```
npx auth secret
```

## Nota: credenciales por defecto del seed
__usuario:__ test@gmail.com
__password:__ 123456




2. Production 


...


3. Stage 

...
