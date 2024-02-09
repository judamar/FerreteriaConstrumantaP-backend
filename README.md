# Ferre Construmanta API

Esta API en Node.js proporciona un conjunto de servicios para la gestión de una ferretería, abarcando desde la administración de usuarios hasta la gestión de productos, proveedores, reservas y ventas.

## Requisitos previos

Asegúrate de tener Node.js instalado en tu sistema antes de comenzar.

## Instalación

1. Clona este repositorio en tu máquina local:

   ```bash
   git clone https://github.com/judamar/FerreteriaConstrumantaP-backend.git FerreConstrumanta-API
   ```

2. Accede al directorio del proyecto:

   ```bash
   cd FerreConstrumanta-API
   ```

3. Instala las dependencias:
   ```bash
   npm install
   ```

## Configuración

Crea un archivo `.env` en el directorio raíz del proyecto con la siguiente configuración:

```env
PORT=3000
DB_DATABASE=[Tu nombre de base de datos]
DB_USERNAME=[Tu nombre de usuario de base de datos]
DB_HOST=[Tu host de base de datos]
DB_PASSWORD=[Tu contraseña de base de datos]
SSL_KEY="cacert-2023-08-22.pem"
IMGUR_CLIENT_ID=[Tu ID de cliente de Imgur para la API]
JWT_SECRET_KEY=[Tu clave secreta para JWT]
NODEMAILER_USER=[Tu email]
NODEMAILER_PASSWORD=[Tu contraseña de aplicacion]
```
## Uso
Iniciar el servidor en modo de desarrollo
```bash
npm run dev
```

El servidor estará disponible en http://localhost:3000 por defecto. 