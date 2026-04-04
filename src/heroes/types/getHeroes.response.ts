import type { Hero } from "./hero.response";

export interface HeroesResponse {
  total: number;
  pages: number;
  heroes: Hero[];
}
