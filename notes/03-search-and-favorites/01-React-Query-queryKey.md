# #01. 🔗 React Query queryKey

Cómo se mencionó anteriormente, el parámetro `queryKey` de hook `useQuery` sirve para poner una clave (también se puede reconocer como un identificador) a una llamada la función asíncrona del parámetro `queryFn`. Este parámetro permite que la petición se mantenga en caché, entre otras cosas. Si la función asíncrona recibe parámetros, Tanstack recomienda que se coloquen en `queryKey`, para diferenciar una llamada de otra y así, evitar confundirlas. Como `queryKey` se recibe cómo un arreglo, luego del primer elemento, se reciben otros valores que se pueden personalizar para hacer la diferenciación, cómo nombres de variables y sus valores. Por ejemplo: `["search", "query", query, "timestamp", timestamp]`.

El instructor recomienda que en lugar de hacer lo anterior, se indique los parámetros dentro de un objeto luego del “nombre” de la query, esto podría traer ventajas, como estas:

1. Evitar mantener una sintaxis obligatoria que podría cambiar. Si se colocan los parámetros cómo elementos de arreglos, y la query no está centralizada en un custom hook; cuando uno de ellos tenga que cambiar, se tendrá que cambiar la estructura de los parámetros en todo query que se haya utilizado la estructura anterior.
2. Los procesos de ofuscación del código fuente del proyecto pueden también ofuscar los `queryKey` por medio de los parámetros. Por tanto, podría (no lo tengo confirmado) ser más seguro usar los objetos que los arreglos (Aclaro, con nombres de parámetros que pienso que no quedarían ofuscados, o no del todo) para los parámetros porque los parámetros indicados quedarían ofuscados.

   > **ℹ️ Aclaración:** Cabe anotar que este punto queda refutado si en un objeto sólo se indican las variables pero no sus nombres. Por ejemplo: `["s", query, timestamp]`.

Este es un ejemplo de aplicación del objeto: `["search", { query, timestamp }]`.

Y este es un ejemplo de la aplicación de lo anterior en el uso del hook `useQuery`:

```tsx
// Usando el arreglo.
useQuery(
  queryOptions({
    queryKey: ["heroes", page, limit, category],
    // O utilizando esto:
    // queryKey: ["heroes", page, limit, category],
    queryFn: () => getHeroesByPage(page, limit, category),
    staleTime: 300000, // 1000ms * 60s * 5m
  }),
);

// Lo mismo, pero usando un objeto
useQuery(
  queryOptions({
    queryKey: ["heroes", { page, limit, category }],
    queryFn: () => getHeroesByPage(page, limit, category),
    staleTime: 300000, // 1000ms * 60s * 5m
  }),
);
```
