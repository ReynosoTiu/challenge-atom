# CHALLENGE ATOM - JOSÉ REYNOSO

El proyecto consiste en un registro de tareas ordenadas por fecha de creación. 

Se cuenta con inicio de sesión donde al no encontrar el correo ingresado solicita la confirmación para la creación del mismo. 

Cuando se ha ingresado se muestra una vista principal donde están desplegadas las tareas del usuario. Estas se pueden editar, eliminar o marcar como completadas.

En la parte superior existen dos botones. Uno para crear nuevas tareas y el otro para cerrar sesión y dirigirse al inició.

## Decisiones del diseño
* Arquitectura 3 capas: Esta arquitectura es muy útil para separar responsabilidades y además facilita el mantenimiento y escalabilidad. También facilita la migración a otro tipo de arquitectura.

* Base de Datos: irebase Firestore como base de datos es muy flexible y con una capacidad escalable. Además sus atributos cono NoSQL ayuda a agilizar el almacenamiento de datos para este proyecto.

* Middleware de Autenticación: Se implementó un middleware que utiliza tokens JWT para proteger las rutas y verificar la identidad del usuario.

* Front-End: El front-end está construido con Angular debido a su robusto soporte para aplicaciones modulares y componentes reutilizables. Haciendo uso de sus Guards para protejer las rutas cuando no hay una atenticación.

* Estilo: Se utilizó Bootstrap para garantizar un diseño responsive y una experiencia de usuario consistente.


## Tecnologías Utilizadas
* Back-End:
    * Node.js como entorno de ejecución.
    * Express.js para la creación de APIs RESTful.
    * Firebase Admin SDK para la interacción con Firestore.
* Front-End:
    * Angular como framework principal.
    * Bootstrap para el diseño visual.
* Testing:
    * Jest para las pruebas unitarias.
    * Supertest para probar los endpoints de la API.
    * Karma con jasmine para las pruebas unitarias en el frontend
    * Cypress para las pruebas e2e
* Autenticación:
    * jsonwebtoken para generar y verificar tokens JWT.
* Manejo de Cookies:
    * ngx-cookie-service para el manejo de cookies en el front-end.

### Directorios relevantes

├── back/  
│   ├── src/  
│   │   ├── controllers/  
│   │   ├── middleware/  
│   │   ├── routes/  
│   └── app.ts  
├── tests/  
│   └── package.json  
├── front/ -------# Código del cliente  
│   ├── cypress/  
│   ├── src/  
│   │   ├── app/  
│   │   ├── assets/  
│   │   └── index.html  
│   └── package.json  
└── README.md -------- # Documentación del proyecto


### Consideraciones
* Se utilizó una clave privada de la cuenta de servicio de firebase para conectarse a la base de datos de firestore para garantizar la conexión utilizando firebase-admin
* Se utiliza environments para guardar las configuraciones de desarrollo y productivas

## Comandos utilizados para ejecución local
* npm install
    * Se ejecuta en la carpeta back y front para instalar las dependencias

### Bakcend
* npm run dev 
    * Ejecuta localmente la API
    * Se utiliza morgan para registrar y visualizar las peticiones a la API
* npm test
    * Ejecuta las pruebas unitarias de la API
* npm run build
    * Compilación manual de a javascript (cuando sea necesario)

### Frontend
* ng serve
    * Montar localmente la app
* ng test
    * Ejecuta las pruebas unitarias
* ng e2e
    * Ejecuta y abre la aplicación de cypress para las pruebas e2e

### Deploy firestore
* firebase init
    * iniciar apps de firebase
* firebase deploy
    * desplegar proyecto hosting y functions en firebase