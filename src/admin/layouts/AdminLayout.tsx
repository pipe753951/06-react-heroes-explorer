import { Outlet } from "react-router";

export const AdminLayout = function () {
  return (
    <div className="bg-blue-500">
      <Outlet />
    </div>
  );
};
