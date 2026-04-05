import { useSearchParams } from "react-router";
import { queryOptions, useQuery } from "@tanstack/react-query";

import { Heart } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CustomBreadcrumbs from "@/components/custom/CustomBreadcrumbs";
import CustomJumbotron from "@/components/custom/CustomJumbotron";
import CustomPagination from "@/components/custom/CustomPagination";

import CharacterGrid from "@/heroes/components/CharacterGrid";
import HeroStatistics from "@/heroes/components/HeroStatistics";
import SearchControls from "../search/ui/SearchControls";

import getHeroesByPage from "@/heroes/actions/getHeroesByPage.action";
import { useMemo } from "react";

type HomeTab = "all" | "favorites" | "heroes" | "villains";
const validHomeTabs: HomeTab[] = ["all", "favorites", "heroes", "villains"];

export default function SuperheroApp() {
  const [searchParams, setSearchParams] = useSearchParams();

  const activeTab: HomeTab = useMemo(() => {
    const param = searchParams.get("tab") ?? "";

    if ((validHomeTabs as string[]).includes(param)) return param as HomeTab;

    return "all";
  }, [searchParams]);

  const setActiveTab = (tab: HomeTab) => {
    setSearchParams((prevParams) => {
      prevParams.set("tab", tab);
      return prevParams;
    });
  };

  console.log(+(searchParams.get("index") ?? 0));
  console.log(searchParams.get("offset"));

  // const [activeTab, setActiveTab] = useState<HomeTabs>("all");

  const { data: charactersResponseData } = useQuery(
    queryOptions({
      queryKey: ["heroes"],
      queryFn: getHeroesByPage,
      staleTime: 300000, // 1000 * 60 * 5
    }),
  );

  console.log({ heroesResponseData: charactersResponseData });

  return (
    <div className="mx-auto max-w-7xl p-6">
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
      <HeroStatistics />

      {/* Controls */}
      <SearchControls />

      {/* Tabs */}
      <Tabs value={activeTab} className="mb-8">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all" onClick={() => setActiveTab("all")}>
            All Characters (16)
          </TabsTrigger>
          <TabsTrigger
            value="favorites"
            className="flex items-center gap-2"
            onClick={() => setActiveTab("favorites")}
          >
            <Heart className="h-4 w-4" />
            Favorites (3)
          </TabsTrigger>
          <TabsTrigger value="heroes" onClick={() => setActiveTab("heroes")}>
            Heroes (12)
          </TabsTrigger>
          <TabsTrigger
            value="villains"
            onClick={() => setActiveTab("villains")}
          >
            Villains (2)
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
          {/* <CharacterGrid /> */}
        </TabsContent>
        <TabsContent value="heroes">
          {/* Heroes Grid */}
          {/* <CharacterGrid /> */}
        </TabsContent>
        <TabsContent value="villains">
          {/* Villains Grid */}
          {/* <CharacterGrid /> */}
        </TabsContent>
      </Tabs>

      {/* Pagination */}
      <CustomPagination totalPages={8} currentPage={5} />
    </div>
  );
}
