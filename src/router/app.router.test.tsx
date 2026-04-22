import { describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";

import {
  createMemoryRouter,
  Outlet,
  RouterProvider,
  useParams,
} from "react-router";

import { appRouter } from "./app.router";

const MockCharacterPage = function () {
  const { idOrSlug } = useParams();

  return <div data-testid="character-page">{idOrSlug}</div>;
};

vi.mock("@/heroes/layouts/HeroesLayout", () => ({
  default: () => {
    return (
      <div data-testid="layout">
        <Outlet />
      </div>
    );
  },
}));

vi.mock("@/heroes/pages/home/HomePage", () => ({
  default: () => <div data-testid="home-page" />,
}));

vi.mock("@/heroes/pages/character/CharacterPage", () => ({
  default: () => MockCharacterPage(),
}));

vi.mock("@/heroes/pages/search/SearchPage", () => ({
  default: () => <div data-testid="search-page" />,
}));

describe("appRouter", () => {
  test("must be configured as expected.", () => {
    expect(appRouter.routes).toMatchSnapshot();
  });

  test("must be at root path and render home page.", () => {
    const testingRouter = createMemoryRouter(appRouter.routes, {
      initialEntries: ["/"],
    });

    render(<RouterProvider router={testingRouter} />);

    expect(screen.queryByTestId("home-page")).not.toBeNull();
  });

  test("must render a character at /character/:idOrSlug path.", () => {
    const slugToEvaluate = "clark-kent";
    const testingRouter = createMemoryRouter(appRouter.routes, {
      initialEntries: [`/character/${slugToEvaluate}`],
    });

    render(<RouterProvider router={testingRouter} />);

    expect(screen.getByTestId("character-page").innerHTML).toBe(slugToEvaluate);
  });

  test("must render a search page at /search path.", async () => {
    const testingRouter = createMemoryRouter(appRouter.routes, {
      initialEntries: ["/search"],
    });

    render(<RouterProvider router={testingRouter} />);

    expect(await screen.findByTestId("search-page")).not.toBeNull();
  });

  test("must redirect to home page when a unknown route was given on path.", () => {
    const testingRouter = createMemoryRouter(appRouter.routes, {
      initialEntries: ["/unknown-route"],
    });

    render(<RouterProvider router={testingRouter} />);

    screen.debug();

    expect(screen.queryByTestId("home-page")).not.toBeNull();
  });
});
