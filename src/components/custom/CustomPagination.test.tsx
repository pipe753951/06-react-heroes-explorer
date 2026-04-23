import { describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import type { PropsWithChildren } from "react";

import CustomPagination from "./CustomPagination";

vi.mock("@/components/ui/button", () => ({
  Button: ({ children, ...props }: PropsWithChildren) => (
    <button {...props}>{children}</button>
  ),
}));

describe("CustomPagination", () => {
  test("must render with default values.", () => {
    render(<CustomPagination totalPages={4} />);

    expect(screen.queryByText("Ir atrás")).not.toBeNull();
    expect(screen.queryByText("Siguiente")).not.toBeNull();
  });

  test("must disable go back button when the component hightlights the first page.", () => {
    render(<CustomPagination totalPages={4} />);

    const previousButton = screen.getByText("Ir atrás");

    expect(previousButton.getAttributeNames()).toContain("disabled");
  });

  test("must disable next button when the component hightlights the last page (5).", () => {
    render(<CustomPagination totalPages={4} currentPage={4} />);

    const nextButton = screen.getByText("Siguiente");

    expect(nextButton.getAttributeNames()).toContain("disabled");
  });
});
