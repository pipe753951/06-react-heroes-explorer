import { describe, expect, test, vi } from "vitest";
import { render } from "@testing-library/react";

import { Outlet, RouterProvider } from "react-router";

import { appRouter } from "./app.router";

vi.mock("@/admin/layouts/HeroesLayout", () => ({
  default: () => (
    <div data-testid="layout">
      <Outlet />
    </div>
  ),
}));

vi.mock("@/heroes/pages/home/HomePage", () => ({
  default: () => <div data-testid="home-page" />,
}));

describe("appRouter", () => {
  test("must be configured as expected.", () => {
    expect(appRouter.routes).toMatchSnapshot();
  });

  test("must be at root path and render home page.", () => {
    render(<RouterProvider router={appRouter} />);
  });
});
