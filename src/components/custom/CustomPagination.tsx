import { ChevronLeft, MoreHorizontal, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  currentPage?: number;
  totalPages: number;

  onUpdatePage(page: number): void;
}

const CustomPagination = function ({
  totalPages,
  currentPage = 1,
  onUpdatePage,
}: Props) {
  const handleBackButtonClick = () => {
    if (currentPage - 1 < 1) return;
    onUpdatePage(currentPage - 1);
  };
  const handleForwardButtonClick = () => {
    if (currentPage + 1 > totalPages) return;
    onUpdatePage(currentPage + 1);
  };

  const handlePageButtonClick = onUpdatePage;

  return (
    <div className="flex items-center justify-center space-x-2">
      <Button
        onClick={handleBackButtonClick}
        variant="outline"
        size="lg"
        disabled={currentPage === 1}
      >
        <ChevronLeft className="h-4 w-4" />
        Ir atrás
      </Button>

      {Array.from({ length: totalPages }).map((_, index) => (
        <Button
          key={index}
          onClick={() => handlePageButtonClick(index + 1)}
          variant={currentPage === index + 1 ? "default" : "outline"}
          size="icon-lg"
        >
          {index + 1}
        </Button>
      ))}

      <Button variant="text" size="lg" disabled>
        <MoreHorizontal className="h-4 w-4" />
      </Button>

      <Button
        onClick={handleForwardButtonClick}
        variant="outline"
        size="lg"
        disabled={currentPage === totalPages}
      >
        Siguiente
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default CustomPagination;
