import { ChevronLeft, MoreHorizontal, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  currentPage?: number;
  totalPages: number;
}

const CustomPagination = function ({ totalPages, currentPage = 1 }: Props) {
  return (
    <div className="flex items-center justify-center space-x-2">
      <Button variant="outline" size="lg" disabled={currentPage === 1}>
        <ChevronLeft className="h-4 w-4" />
        Ir atrás
      </Button>

      {Array.from({ length: totalPages }).map((_, index) => (
        <Button
          key={index}
          variant={currentPage === index + 1 ? "default" : "outline"}
          size="icon-lg"
        >
          {index + 1}
        </Button>
      ))}

      {/* <Button variant="default" size="sm">
        1
      </Button>
      <Button variant="outline" size="sm">
        2
      </Button>
      <Button variant="outline" size="sm">
        3
      </Button> */}
      <Button variant="text" size="lg" disabled>
        <MoreHorizontal className="h-4 w-4" />
      </Button>

      <Button variant="outline" size="lg" disabled={currentPage === totalPages}>
        Siguiente
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default CustomPagination;
