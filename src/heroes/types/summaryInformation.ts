import type { Character } from "./character.response";

export interface SummaryInformation {
  totalCharacters: number;
  strongestHero: Character;
  smartestHero: Character;
  heroCount: number;
  villainCount: number;
}
