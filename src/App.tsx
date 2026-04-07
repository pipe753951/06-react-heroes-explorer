import { RouterProvider } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import FavoriteCharacterProvider from "./heroes/context/FavoriteCharacterContext";
import { appRouter } from "./router/app.router";

const queryClient = new QueryClient();

const App = function () {
  return (
    <QueryClientProvider client={queryClient}>
      <FavoriteCharacterProvider>
        <ReactQueryDevtools initialIsOpen={false} />
        <RouterProvider router={appRouter} />
      </FavoriteCharacterProvider>
    </QueryClientProvider>
  );
};

export default App;
