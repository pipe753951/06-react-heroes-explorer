import { Link, useLocation } from "react-router";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "../ui/navigation-menu";

const CustomMenu = function () {
  const { pathname } = useLocation();

  const isActive = (path: string) => pathname === path;

  return (
    <NavigationMenu>
      <NavigationMenuList className="gap-2">
        {/* Home */}
        <NavigationMenuItem>
          <NavigationMenuLink active={isActive("/")} asChild>
            <Link to="/">Inicio</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        {/* Search */}
        <NavigationMenuItem>
          <NavigationMenuLink active={isActive("/search")} asChild>
            <Link to="/search">Buscar superhéroes</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default CustomMenu;
