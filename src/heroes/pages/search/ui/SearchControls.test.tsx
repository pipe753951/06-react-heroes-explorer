import { describe, expect, test } from "vitest";
import { MemoryRouter } from "react-router";

import SearchControls from "./SearchControls";
import { render, screen } from "@testing-library/react";

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
});
