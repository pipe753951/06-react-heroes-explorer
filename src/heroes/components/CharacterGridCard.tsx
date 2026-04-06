import { Heart, Eye, Zap, Brain, Gauge, Shield } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type {
  CharacterCategory,
  CharacterTeam,
  CharacterUniverse,
} from "../types/character.response";
import { useNavigate } from "react-router";

interface Props {
  active: boolean;
  name: string;
  characterCategory: CharacterCategory;
  universe: CharacterUniverse;
  createdAtYear: string;
  description: string;
  durability: number;
  favorite: boolean;
  imageURL: string;
  intelligence: number;
  alias: string;
  powers: string[];
  slug: string;
  speed: number;
  strength: number;
  team: CharacterTeam;
}

const characterCategoryClassNames: Record<CharacterCategory, string> = {
  Hero: "bg-green-100 text-green-800 border-green-200",
  Villain: "bg-red-100 text-red-800 border-red-200",
};

const characterCategoryNames: Record<CharacterCategory, string> = {
  Hero: "Héroe",
  Villain: "Villano",
};

const universeBadgeClassNames: Record<CharacterUniverse, string> = {
  DC: "bg-blue-600",
  Marvel: "bg-red-600",
};

const CharacterGridCard = function (props: Props) {
  const {
    active,
    name,
    characterCategory,
    universe,
    createdAtYear,
    description,
    durability,
    favorite,
    imageURL,
    intelligence,
    alias,
    powers,
    slug,
    speed,
    strength,
    team,
  } = props;

  const navigate = useNavigate();

  const handleImageClick = () => {
    navigate(`/character/${slug}`);
  };

  return (
    <section>
      <Card className="group overflow-hidden bg-linear-to-br from-white to-gray-50 p-0 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
        <div className="relative h-64 overflow-hidden">
          <img
            onClick={handleImageClick}
            src={imageURL}
            alt={alias}
            className="size-full cursor-pointer object-cover object-[50%_20%] transition-all duration-500 group-hover:scale-110"
          />
          {/* Status indicator */}
          <div className="absolute top-3 left-3 flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-green-500" />
            <Badge
              variant="secondary"
              className="bg-white/90 text-xs text-gray-700"
            >
              {active ? "Activo" : "Inactivo"}
            </Badge>
          </div>
          {/* Universe badge */}
          <Badge
            className={`absolute top-3 right-3 text-xs text-white ${universeBadgeClassNames[universe]}`}
          >
            {universe}
          </Badge>
          {/* Favorite button */}
          <Button
            size="sm"
            variant="text"
            className="absolute right-3 bottom-3 bg-white/90 hover:bg-white"
            aria-label={favorite ? "Quitar de favoritos" : "Añadir a favoritos"}
          >
            <Heart
              className={`size-4 ${favorite ? "fill-red-500 text-red-500" : "text-gray-600"}`}
            />
          </Button>
          {/* View details button */}
          <Button
            size="sm"
            variant="text"
            className="absolute bottom-3 left-3 bg-white/90 opacity-0 transition-opacity group-hover:opacity-100 hover:bg-white"
            aria-label={`Ver detalles de ${alias}`}
          >
            <Eye className="h-4 w-4 text-gray-600" />
          </Button>
        </div>
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <h2 className="text-lg leading-tight font-bold">{alias}</h2>
              <p className="text-sm text-gray-600">{name}</p>
            </div>
            <Badge
              className={`text-xs ${characterCategoryClassNames[characterCategory]}`}
            >
              {characterCategoryNames[characterCategory]}
            </Badge>
          </div>
          <Badge variant="outline" className="w-fit text-xs">
            {team}
          </Badge>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="line-clamp-2 text-sm text-gray-600">{description}</p>
          {/* Stats */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-1">
                <Zap className="h-3 w-3 text-orange-500" />
                <span className="text-xs font-medium">Fuerza</span>
              </div>
              <Progress
                value={strength * 10}
                indicatorClassName="bg-orange-500"
              />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-1">
                <Brain className="h-3 w-3 text-blue-500" />
                <span className="text-xs font-medium">Inteligencia</span>
              </div>
              <Progress
                value={intelligence * 10}
                indicatorClassName="bg-blue-500"
              />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-1">
                <Gauge className="h-3 w-3 text-green-500" />
                <span className="text-xs font-medium">Velocidad</span>
              </div>
              <Progress value={speed * 10} indicatorClassName="bg-green-500" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-1">
                <Shield className="h-3 w-3 text-gray-500" />
                <span className="text-xs font-medium">Resistencia</span>
              </div>
              <Progress
                value={durability * 10}
                indicatorClassName="bg-gray-500"
              />
            </div>
          </div>
          {/* Powers */}
          <div className="space-y-2">
            <h2 className="text-sm font-medium">Poderes:</h2>
            <div className="flex flex-wrap gap-1">
              {powers.slice(0, 2).map((power) => (
                <Badge
                  key={power.toLowerCase()}
                  variant="outline"
                  className="text-xs"
                >
                  {power}
                </Badge>
              ))}
              {powers.length > 2 && (
                <Badge variant="outline" className="bg-gray-100 text-xs">
                  {`+${powers.length - 2} more`}
                </Badge>
              )}
            </div>
          </div>
          <div className="border-t py-5 text-xs text-gray-500">
            First appeared: {createdAtYear}
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default CharacterGridCard;
