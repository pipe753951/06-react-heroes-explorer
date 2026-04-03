# #03. 🕒 Lazy Load (_Carga perezosa_)

La carga perezosa (o _bajo demanda_), desde el punto de vista de un proyecto React con Vite, es una técnica utilizada para evitar la carga de un componente cuando no sea necesario. Para ello, el componente sólo se carga bajo demanda. Así, la construcción de la página cargará de manera más óptima los componentes que se desean cargar (Como los utilizados más comúnmente por los usuarios), evitando la carga innecesaria de otros (Como los inusuales). Lo anterior es útil para rutas comunes e infrecuentes.

Para aplicar la carga perezosa en React, se utiliza la función de retorno (_callback_) `lazy` de React, que carga un componente cuando es llamado para evitar cargas innecesarias. La función que recibe debe devolver una promesa que carga el componente, que puede ser la promesa `import`, que importa un módulo que, en este caso, importa el componente deseado.

## El problema de `import` con `lazy`

Si la importación del componente no es por defecto (o _preestablecido_), se deberá indicar explícitamente que la importación del componente deseado deberá comportase cómo preestablecida. Esto sucede porque `import` espera la importación por defecto. Entonces, este problema se puede resolver de dos formas:

1. Indicarle a `import` que cuando el proceso sea exitoso, devuelva el componente cómo el valor preestablecido.
2. Modificar el componente directamente para que sea el exportado de manera preestablecida.
