# #02. ⚙️ Falsificar exportaciones por defecto en Vitest

Para falsificar las exportaciones por defecto de un módulo ES6+, se hace de la misma manera que con otras exportaciones, aplicando la diferencia que el nombre de la exportación se llama `default`. Por ejemplo:

```ts
vi.mock("../actions/getSummary.action", () => ({
  default: vi.fn(),
}));
```
