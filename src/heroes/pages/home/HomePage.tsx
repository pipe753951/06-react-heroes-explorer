import { useState } from "react";

import { Heart } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import CustomJumbotron from "@/components/custom/CustomJumbotron";
import HeroStatistics from "@/heroes/components/HeroStatistics";
import SearchControls from "../search/ui/SearchControls";
import HeroGrid from "@/heroes/components/HeroGrid";
import CustomPagination from "@/components/custom/CustomPagination";

type HomeTabs = "all" | "favorites" | "heroes" | "villains";

export default function SuperheroApp() {
  const [activeTab, setActiveTab] = useState<HomeTabs>("all");

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Custom Jumbotron */}
      <CustomJumbotron
        title="Universo de Superhéroes"
        description="Descubre, explora y administra superhéroes y villanos."
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
          <HeroGrid />
        </TabsContent>
        <TabsContent value="favorites">
          {/* Favorites Grid */}
          <HeroGrid />
        </TabsContent>
        <TabsContent value="heroes">
          {/* Heroes Grid */}
          <HeroGrid />
        </TabsContent>
        <TabsContent value="villains">
          {/* Villains Grid */}
          <HeroGrid />
        </TabsContent>
      </Tabs>

      {/* Pagination */}
      <CustomPagination totalPages={8} currentPage={5} />
    </div>
  );
}
