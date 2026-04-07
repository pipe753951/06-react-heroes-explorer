import { use } from "react";
import { useNavigate } from "react-router";

import { Heart, Eye, Zap, Brain, Gauge, Shield } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

import { FavoriteCharacterContext } from "../context/FavoriteCharacterContext";
import type {
  Character,
  CharacterCategory,
  CharacterStatus,
  CharacterUniverse,
} from "../types/character.response";

interface Props {
  character: Character;
}

const characterCategoryClassNames: Record<CharacterCategory, string> = {
  Hero: "bg-green-100 text-green-800 border-green-200",
  Villain: "bg-red-100 text-red-800 border-red-200",
};

const characterCategoryNames: Record<CharacterCategory, string> = {
  Hero: "Héroe",
  Villain: "Villano",
};
const characterStatusNames: Record<CharacterStatus, string> = {
  Active: "Activo",
  Inactive: "Inactivo",
  Retired: "Retirado",
};

const universeBadgeClassNames: Record<CharacterUniverse, string> = {
  DC: "bg-blue-600",
  Marvel: "bg-red-600",
};

const CharacterGridCard = function ({ character }: Props) {
  const navigate = useNavigate();
  const { checkFavoriteCharacter, toggleFavoriteCharacter } = use(
    FavoriteCharacterContext,
  );
  const isCharacterFavorite = checkFavoriteCharacter(character);

  const handleImageClick = () => {
    navigate(`/character/${character.slug}`);
  };

  const handleFavoriteButtonClick = () => {
    toggleFavoriteCharacter(character);
  };

  return (
    <section>
      <Card className="group overflow-hidden bg-linear-to-br from-white to-gray-50 p-0 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
        <div className="relative h-64 overflow-hidden">
          <img
            onClick={handleImageClick}
            src={character.image}
            alt={character.alias}
            className="size-full cursor-pointer object-cover object-[50%_20%] transition-all duration-500 group-hover:scale-110"
          />
          {/* Status indicator */}
          <div className="absolute top-3 left-3 flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-green-500" />
            <Badge
              variant="secondary"
              className="bg-white/90 text-xs text-gray-700"
            >
              {characterStatusNames[character.status]}
            </Badge>
          </div>
          {/* Universe badge */}
          <Badge
            className={`absolute top-3 right-3 text-xs text-white ${universeBadgeClassNames[character.universe]}`}
          >
            {character.universe}
          </Badge>
          {/* Favorite button */}
          <Button
            onClick={handleFavoriteButtonClick}
            size="sm"
            variant="text"
            className="absolute right-3 bottom-3 bg-white/90 hover:bg-white"
            aria-label={
              isCharacterFavorite ? "Quitar de favoritos" : "Añadir a favoritos"
            }
          >
            <Heart
              className={`size-4 ${isCharacterFavorite ? "fill-red-500 text-red-500" : "text-gray-600"}`}
            />
          </Button>
          {/* View details button */}
          <Button
            size="sm"
            variant="text"
            className="absolute bottom-3 left-3 bg-white/90 opacity-0 transition-opacity group-hover:opacity-100 hover:bg-white"
            aria-label={`Ver detalles de ${character.alias}`}
          >
            <Eye className="h-4 w-4 text-gray-600" />
          </Button>
        </div>
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <h2 className="text-lg leading-tight font-bold">
                {character.alias}
              </h2>
              <p className="text-sm text-gray-600">{character.name}</p>
            </div>
            <Badge
              className={`text-xs ${characterCategoryClassNames[character.category]}`}
            >
              {characterCategoryNames[character.category]}
            </Badge>
          </div>
          <Badge variant="outline" className="w-fit text-xs">
            {character.team}
          </Badge>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="line-clamp-2 text-sm text-gray-600">
            {character.description}
          </p>
          {/* Stats */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-1">
                <Zap className="h-3 w-3 text-orange-500" />
                <span className="text-xs font-medium">Fuerza</span>
              </div>
              <Progress
                value={character.strength * 10}
                indicatorClassName="bg-orange-500"
              />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-1">
                <Brain className="h-3 w-3 text-blue-500" />
                <span className="text-xs font-medium">Inteligencia</span>
              </div>
              <Progress
                value={character.intelligence * 10}
                indicatorClassName="bg-blue-500"
              />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-1">
                <Gauge className="h-3 w-3 text-green-500" />
                <span className="text-xs font-medium">Velocidad</span>
              </div>
              <Progress
                value={character.speed * 10}
                indicatorClassName="bg-green-500"
              />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-1">
                <Shield className="h-3 w-3 text-gray-500" />
                <span className="text-xs font-medium">Resistencia</span>
              </div>
              <Progress
                value={character.durability * 10}
                indicatorClassName="bg-gray-500"
              />
            </div>
          </div>
          {/* Powers */}
          <div className="space-y-2">
            <h2 className="text-sm font-medium">Poderes:</h2>
            <div className="flex flex-wrap gap-1">
              {character.powers.slice(0, 2).map((power) => (
                <Badge
                  key={power.toLowerCase()}
                  variant="outline"
                  className="text-xs"
                >
                  {power}
                </Badge>
              ))}
              {character.powers.length > 2 && (
                <Badge variant="outline" className="bg-gray-100 text-xs">
                  {`+${character.powers.length - 2} more`}
                </Badge>
              )}
            </div>
          </div>
          <div className="border-t py-5 text-xs text-gray-500">
            Primera aparición: {character.firstAppearance}
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default CharacterGridCard;
