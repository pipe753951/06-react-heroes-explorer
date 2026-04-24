import { describe, expect, test } from "vitest";
import { MemoryRouter } from "react-router";

import SearchControls from "./SearchControls";
import { fireEvent, render, screen } from "@testing-library/react";

const renderSearchControlsWithRouter = function (
  initialEntries: string[] = ["/"],
) {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <SearchControls />
    </MemoryRouter>,
  );
};

// If in window are not ResizeObserver, set "fake" class to prevent errors.
if (typeof window.ResizeObserver === "undefined") {
  class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  }

  window.ResizeObserver = ResizeObserver;
}

describe("SearchControls", () => {
  test("must render this component with default query parameters.", () => {
    const { container } = renderSearchControlsWithRouter();

    expect(container).toMatchSnapshot();
  });

  test('must set search input text as query parameter "search_query" is.', () => {
    renderSearchControlsWithRouter(["/search/?search_query=Steve%20Rogers"]);

    const inputElement = screen.getByPlaceholderText(
      "Busca héroes, villanos, poderes, equipos, etc.",
    );

    expect(inputElement.getAttribute("value")).toBe("Steve Rogers");
  });

  test('must change query parameter "search_query" when input text was changed and enter key was pressed on it.', () => {
    renderSearchControlsWithRouter(["/search/?search_query=Steve%20Rogers"]);

    const inputElement = screen.getByPlaceholderText(
      "Busca héroes, villanos, poderes, equipos, etc.",
    );

    expect(inputElement.getAttribute("value")).toBe("Steve Rogers");

    fireEvent.change(inputElement, { target: { value: "Clark Kent" } });
    fireEvent.keyDown(inputElement, { key: "Enter" });

    expect(inputElement.getAttribute("value")).toBe("Clark Kent");
  });

  test('must change query parameter "strength" when slider is moved.', () => {
    renderSearchControlsWithRouter(["/search/?advanced_search=1"]);

    const sliderElement = screen.getByRole("slider");
    expect(sliderElement.getAttribute("aria-valuenow")).toBe("0");

    fireEvent.keyDown(sliderElement, { key: "ArrowRight" });
    expect(sliderElement.getAttribute("aria-valuenow")).toBe("1");
  });

  test("must have advanced filters accordion item open when query parameters indicates it.", () => {
    renderSearchControlsWithRouter(["/search/?advanced_search=1"]);

    const accordionItem = screen.getByRole("region");
    expect(accordionItem.dataset.state).toBe("open");
  });

  test("must have advanced filters accordion item closed when query parameters indicates it.", () => {
    renderSearchControlsWithRouter(["/search"]);

    const accordionItem = screen.queryByRole("region");
    expect(accordionItem).toBeNull();
  });
});
