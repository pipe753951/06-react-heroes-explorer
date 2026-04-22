import { createBrowserRouter, Navigate } from "react-router";
import { lazy } from "react";

import AdminPage from "@/admin/pages/AdminPage";
import HomePage from "@/heroes/pages/home/HomePage";
import CharacterPage from "@/heroes/pages/character/CharacterPage";
import HeroesLayout from "@/heroes/layouts/HeroesLayout";
import AdminLayout from "@/admin/layouts/AdminLayout";

// const SearchPage = lazy(() =>
//   import("@/heroes/pages/search/SearchPage").then((module) => ({
//     default: module.SearchPage,
//   })),
// );
const SearchPage = lazy(() => import("@/heroes/pages/search/SearchPage"));

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <HeroesLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/character/:idOrSlug",
        element: <CharacterPage />,
        errorElement: <Navigate to="/" />,
      },
      // Redirect if character ID or Slug is not found:
      {
        path: "/character/",
        element: <Navigate to="/search" replace />,
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

  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);
