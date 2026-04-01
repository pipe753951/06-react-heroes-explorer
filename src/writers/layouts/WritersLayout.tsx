import { Link, Outlet } from "react-router";

const WritersLayout = function () {
  return (
    <>
      <header className="flex items-center px-10 h-15 bg-slate-100 border-b-2 border-slate-400">
        <nav>
          <ul className="flex gap-4">
            <li>
              <Link to="/">Ir al inicio</Link>
            </li>
            <li>
              <Link to="/writers/1">Escritor</Link>
            </li>
            <li>
              <Link to="/search">Buscar escritores</Link>
            </li>
            <li>
              <Link to="/admin">Administración</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default WritersLayout;
