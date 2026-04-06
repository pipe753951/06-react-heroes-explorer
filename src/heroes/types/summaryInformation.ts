import type { Hero } from "./hero.response";

export interface SummaryInformation {
  totalCharacters: number;
  strongestHero: Hero;
  smartestHero: Hero;
  heroCount: number;
  villainCount: number;
}
