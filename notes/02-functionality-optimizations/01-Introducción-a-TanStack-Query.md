# #01. 🌴 Introducción a TanStack Query

TanStack Query es una herramienta creada para facílitar la creación de código asíncrono, sea en React, Vue, Angular, etc. Hay que aclarar que formalmente para React, esta herramienta se llama React Query. Se puede utilizar como alternativa, en este caso, de los hooks de React, que podrían complicar las cosas para realizar, acciones complejas. Ejemplos de estas acciones complejas incluyen hacer una petición HTTP, mantener el caché por cierto tiempo, actualizar el estado, etc. El instructor menciona que aplicará esta herramienta durante el resto del curso, debido a las ventajas notables que ofrece para peticiones HTTP.

## Instalación básica

Para instalar lo fundamental de TanStack Query (lo digo porque TanStack ha desarrollado herramientas de desarrollo como un validador para ESLint y herramientas de desarrollo), se instala el paquete de NPM (aunque se puede hacer en otros) `@tanstack/react-query`. Luego, se configura un “_cliente de query_” (`ClientQuery`) y un proveedor del mismo (ya que se utilizan hooks), más o menos en un componente raíz o principal, así:

```tsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// Opcional: Herramientas de desarrollo.
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();
const App = function () {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} /> {/*...*/}
    </QueryClientProvider>
  );
};
export default App;
```

## Empezar con un query

Existe un hook llamado `useQuery` de React Query que permite utilizar la funcionalidad de la herramienta, recibe un argumento que es la configuración del query (Puede ser un objeto, entre otros), y devuelve un objeto.

> **💡 Nota:** El _linter_ de la herramienta recomienda poner la configuración dentro del método `queryOptions`. Más información en la [documentación](https://tanstack.com/query/latest/docs/framework/react/guides/query-options).

La configuración (Sea como objeto o dentro de `queryOptions`) debe tener al menos una clave única del query (`queryKey`) que va en un arreglo (el primer elemento es la clave, el resto es avanzado), y función que devuelve una promesa.

Un ejemplo de su uso es hacer una petición HTTP, y mantener la respuesta en caché por cinco minutos:

```tsx
const { data } = useQuery(
  queryOptions({
    queryKey: ["heroes"],
    queryFn: getHeroesByPage,
    staleTime: 300000, // 1000 * 60 * 5
  }),
);
```
