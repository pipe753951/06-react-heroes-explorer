import CustomBreadcrumbs from "@/components/custom/CustomBreadcrumbs";

const HeroPage = function () {
  return (
    <div>
      <CustomBreadcrumbs
        items={[
          {
            to: "/",
            label: "Inicio",
          },
          {
            to: "heroes/",
            label: "Héroes",
          },
          {
            to: "superman/",
            label: "Superman",
          },
        ]}
      />

      <p>HeroPage</p>
    </div>
  );
};

export default HeroPage;
