# #01. ℹ️ Variables de entorno de pruebas

Al utilizar Vitest, es posible crear variables de entorno para pruebas y, además, sobre-establecer las de producción. Para ello, se crea un archivo llamado `.env.test`, este archivo es prioritario sobre `.env` y `.env.local` —para variables locales que no se suben al repositorio, el anterior es genérico—, aunque las variables de entorno por terminal son las mas prioritarias —Eso entiendo yo.

Al crear el archivo de variables de entorno de pruebas, se sigue la misma sintaxis de las variables de entorno con Vite. Con esto, dentro del entorno de pruebas de Vitest, se utilizará las variables de entorno de prueba junto con las de producción priorizando las primeras.
