import type { Character } from "./character.response";

export interface SummaryInformationResponse {
  totalHeroes: number;
  strongestHero: Character;
  smartestHero: Character;
  heroCount: number;
  villainCount: number;
}
