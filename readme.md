Sistema de renta y venta de peliculas (Prueba tecnica)

Si se prueba de form local, ejecutar el script de la bd.
Como usuario predeterminado es admin@admin.com y su contraseña es 1234.

Se deja la coleccion del postman para pruebas.
Hacer login en la carpeta de user de la collection, muchos endpoint requieren token y el email y algunos el rol de admin (el usuario anterior ya lo posee), el token y email se envian en ocaciones en las cabeceras y en el body en los POST.

IMPORTANTE
Tener en cuenta que en las colecciones de postman se utiliza variables, la de dev es http://localhost:5000
la de dev es https://movies-api-3pj2.onrender.com/ 

Base de datos usada postgressql, usar el archivo con ese nombres
