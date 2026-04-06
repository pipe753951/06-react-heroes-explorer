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
  linkClassName?: string;
  pageClassName?: string;
  separatorClassName?: string;
  items: CustomBreadcrumbItem[];
}

export function CustomBreadcrumbs(props: Props) {
  const { linkClassName, pageClassName, separatorClassName, items } = props;

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
                  <BreadcrumbLink className={linkClassName} asChild>
                    <Link to={itemHref}>{itemName}</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
              );
            }
            return (
              <BreadcrumbItem key={itemHref}>
                <BreadcrumbPage className={pageClassName}>
                  {itemName}
                </BreadcrumbPage>
              </BreadcrumbItem>
            );
          }
          return (
            <BreadcrumbSeparator
              className={separatorClassName}
              key={`separator-${itemIndex + 0.5}`}
            />
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default CustomBreadcrumbs;
