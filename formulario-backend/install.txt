# Gestor de Preguntas - Backend


Este proyecto es el backend para una aplicación de gestión de preguntas. Proporciona una API REST para manejar categorías, preguntas, niveles de dificultad, y autenticación de usuarios. El servidor está configurado para funcionar simultáneamente sobre HTTP y HTTPS/H2.

## Tecnologías Utilizadas
- **Node.js**: Entorno de ejecución para JavaScript.
- **Express**: Framework para la construcción de la API.
- **MongoDB**: Base de datos NoSQL para almacenar los datos.
- **Mongoose**: ODM para modelar los objetos de MongoDB.
- **jsonwebtoken (JWT)**: Para la generación de tokens de acceso para rutas protegidas.
- **SPDY (HTTP/2)**: Para servir la aplicación sobre HTTPS y H2.
- **postman ****  Para probar las api
- **OpenSSL ** para generacion de certificacion

---

## Guía de Instalación y Puesta en Marcha

Sigue estos pasos para configurar y ejecutar el proyecto en tu entorno local.

### 1. Prerrequisitos
Asegúrate de tener instalado lo siguiente en tu sistema:
- **Node.js**: (Se recomienda v18.x o superior).
- **MongoDB**: Una instancia local o un clúster en la nube (como MongoDB Atlas).
- **OpenSSL**: Necesario para generar los certificados SSL. Debes descargarlo de su [página oficial](https://www.openssl.org/) e instalarlo, asegurándote de añadirlo al PATH de tu sistema para poder usar el comando `openssl` desde cualquier terminal.

### 1.1 Verificar instalacion

    node -v
    npm -v
    openssl version
    mongod --version



### 2. Clonar el Repositorio
```
git clone <URL-del-repositorio>
cd formulario-backend
```

### 3. Instalar Dependencias
Ejecuta el siguiente comando en tu consola para instalar todas las dependencias listadas en el `package.json`:
```
npm install
```

### 4. Configuración del Entorno

#### a. Variables de Entorno
Crea un archivo llamado `.env` en la raíz del proyecto y añade la siguiente variable. Esta es la cadena de conexión a tu base de datos MongoDB.

```env
MONGO_URI=mongodb://localhost:27017/gestor_preguntas
```
*Modifica la URL si tu configuración de MongoDB es diferente (por ejemplo, si usas un clúster en la nube).*

#### b. Certificados SSL para HTTPS
Para que el servidor HTTPS (`https://localhost:5001`) funcione, necesitas generar un certificado y una clave SSL.

1.  **Crear la carpeta `cert`**: Primero, crea manualmente una carpeta llamada `cert` en la raíz del proyecto.

2.  **Generar los archivos**: A continuación, genera los archivos `key.pem` (clave privada) y `cert.pem` (certificado) usando OpenSSL. Ejecuta el siguiente comando en tu consola desde la raíz del proyecto:
    ```
    openssl req -x509 -newkey rsa:4096 -keyout ./cert/key.pem -out ./cert/cert.pem -days 365 -nodes
    ```
    *Se te pedirán algunos datos para el certificado (país, organización, etc.). Puedes rellenarlos o simplemente presionar Enter para usar los valores por defecto.*

### 5. Ejecutar los Servidores
Una vez configurado todo, puedes iniciar los servidores desde tu consola.

- **Para desarrollo (con recarga automática):**
  ```
  npm run dev
  ```

- **Para producción:**
  ```
  npm start
  ```

Al ejecutar cualquiera de los comandos, se levantarán dos servidores simultáneamente:
- 🌐 **Servidor HTTP**: `http://localhost:5000`
- 🔒 **Servidor HTTPS/H2**: `https://localhost:5001`

*Nota: La primera vez que accedas a `https://localhost:5001` en tu navegador, es probable que veas una advertencia de seguridad porque el certificado es autofirmado. Simplemente acepta el riesgo para continuar.*

---

## API Endpoints Disponibles
La API está estructurada en los siguientes endpoints principales:
- `/api/auth`: Autenticación y registro de usuarios.
- `/api/admin`: Rutas de administración.
- `/api/categorias`: Gestión de categorías.
- `/api/subcategorias`: Gestión de subcategorías.
- `/api/niveles-dificultad`: Gestión de niveles de dificultad.
- `/api/rangos-edad`: Gestión de rangos de edad.
- `/api/preguntas`: Gestión de preguntas.