# #03. 📦 vi.mocked

Este método devuelve un método falsificado por Vitest, desde el cual se puede manipular para controlar las pruebas y sus resultados. Por ejemplo:

```ts
const getSummaryActionMock = vi.mocked(getSummary);
```
