import CustomJumbotron from "@/components/custom/CustomJumbotron";
import CharacterStatistics from "@/heroes/components/CharacterStatistics";
import SearchControls from "./ui/SearchControls";
import CustomBreadcrumbs from "@/components/custom/CustomBreadcrumbs";

const SearchPage = function () {
  return (
    <div className="mx-auto w-full max-w-7xl p-6">
      {/* Custom Jumbotron */}
      <CustomJumbotron
        title="Búsqueda de Superhéroes"
        description="Descubre, explora y administra superhéroes y villanos."
      />

      <CustomBreadcrumbs
        items={[
          {
            to: "/",
            label: "Inicio",
          },
          {
            to: "/search",
            label: "Buscar",
          },
        ]}
      />

      {/* Stats Dashboard */}
      <CharacterStatistics />

      {/* Filter and Search */}
      <SearchControls />
    </div>
  );
};

export default SearchPage;
