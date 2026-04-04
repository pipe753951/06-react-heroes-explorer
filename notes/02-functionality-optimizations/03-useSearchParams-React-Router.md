# #03. ℹ️ useSearchParams - React Router

`useSearchParams` es un hook de React Router que permite obtener y manipular parámetros de búsqueda. Es similar al `useState`, con la diferencia de que siempre se emplea el objeto `URLSearchParams`, tanto en el primer elemento del objeto desestructurado como en el callback usado para redefinir los parámetros. A continuación, un ejemplo de su uso:

```tsx
type HomeTabs = "all" | "favorites" | "heroes" | "villains";
const validHomeTabs = ["all", "favorites", "heroes", "villains"];

export default function SuperheroApp() {
  const [searchParams, setSearchParams] = useSearchParams();

  const activeTab: HomeTabs | string = searchParams.get("tab") ?? "all";
  const setActiveTab = (tab: HomeTabs) => {
    setSearchParams((prevParams) => {
      prevParams.set("tab", tab);
      return prevParams;
    });
  };

  if (!validHomeTabs.includes(activeTab)) {
    setActiveTab("all");
  }

  // ...
}
```
