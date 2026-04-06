# #02. ⤴️ Navegación por código y parámetros con React Router

## Navegación por código

Para hacer una navegación por código con React Router, toca utilizar la función que devuelve el hook `useNavigate`. La función devuelta pide dos parámetros, la ruta y las opciones. Por ejemplo:

```tsx
navigate(`/articles/${slug}`);
```

## Parámetros

Al definir una ruta por parte de React Router, es posible definir parámetros con una sintaxis que hay en común con varios sistemas de rutas. La sintaxis consiste en colocar dos puntos para indicar que vendrá un parámetro; luego, el nombre del parámetro y, el símbolo de interrogación si se desea que el parámetro sea opcional. Si se define que el parámetro sea opcional, se podrá manejarlo como un posible valor indefinido. Por ejemplo:

```tsx
export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "/product/:slug?", element: <ProductPage /> },
    ],
  },
  // ...
]);
```

### Recibir parámetros

En el elemento que se muestra con la ruta que tiene el parámetro, se hace necesario utilizar el hook `useParams` que devuelve un objeto con el nombre del parámetro, donde está el valor. Aquí está un ejemplo del uso de este hook:

```tsx
const { slug = "" } = useParams();
```
