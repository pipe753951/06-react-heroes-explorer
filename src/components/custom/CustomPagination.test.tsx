import { describe, expect, test, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { useState, type PropsWithChildren } from "react";

import CustomPagination from "./CustomPagination";

interface renderCustomPaginationWithTestingHookProps {
  totalPages: number;
  defaultPage: number;
}

const CustomPaginationWithTestingHook = ({
  totalPages,
  defaultPage,
}: renderCustomPaginationWithTestingHookProps) => {
  const [currentPage, setCurrentPage] = useState(defaultPage);

  const handlePaginationUpdatePage = setCurrentPage;

  return (
    <CustomPagination
      totalPages={totalPages}
      currentPage={currentPage}
      onUpdatePage={handlePaginationUpdatePage}
    />
  );
};

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

  test("must have page #3 button selected when expected page is selected.", () => {
    render(<CustomPaginationWithTestingHook totalPages={5} defaultPage={3} />);

    const buttonThree = screen.getByText("3");

    expect(buttonThree.getAttribute("variant")).toBe("default");
  });

  test("must disable page #3 button when page #2 is pressed while page #3 is selected", () => {
    render(<CustomPaginationWithTestingHook totalPages={5} defaultPage={3} />);

    const buttonTwo = screen.getByText("2");
    const buttonThree = screen.getByText("3");

    expect(buttonTwo.getAttribute("variant")).toBe("outline");
    expect(buttonThree.getAttribute("variant")).toBe("default");

    fireEvent.click(buttonTwo);

    expect(buttonTwo.getAttribute("variant")).toBe("default");
    expect(buttonThree.getAttribute("variant")).toBe("outline");
  });
});
