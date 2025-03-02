TIENDA DE ROPA CON NODE.JS

Este proyecto es una API desarrollada con Node.js y Express para la gestión de productos de un tienda de ropa.

Permite realizar operaciones CRUD sobre los productos a través de diferentes endpoints.

Tecnologías utilizadas

Node.js

Express

MongoDB 

Endpoints

Productos Públicos

GET /api/products → Obtiene todos los productos.

GET /api/product/:productId → Obtiene un producto por su ID.

GET /api/products/category/:category → Obtiene productos por categoría.


Panel de Administración

GET /api/dashboard → Muestra el panel de control.

GET /api/dashboard/new → Muestra el formulario para agregar un producto.

POST /api/dashboard → Crea un nuevo producto.

GET /api/dashboard/:productId/edit → Muestra el formulario de edición.

POST /api/dashboard/:productId → Actualiza un producto.

POST /api/dashboard/:productId/delete → Elimina un producto.