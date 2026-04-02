import CustomJumbotron from "@/components/custom/CustomJumbotron";
import HeroStatistics from "@/heroes/components/HeroStatistics";
import SearchControls from "./ui/SearchControls";

const SearchPage = function () {
  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Custom Jumbotron */}
      <CustomJumbotron
        title="Búsqueda de Superhéroes"
        description="Descubre, explora y administra superhéroes y villanos."
      />

      {/* Stats Dashboard */}
      <HeroStatistics />

      {/* Filter and Search */}
      <SearchControls />
    </div>
  );
};

export default SearchPage;
