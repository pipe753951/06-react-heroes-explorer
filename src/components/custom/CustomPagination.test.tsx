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
    screen.debug();

    expect(screen.queryByText("Ir atrás")).not.toBeNull();
    expect(screen.queryByText("Siguiente")).not.toBeNull();
  });
});
