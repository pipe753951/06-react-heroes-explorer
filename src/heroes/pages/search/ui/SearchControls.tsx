import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, SortAsc, Grid, Plus } from "lucide-react";

const SearchControls = function () {
  return (
    <>
      <div className="flex flex-col lg:flex-row gap-4 mb-8">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 size-5 text-gray-400" />
          <Input
            placeholder="Busca héroes, villanos, poderes, equipos, etc."
            className="pl-12 h-12 text-lg bg-background border-ring"
          />
        </div>
        {/* Action buttons */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="h-12 bg-transparent hover:bg-background"
          >
            <Filter className="size-4 mr-2" />
            Filtros
          </Button>
          <Button
            variant="outline"
            className="h-12 bg-transparent hover:bg-background"
          >
            <SortAsc className="size-4 mr-2" />
            Ordenar por Nombre
          </Button>
          <Button
            variant="outline"
            className="h-12 bg-transparent hover:bg-background"
          >
            <Grid className="size-4" />
          </Button>
          <Button className="h-12">
            <Plus className="size-4 mr-2" />
            Añade un Personaje
          </Button>
        </div>
      </div>

      {/* Advanced Filters */}
      <div className="bg-white rounded-4xl p-6 mb-8 shadow-sm border">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Filtros avanzados</h3>
          <Button variant="text">Limpiar todo</Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Equipo</label>
            <div className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
              Cualquiera
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Categoría</label>
            <div className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
              Cualquiera
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Universo</label>
            <div className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
              Cualquiera
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Estado</label>
            <div className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
              Cualquiera
            </div>
          </div>
        </div>
        <div className="mt-4">
          <label className="text-sm font-medium">Fuerza mínima: 0/10</label>
          <div className="relative flex w-full touch-none select-none items-center mt-2">
            <div className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
              <div
                className="absolute h-full bg-primary"
                style={{ width: "0%" }}
              />
            </div>
            <div className="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors" />
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchControls;
