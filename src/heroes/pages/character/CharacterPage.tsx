import { useParams } from "react-router";

import { Shield, Zap, Brain, Gauge, Users, Star, Award } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import type {
  CharacterCategory,
  CharacterStatus,
  CharacterUniverse,
} from "@/heroes/types/character.response";
import useCharacterInformation from "@/heroes/hooks/useCharacterInformation";

export function CharacterPage() {
  const { idOrSlug: characterIdOrSlug = "clark-kent" } = useParams();
  const { data: characterInformation } =
    useCharacterInformation(characterIdOrSlug);

  if (characterInformation === undefined) {
    return <div>Cargando...</div>;
  }

  // const characterInformation = {};
  const totalPower =
    characterInformation.strength +
    characterInformation.intelligence +
    characterInformation.speed +
    characterInformation.durability;
  const averagePower = Math.round((totalPower / 4) * 10);

  const getStatusColor = (status: CharacterStatus) => {
    switch (status) {
      case "Active":
        return "bg-green-500";
      case "Inactive":
        return "bg-gray-500";
      case "Retired":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  const getCategoryColor = (category: CharacterCategory): string => {
    switch (category) {
      case "Hero":
        return "bg-blue-500";
      case "Villain":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getUniverseColor = (category: CharacterUniverse): string => {
    switch (category) {
      case "DC":
        return "bg-blue-500";
      case "Marvel":
        return "bg-red-500";
      default:
        return "border-white/30 bg-white/20";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Banner */}
      <div className="bg-linear-to-r from-slate-900 via-blue-900 to-slate-900 text-white">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="flex flex-col items-center gap-8 md:flex-row">
            <div className="relative">
              <img
                src={characterInformation.image || "/placeholder.svg"}
                alt={characterInformation.alias}
                width={200}
                height={200}
                className="rounded-full border-4 border-white/20 shadow-2xl"
              />
              <div className="absolute -top-2 -right-2">
                <div className="rounded-full bg-yellow-400 p-2 text-black">
                  <Star className="h-6 w-6" />
                </div>
              </div>
            </div>

            <div className="flex-1 text-center md:text-left">
              <div className="mb-4 flex flex-wrap justify-center gap-2 md:justify-start">
                <Badge
                  className={`${getCategoryColor(characterInformation.category)} text-white`}
                >
                  {characterInformation.category}
                </Badge>
                <Badge
                  className={`${getStatusColor(characterInformation.status)} text-white`}
                >
                  {characterInformation.status}
                </Badge>
                <Badge
                  variant="secondary"
                  className={getUniverseColor(characterInformation.universe)}
                >
                  {characterInformation.universe}
                </Badge>
              </div>

              <h1 className="mb-2 text-4xl font-bold md:text-6xl">
                {characterInformation.alias}
              </h1>
              <p className="mb-4 text-xl text-blue-200">
                {characterInformation.name}
              </p>
              <p className="max-w-2xl text-lg text-gray-300">
                {characterInformation.description}
              </p>
            </div>

            <div className="text-center">
              <div className="rounded-lg bg-white/10 p-6 backdrop-blur-sm">
                <div className="text-3xl font-bold text-yellow-400">
                  {averagePower}%
                </div>
                <div className="text-sm text-gray-300">Nivel de Poder</div>
                <div className="mt-2 flex justify-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < Math.floor(averagePower / 20) ? "fill-current text-yellow-400" : "text-gray-400"}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-6 py-8">
        <Tabs defaultValue="stats" className="w-full">
          <TabsList className="mb-8 grid w-full grid-cols-4">
            <TabsTrigger value="stats" className="flex items-center gap-2">
              <Gauge className="h-4 w-4" />
              Estadísticas
            </TabsTrigger>
            <TabsTrigger value="powers" className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              Poderes
            </TabsTrigger>
            <TabsTrigger value="team" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Equipo
            </TabsTrigger>
            <TabsTrigger value="info" className="flex items-center gap-2">
              <Award className="h-4 w-4" />
              Información
            </TabsTrigger>
          </TabsList>

          <TabsContent value="stats" className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {/* Strength */}
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="mb-4 flex justify-center">
                    <div className="rounded-full bg-red-100 p-3">
                      <Zap className="h-8 w-8 text-red-600" />
                    </div>
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">Fuerza</h3>
                  <div className="mb-2 text-3xl font-bold text-red-600">
                    {characterInformation.strength}
                  </div>
                  <Progress
                    value={characterInformation.strength * 10}
                    className="h-2"
                  />
                </CardContent>
              </Card>

              {/* Intelligence */}
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="mb-4 flex justify-center">
                    <div className="rounded-full bg-purple-100 p-3">
                      <Brain className="h-8 w-8 text-purple-600" />
                    </div>
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">Inteligencia</h3>
                  <div className="mb-2 text-3xl font-bold text-purple-600">
                    {characterInformation.intelligence}
                  </div>
                  <Progress
                    value={characterInformation.intelligence * 10}
                    className="h-2"
                  />
                </CardContent>
              </Card>

              {/* Speed */}
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="mb-4 flex justify-center">
                    <div className="rounded-full bg-yellow-100 p-3">
                      <Gauge className="h-8 w-8 text-yellow-600" />
                    </div>
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">Velocidad</h3>
                  <div className="mb-2 text-3xl font-bold text-yellow-600">
                    {characterInformation.speed}
                  </div>
                  <Progress
                    value={characterInformation.speed * 10}
                    className="h-2"
                  />
                </CardContent>
              </Card>

              {/* Durability */}
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="mb-4 flex justify-center">
                    <div className="rounded-full bg-green-100 p-3">
                      <Shield className="h-8 w-8 text-green-600" />
                    </div>
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">Resistencia</h3>
                  <div className="mb-2 text-3xl font-bold text-green-600">
                    {characterInformation.durability}
                  </div>
                  <Progress
                    value={characterInformation.durability * 10}
                    className="h-2"
                  />
                </CardContent>
              </Card>
            </div>

            {/* Power Comparison Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Comparación de Habilidades</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-24 text-sm font-medium">Fuerza</div>
                    <div className="flex-1">
                      <Progress
                        value={characterInformation.strength * 10}
                        className="h-4"
                      />
                    </div>
                    <div className="w-12 text-right font-bold">
                      {characterInformation.strength}/10
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-24 text-sm font-medium">Inteligencia</div>
                    <div className="flex-1">
                      <Progress
                        value={characterInformation.intelligence * 10}
                        className="h-4"
                      />
                    </div>
                    <div className="w-12 text-right font-bold">
                      {characterInformation.intelligence}/10
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-24 text-sm font-medium">Velocidad</div>
                    <div className="flex-1">
                      <Progress
                        value={characterInformation.speed * 10}
                        className="h-4"
                      />
                    </div>
                    <div className="w-12 text-right font-bold">
                      {characterInformation.speed}/10
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-24 text-sm font-medium">Resistencia</div>
                    <div className="flex-1">
                      <Progress
                        value={characterInformation.durability * 10}
                        className="h-4"
                      />
                    </div>
                    <div className="w-12 text-right font-bold">
                      {characterInformation.durability}/10
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="powers">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-6 w-6 text-yellow-500" />
                  Superpoderes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {characterInformation.powers.map((power, index) => (
                    <div
                      key={index}
                      className="rounded-lg border border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 p-4"
                    >
                      <div className="flex items-center gap-3">
                        <div className="rounded-full bg-blue-500 p-2">
                          <Zap className="h-4 w-4 text-white" />
                        </div>
                        <span className="font-medium text-blue-900">
                          {power}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="team">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-6 w-6 text-green-500" />
                  Afiliación de Equipo
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="py-8 text-center">
                  <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-green-100 p-6">
                    <Users className="h-12 w-12 text-green-600" />
                  </div>
                  <h3 className="mb-2 text-2xl font-bold text-green-700">
                    {characterInformation.team}
                  </h3>
                  <p className="text-gray-600">
                    Miembro activo del equipo de superhéroes más poderoso
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="info">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Detalles Personales</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between border-b py-2">
                    <span className="text-gray-600">Nombre Real:</span>
                    <span className="font-semibold">
                      {characterInformation.name}
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-b py-2">
                    <span className="text-gray-600">Alias:</span>
                    <span className="font-semibold">
                      {characterInformation.alias}
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-b py-2">
                    <span className="text-gray-600">Categoría:</span>
                    <Badge
                      className={`${getCategoryColor(characterInformation.category)} text-white`}
                    >
                      {characterInformation.category}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-gray-600">Estado:</span>
                    <Badge
                      className={`${getStatusColor(characterInformation.status)} text-white`}
                    >
                      {characterInformation.status}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Información del Universo</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between border-b py-2">
                    <span className="text-gray-600">Universo:</span>
                    <span className="font-semibold">
                      {characterInformation.universe}
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-b py-2">
                    <span className="text-gray-600">Primera Aparición:</span>
                    <span className="font-semibold">
                      {characterInformation.firstAppearance}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-gray-600">Años Activo:</span>
                    <span className="font-semibold">
                      {new Date().getFullYear() -
                        Number.parseInt(
                          characterInformation.firstAppearance,
                        )}{" "}
                      años
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default CharacterPage;
