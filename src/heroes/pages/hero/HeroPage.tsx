import CustomBreadcrumbs from "@/components/custom/CustomBreadcrumbs";
import { useParams } from "react-router";

const HeroPage = function () {
  const { slug = "" } = useParams();
  console.log({ slug });

  return (
    <>
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
    </>
  );
};

export default HeroPage;
