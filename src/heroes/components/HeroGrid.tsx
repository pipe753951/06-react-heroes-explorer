import HeroGridCard from "./HeroGridCard";

const HeroGrid = function () {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
      {/* Hero Card 1 - Superman */}
      <HeroGridCard
        active
        author="Clark Kent"
        characterType="hero"
        company="dc"
        createdAtYear={1938}
        description="The Last Son of Krypton, protector of Earth and symbol of hope for all humanity."
        durability={100}
        favorite
        intelligence={80}
        name="Superman"
        powers={["Super Strength", "Flight"]}
        speed={90}
        strength={100}
        team="justiceLeague"
      />

      {/* Hero Card 2 - Superman */}
      <HeroGridCard
        active
        author="Clark Kent"
        characterType="hero"
        company="dc"
        createdAtYear={1938}
        description="The Last Son of Krypton, protector of Earth and symbol of hope for all humanity."
        durability={100}
        favorite
        intelligence={80}
        name="Superman 2"
        powers={["Super Strength", "Flight"]}
        speed={90}
        strength={100}
        team="justiceLeague"
      />
    </div>
  );
};

export default HeroGrid;
