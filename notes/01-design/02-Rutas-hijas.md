# #02. 🛣️ Rutas hijas

Es posible configurar en el modo de datos de React Router rutas hijas que aplican una disposición (_layout_) en común con respecto a una ruta padre. La ruta padre sólo aplica el layout, por lo que las rutas hijas (incluida el índice) se envuelven en una propiedad llamada `children`. Cuando se solicite una ruta hija, se imprime la disposición con su elemento hijo.

Las rutas hijas no deben tener una barra al inicio, porque en el padre se debe indicar. Esto tiene sentido porque si se establece una ruta padre que es la raíz, las rutas hijas no deberían tener la barra; si no, se tendrían dos barras (`//`), por ejemplo: `//buscar`. Cuando pasa esto, podría producir problemas.

Este es un ejemplo de la aplicación de las rutas hijas:

```tsx
export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <HeroesLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "/heroes/1", element: <HeroPage /> },
      { path: "/search", element: <SearchPage /> },
    ],
  },
  { path: "/admin", element: <AdminPage /> },
]);
```

## Aplicar un componente de una ruta hija a un layout

Para aplicar un componente de una ruta hija a un layout que utiliza el componente padre, se utiliza el componente `Outlet`, que imprime el elemento de la ruta hija correspondiente. Por ejemplo:

```tsx
import { Outlet } from "react-router";
import { Header } from "@/dashboard/layouts/header";

export const AppLayout = function () {
  return (
    <div className="flex ...">
      <Header />
      <Outlet />
    </div>
  );
};
```
