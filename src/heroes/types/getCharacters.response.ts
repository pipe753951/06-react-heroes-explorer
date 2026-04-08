import type { Character } from "./character.response";

export interface CharactersResponse {
  total: number;
  pages: number;
  heroes: Character[];
}
