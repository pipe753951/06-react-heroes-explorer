import { RouterProvider } from "react-router";
import { appRouter } from "./router/app.router";

export const App = function () {
  return <RouterProvider router={appRouter} />;
};
