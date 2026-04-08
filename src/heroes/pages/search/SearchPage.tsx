import { useSearchParams } from "react-router";

import CharacterGrid from "@/heroes/components/CharacterGrid";
import CharacterStatistics from "@/heroes/components/CharacterStatistics";
import CustomBreadcrumbs from "@/components/custom/CustomBreadcrumbs";
import CustomJumbotron from "@/components/custom/CustomJumbotron";

import SearchControls from "./ui/SearchControls";
import useCharacterSearch from "@/heroes/hooks/useCharacterSearch";

const SearchPage = function () {
  const [searchParams] = useSearchParams();

  const { data: characterSearchResults } = useCharacterSearch({
    name: searchParams.get("search_query") ?? undefined,
    strength: searchParams.get("strength") ?? undefined,
  });

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

      {/* Search results */}
      {characterSearchResults && (
        <CharacterGrid characters={characterSearchResults} />
      )}
    </div>
  );
};

export default SearchPage;
