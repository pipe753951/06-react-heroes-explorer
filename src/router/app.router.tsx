import { createBrowserRouter } from "react-router";
import { lazy } from "react";

import AdminPage from "@/admin/pages/AdminPage";
import HomePage from "@/writers/pages/home/HomePage";
import WriterPage from "@/writers/pages/writer/WriterPage";
import WritersLayout from "@/writers/layouts/WritersLayout";
import AdminLayout from "@/admin/layouts/AdminLayout";

// const SearchPage = lazy(() =>
//   import("@/writers/pages/search/SearchPage").then((module) => ({
//     default: module.SearchPage,
//   })),
// );
const SearchPage = lazy(() => import("@/writers/pages/search/SearchPage"));

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <WritersLayout />,
    children: [
      {
        index: true,
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
    ],
  },

  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <AdminPage />,
      },
    ],
  },
]);
