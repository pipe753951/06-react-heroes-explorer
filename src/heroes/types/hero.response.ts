export interface Hero {
  id: string;
  name: string;
  slug: string;
  alias: string;
  powers: string[];
  description: string;
  strength: number;
  intelligence: number;
  speed: number;
  durability: number;
  team: CharacterTeam;
  image: string;
  firstAppearance: string;
  status: string;
  category: CharacterCategory;
  universe: CharacterUniverse;
}

export type CharacterUniverse = "DC" | "Marvel";
export type CharacterCategory = "Hero" | "Villain";
export type CharacterTeam = "Vengadores" | "Liga de la Justicia";
