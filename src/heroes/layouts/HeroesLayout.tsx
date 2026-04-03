import CustomMenu from "@/components/custom/CustomMenu";
import { Outlet } from "react-router";

const HeroesLayout = function () {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-cyan-50 to-blue-50">
      <header className="flex items-center px-10 h-15 bg-white border-b shadow-md">
        <CustomMenu />
        {/* <nav>
          <ul className="flex gap-4">
            <li>
              <Link to="/">Ir al inicio</Link>
            </li>
            <li>
              <Link to="/heroes/1">Héroe</Link>
            </li>
            <li>
              <Link to="/search">Buscar héroes</Link>
            </li>
            <li>
              <Link to="/admin">Administración</Link>
            </li>
          </ul>
        </nav> */}
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default HeroesLayout;
