import type { Character } from "./character.response";

export interface HeroesResponse {
  total: number;
  pages: number;
  heroes: Character[];
}
