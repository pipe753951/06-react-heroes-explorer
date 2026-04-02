# #04. 🏭 Extender interfaces desde TypeScript

Al igual que se puede extender una clase de otra, creando una clase hija con base de una clase padre; es posible hacer lo mismo con las interfaces de TypeScript. Para extender una interfaz de otra, luego de colocar el nombre se coloca la palabra reservada `extends` y la interfaz deseada. Aquí está un ejemplo de una interfaz de `Props` de React que extiende de `PropsWithChildren` que, además de permitir distintas _Props_, permite los hijos:

```tsx
interface Props extends PropsWithChildren {
  // Además de lo siguiente, se "añade": children?: React.ReactNode;
  title: string;
  icon: JSX.Element;
}
```
