# Proyecto de Gestión de Libros

Este proyecto consiste en una aplicación de gestión de libros realizada con MEAN, donde los usuarios pueden agregar, editar, ver y eliminar libros. También cuenta con autenticación y roles de usuario (admin y regular). El frontend está desarrollado con Angular y el backend con Node.js utilizando MongoDB como base de datos no relacional.

## Requisitos

### Requisitos del Sistema:
- **Node.js**: Asegúrate de tener instalada la versión compatible de Node.js. Para verificar si tienes Node.js instalado, ejecuta:
  ```bash
  node -v
  ```
  Si no tienes Node.js, puedes instalarlo desde [aquí](https://nodejs.org/).

- **Angular CLI**: La versión necesaria es **19.1.5**. Si no la tienes instalada, puedes hacerlo con el siguiente comando en el cmd:
  ```bash
  npm install -g @angular/cli@19.1.5
  ```

## Instalación

### Backend
1. Clona o descarga el repositorio del backend.
2. Navega a la carpeta del backend y ejecuta:
   ```bash
   npm install
   ```
3. Para iniciar el servidor backend, ejecuta:
   ```bash
   npm run server
   ```
   Esto iniciará el backend en el puerto predeterminado (`http://localhost:3000`).

### Frontend
1. Clona o descarga el repositorio del frontend.
2. Navega a la carpeta del frontend y ejecuta:
   ```bash
   npm install
   ```
3. Para iniciar el servidor frontend con Angular, ejecuta:
   ```bash
   ng serve -o
   ```
   Esto abrirá la aplicación en tu navegador (`http://localhost:4200`).

## Estructura del Proyecto

```plaintext
/frontend/
  - Estructura:
    - components:
      - auth
      - books
      - users
      - ui
    - guards
    - interceptors
    - services
/backend/
  - Estructura:
    - config
    - controllers
    - middlewares
    - models
    - repositories
    - routes
    - services
    - utils
    - app-server.js
    - app.js
    - .env
```

## Configuración de la Base de Datos (Si aplica)
Si deseas configurar su propia base de datos, sigue estos pasos para configurarla:

1. Instala y configura la base de datos.
2. En el archivo `.env` de la raíz de la carpeta del backend configuras la conexion de la base de datos como se muestra.
3. MONGO_URL es utilizado por mi como la base de datos principal MONGO_URI como la base de datos de pruebas
   ```text
   MONGO_URL=mongodb://localhost:27017/mi_base
   MONGO_URI=mongodb://localhost:27017/test_base
   JWT_SECRET=mi_clave_secreta
   ```

## Uso

### Frontend
- Los usuarios pueden ver su propia lista de libros crear, editar y elminar libros, y los administradores pueden, editar o eliminar usuarios.
- El sistema cuenta con autenticación para gestionar el acceso de los usuarios.

### Backend
- El backend proporciona una API RESTful para manejar los libros y la autenticación de los usuarios.
- La API usa rutas como:
  - `GET /api/books`: Obtiene todos los libros.
  - `POST /api/books`: Crea un nuevo libro.
  - `PUT /api/books/:id`: Actualiza un libro.
  - `DELETE /api/books/:id`: Elimina un libro.

## Variables de Entorno
 `.env`:
```text
MONGO_URL=mongodb://localhost:27017/mi_base
MONGO_URI=mongodb://localhost:27017/test_base
JWT_SECRET=mi_clave_secreta
```

## Pruebas Unitarias
- Para ejecutar las pruebas unitarias, en la conexion a la base de datos necesitas cambiar la variable de entorno para que se ejecute la base de datos de pruebas.
- Cambiando MONGO_URL por MONGO_URI
`.config/db.js`:
```text
mongoose.connect(process.env.MONGO_URL);
this.connection = mongoose.connection;
```
- Para ejecutarlas pon el comando:
  ```bash
  npm test
  ```
## Cosas a tener en cuenta
  - Los usuarios con el rol adminstrador tienen acceso a una interfaz diferente a el usuario cotidiano.
  - Normalmente este rol se debe crear desde el back ya que es un role que permite administrar a los usuarios.
  - la peticion post esta en la documentacion de la appi en swagger pero aqui dejo una implementacion de esta.
  - es recomendable que creen un usuario admin antes de iniciar a la aplicación ya que de esta manera permite la gestion de los usuarios de una manera mas facil.
 `  http://localhost:3000/auth/register`:
```text
{
  "username":"example"
  "email": "email.example"
  "password":"password123"
  "role": "admin"
}
```

## Licencia
Este proyecto está bajo la licencia MIT. Si tienes alguna pregunta o necesitas más detalles, no dudes en contactar conmigo.
