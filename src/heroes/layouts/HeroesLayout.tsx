import CustomMenu from "@/components/custom/CustomMenu";
import { Outlet } from "react-router";

const HeroesLayout = function () {
  return (
    <div className="flex min-h-screen flex-col bg-linear-to-br from-slate-50 via-cyan-50 to-blue-50">
      <header className="flex h-15 items-center border-b bg-white px-10 shadow-md">
        <CustomMenu />
      </header>
      <main className="flex flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default HeroesLayout;
