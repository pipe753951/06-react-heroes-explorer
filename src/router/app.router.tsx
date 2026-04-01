import { createBrowserRouter } from "react-router";

import { AdminPage } from "@/admin/pages/AdminPage";
import { HomePage } from "@/writers/pages/home/HomePage";
import { SearchPage } from "@/writers/pages/search/SearchPage";
import { WriterPage } from "@/writers/pages/writer/WriterPage";

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/writers/1",
    element: <WriterPage />,
  },
  {
    path: "/search",
    element: <SearchPage />,
  },
  {
    path: "/admin",
    element: <AdminPage />,
  },
]);
