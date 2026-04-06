import { RouterProvider } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { appRouter } from "./router/app.router";

const queryClient = new QueryClient();

const App = function () {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <RouterProvider router={appRouter} />
    </QueryClientProvider>
  );
};

export default App;
