import { use, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router";

import { Heart } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CustomBreadcrumbs from "@/components/custom/CustomBreadcrumbs";
import CustomJumbotron from "@/components/custom/CustomJumbotron";
import CustomPagination from "@/components/custom/CustomPagination";

import CharacterGrid from "@/heroes/components/CharacterGrid";
import CharacterStatistics from "@/heroes/components/CharacterStatistics";
import SearchControls from "../search/ui/SearchControls";

import useCharacterSummary from "@/heroes/hooks/useCharacterSummary";
import usePageNavigation from "@/shared/hooks/usePageNavigation";

import useCharacterPagination from "@/heroes/hooks/useCharacterPagination";
import useCharacterCategory from "@/heroes/hooks/useCharacterCategory";
import { FavoriteCharacterContext } from "@/heroes/context/FavoriteCharacterContext";

export type HomeTab = "all" | "favorites" | "heroes" | "villains";
const validHomeTabs: HomeTab[] = ["all", "favorites", "heroes", "villains"];

export function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { page, limit, setPage } = usePageNavigation({
    searchParams,
    setSearchParams,
  });
  const { favoriteCharactersCount, favoriteCharacters } = use(
    FavoriteCharacterContext,
  );

  const activeTab: HomeTab = useMemo(() => {
    const param = searchParams.get("tab") ?? "";

    if ((validHomeTabs as string[]).includes(param)) return param as HomeTab;

    return "all";
  }, [searchParams]);

  const selectedCategory = useCharacterCategory(activeTab);

  const { data: summary } = useCharacterSummary();
  const { data: charactersResponseData } = useCharacterPagination(
    page,
    limit,
    selectedCategory,
  );

  useEffect(() => {
    const currentParams = new URLSearchParams(window.location.search);
    const tabParam = currentParams.get("tab");

    if (tabParam && (validHomeTabs as string[]).includes(tabParam)) return;

    setSearchParams(
      (prevParams) => {
        const newParams = new URLSearchParams(prevParams);
        newParams.set("tab", "all");
        return newParams;
      },
      { replace: true },
    );
  }, [setSearchParams]);

  const setActiveTab = (tab: HomeTab) => {
    setSearchParams((prevParams) => {
      const newParams = new URLSearchParams(prevParams);
      newParams.set("tab", tab);

      //! setPage doesn't work in this function.
      newParams.set("page", "1");

      return newParams;
    });
  };

  return (
    <div className="mx-auto w-full max-w-7xl p-6">
      {/* Custom Jumbotron */}
      <CustomJumbotron
        title="Universo de Superhéroes"
        description="Descubre, explora y administra superhéroes y villanos."
      />

      <CustomBreadcrumbs
        items={[
          {
            to: "/",
            label: "Inicio",
          },
        ]}
      />

      {/* Stats Dashboard */}
      <CharacterStatistics />

      {/* Controls */}
      <SearchControls />

      {/* Tabs */}
      <Tabs value={activeTab} className="mb-8">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all" onClick={() => setActiveTab("all")}>
            All Characters ({summary?.totalCharacters})
          </TabsTrigger>
          <TabsTrigger
            value="favorites"
            className="flex items-center gap-2"
            onClick={() => setActiveTab("favorites")}
          >
            <Heart className="h-4 w-4" />
            Favorites ({favoriteCharactersCount})
          </TabsTrigger>
          <TabsTrigger value="heroes" onClick={() => setActiveTab("heroes")}>
            Heroes ({summary?.heroCount})
          </TabsTrigger>
          <TabsTrigger
            value="villains"
            onClick={() => setActiveTab("villains")}
          >
            Villains ({summary?.villainCount})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          {/* Character Grid */}
          {charactersResponseData ? (
            <CharacterGrid characters={charactersResponseData.heroes} />
          ) : (
            <p>Cargando...</p>
          )}
        </TabsContent>
        <TabsContent value="favorites">
          {/* Favorites Grid */}
          <CharacterGrid characters={favoriteCharacters} />
        </TabsContent>
        <TabsContent value="heroes">
          {/* Heroes Grid */}
          {charactersResponseData ? (
            <CharacterGrid characters={charactersResponseData.heroes} />
          ) : (
            <p>Cargando...</p>
          )}
        </TabsContent>
        <TabsContent value="villains">
          {/* Villains Grid */}
          {charactersResponseData ? (
            <CharacterGrid characters={charactersResponseData.heroes} />
          ) : (
            <p>Cargando...</p>
          )}
        </TabsContent>
      </Tabs>

      {
        /* Pagination (not shown in favorites tab) */
        activeTab !== "favorites" && (
          <CustomPagination
            totalPages={charactersResponseData?.pages ?? 0}
            currentPage={page}
            onUpdatePage={setPage}
          />
        )
      }
    </div>
  );
}

export default HomePage;
