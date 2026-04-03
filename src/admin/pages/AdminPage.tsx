import CustomBreadcrumbs from "@/components/custom/CustomBreadcrumbs";

const AdminPage = function () {
  return (
    <div>
      <CustomBreadcrumbs
        items={[
          {
            to: "/",
            label: "Inicio",
          },
          {
            to: "admin/",
            label: "Panel de Administración",
          },
        ]}
      />

      <div>AdminPage</div>
    </div>
  );
};

export default AdminPage;
