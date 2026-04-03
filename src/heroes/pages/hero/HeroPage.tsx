import CustomBreadcrumbs from "@/components/custom/CustomBreadcrumbs";

const HeroPage = function () {
  return (
    <div>
      <CustomBreadcrumbs
        items={[
          {
            href: "/",
            name: "Inicio",
          },
          {
            href: "heroes/",
            name: "Héroes",
          },
          {
            href: "superman/",
            name: "Superman",
          },
        ]}
      />

      <p>HeroPage</p>
    </div>
  );
};

export default HeroPage;
