import { useRef, type KeyboardEvent } from "react";

import { Search, Filter, SortAsc, Grid, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSearchParams } from "react-router";

const SearchControls = function () {
  const [searchParams, setSearchParams] = useSearchParams();
  const inputRef = useRef<HTMLInputElement | null>(null);

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
            variant="outline"
            className="hover:bg-background h-12 bg-transparent"
          >
            <Filter className="mr-2 size-4" />
            Filtros
          </Button>
          <Button
            variant="outline"
            className="hover:bg-background h-12 bg-transparent"
          >
            <SortAsc className="mr-2 size-4" />
            Ordenar por Nombre
          </Button>
          <Button
            variant="outline"
            className="hover:bg-background h-12 bg-transparent"
          >
            <Grid className="size-4" />
          </Button>
          <Button className="h-12">
            <Plus className="mr-2 size-4" />
            Añade un Personaje
          </Button>
        </div>
      </div>

      {/* Advanced Filters */}
      <div className="mb-8 rounded-4xl border bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Filtros avanzados</h2>
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
        <div className="mt-4">
          <label className="text-sm font-medium">Fuerza mínima: 0/10</label>
          <div className="relative mt-2 flex w-full touch-none items-center select-none">
            <div className="bg-secondary relative h-2 w-full grow overflow-hidden rounded-full">
              <div
                className="bg-primary absolute h-full"
                style={{ width: "0%" }}
              />
            </div>
            <div className="border-primary bg-background ring-offset-background block h-5 w-5 rounded-full border-2 transition-colors" />
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchControls;
