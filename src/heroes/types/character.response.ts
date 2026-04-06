export interface Character {
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
  status: CharacterStatus;
  category: CharacterCategory;
  universe: CharacterUniverse;
}

export type CharacterCategory = "Hero" | "Villain";
export type CharacterStatus = "Active" | "Inactive" | "Retired";
export type CharacterTeam = "Vengadores" | "Liga de la Justicia";
export type CharacterUniverse = "DC" | "Marvel";
