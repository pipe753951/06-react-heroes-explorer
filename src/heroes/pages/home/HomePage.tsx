import { useState } from "react";

import { Heart, ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import CustomJumbotron from "@/components/shared/CustomJumbotron";
import HeroStatistics from "@/heroes/components/HeroStatistics";
import SearchControls from "../search/ui/SearchControls";
import HeroGrid from "@/heroes/components/HeroGrid";

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
      <div className="flex items-center justify-center space-x-2">
        <Button variant="outline" size="sm" disabled>
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>

        <Button variant="default" size="sm">
          1
        </Button>
        <Button variant="outline" size="sm">
          2
        </Button>
        <Button variant="outline" size="sm">
          3
        </Button>
        <Button variant="text" size="sm" disabled>
          <MoreHorizontal className="h-4 w-4" />
        </Button>

        <Button variant="outline" size="sm">
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
