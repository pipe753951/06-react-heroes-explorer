import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link } from "react-router";

interface CustomBreadcrumbItem {
  label: string;
  to: string;
}

interface Props {
  items: CustomBreadcrumbItem[];
}

export function CustomBreadcrumbs({ items }: Props) {
  return (
    <Breadcrumb className="my-5">
      <BreadcrumbList>
        {Array.from({ length: items.length * 2 - 1 }).map((_, index) => {
          const itemIndex = index / 2;

          if (Number.isInteger(index / 2)) {
            const itemHref = items
              .slice(0, itemIndex + 1)
              .map((item) => item.to)
              .join("");

            const itemName = items[itemIndex].label;
            if (itemIndex !== items.length - 1) {
              return (
                <BreadcrumbItem key={itemHref}>
                  <BreadcrumbLink asChild>
                    <Link to={itemHref}>{itemName}</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
              );
            }
            return (
              <BreadcrumbItem key={itemHref}>
                <BreadcrumbPage>{itemName}</BreadcrumbPage>
              </BreadcrumbItem>
            );
          }
          return <BreadcrumbSeparator key={`separator-${itemIndex + 0.5}`} />;
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default CustomBreadcrumbs;
