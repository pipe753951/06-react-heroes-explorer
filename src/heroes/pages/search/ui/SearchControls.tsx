import { useRef, type KeyboardEvent } from "react";

import { Search, Filter, SortAsc, Grid, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSearchParams } from "react-router";
import { Slider } from "@/components/ui/slider";
import {
  AccordionItem,
  AccordionContent,
  Accordion,
} from "@/components/ui/accordion";

const SearchControls = function () {
  const [searchParams, setSearchParams] = useSearchParams();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const isAdvancedSearchFiltersOn = searchParams.get("advanced_search") ?? "";
  const currentMinStrengthSearchFilter = Number(
    searchParams.get("strength") ?? 0,
  );

  const handleSearchInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== "Enter") return;
    setSearchParams((prevParams) => {
      const newParams = new URLSearchParams(prevParams);
      const inputValue = inputRef.current?.value;
      if (!inputValue) newParams.delete("search_query");
      else newParams.set("search_query", inputValue);
      return newParams;
    });
  };

  const handleFilterButtonClick = () => {
    setSearchParams((prevParams) => {
      const newParams = new URLSearchParams(prevParams);
      const switchedAdvancedSearchFiltersState = !isAdvancedSearchFiltersOn;
      if (!switchedAdvancedSearchFiltersState)
        newParams.delete("advanced_search");
      else newParams.set("advanced_search", "1");
      return newParams;
    });
  };

  const handleSliderMove = (value: number[]) => {
    setSearchParams((prevParams) => {
      const newParams = new URLSearchParams(prevParams);
      const newStrengthSliderValue = value[0];
      if (!newStrengthSliderValue) newParams.delete("strength");
      else newParams.set("strength", newStrengthSliderValue.toString());
      return newParams;
    });
  };

  return (
    <>
      <div className="mb-8 flex flex-col gap-4 lg:flex-row">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute top-1/2 left-3 size-5 -translate-y-1/2 transform text-gray-400" />
          <Input
            ref={inputRef}
            defaultValue={searchParams.get("search_query") ?? ""}
            placeholder="Busca héroes, villanos, poderes, equipos, etc."
            className="bg-background border-ring h-12 pl-12 text-lg"
            onKeyDown={handleSearchInputKeyDown}
          />
        </div>
        {/* Action buttons */}
        <div className="flex gap-2">
          <Button
            onClick={handleFilterButtonClick}
            variant={isAdvancedSearchFiltersOn ? "default" : "outline"}
            className="h-12"
          >
            <Filter className="mr-2 size-4" />
            Filtros
          </Button>
          <Button variant="outline" className="h-12">
            <SortAsc className="mr-2 size-4" />
            Ordenar por Nombre
          </Button>
          <Button variant="outline" className="h-12">
            <Grid className="size-4" />
          </Button>
          <Button className="h-12">
            <Plus className="mr-2 size-4" />
            Añade un Personaje
          </Button>
        </div>
      </div>

      {/* Advanced Filters */}
      <div className="mx-auto w-full max-w-6xl p-4">
        <Accordion
          type="single"
          collapsible
          value={isAdvancedSearchFiltersOn}
          className="bg-white"
        >
          <AccordionItem value="1" className="data-open:bg-transparent">
            <AccordionContent className="p-7">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-3xl font-semibold">Filtros avanzados</h2>
                <Button variant="text">Limpiar todo</Button>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Equipo</label>
                  <div className="border-input bg-background h-10 w-full rounded-md border px-3 py-2 text-sm">
                    Cualquiera
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Categoría</label>
                  <div className="border-input bg-background h-10 w-full rounded-md border px-3 py-2 text-sm">
                    Cualquiera
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Universo</label>
                  <div className="border-input bg-background h-10 w-full rounded-md border px-3 py-2 text-sm">
                    Cualquiera
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Estado</label>
                  <div className="border-input bg-background h-10 w-full rounded-md border px-3 py-2 text-sm">
                    Cualquiera
                  </div>
                </div>
              </div>
              <div className="mt-5 px-4">
                <label className="text-sm font-medium">
                  Fuerza mínima: {currentMinStrengthSearchFilter}/10
                </label>
                <Slider
                  className="my-4"
                  defaultValue={[currentMinStrengthSearchFilter]}
                  onValueChange={handleSliderMove}
                  max={10}
                  step={1}
                />
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </>
  );
};

export default SearchControls;
