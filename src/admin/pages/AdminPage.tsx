import CustomBreadcrumbs from "@/components/custom/CustomBreadcrumbs";

const AdminPage = function () {
  return (
    <div>
      <CustomBreadcrumbs
        items={[
          {
            href: "/",
            name: "Inicio",
          },
          {
            href: "admin/",
            name: "Panel de Administración",
          },
        ]}
      />

      <div>AdminPage</div>
    </div>
  );
};

export default AdminPage;
