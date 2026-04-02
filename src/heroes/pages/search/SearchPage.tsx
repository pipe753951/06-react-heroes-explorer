import CustomJumbotron from "@/components/shared/CustomJumbotron";
import HeroStatistics from "@/heroes/components/HeroStatistics";

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
    </div>
  );
};

export default SearchPage;
