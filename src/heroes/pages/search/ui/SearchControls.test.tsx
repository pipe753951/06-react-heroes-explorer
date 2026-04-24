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
});
