import { RouterProvider } from "react-router";
import { appRouter } from "./router/app.router";

const App = function () {
  return <RouterProvider router={appRouter} />;
};

export default App;
