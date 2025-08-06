type Ability = {
    ability: {
      name: string;
      url: string;
    };
    is_hidden: boolean;
    slot: number;
  };
  
  type Cry = {
    latest: string;
    legacy: string;
  };
  
  type Form = {
    name: string;
    url: string;
  };
  
  type GameIndex = {
    game_index: number;
    version: {
      name: string;
      url: string;
    };
  };
  type Stat = {
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string;
    };
  };
  type PokemonType = {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  };
  type Sprite = string;

type Sprites = {
  back_default: Sprite;
  back_female: Sprite;
  back_shiny: Sprite;
  back_shiny_female: Sprite;
  front_default: Sprite;
  front_female: Sprite;
  front_shiny: Sprite;
  front_shiny_female: Sprite;
  other: {
    dream_world: {
      front_default: Sprite;
      front_female: Sprite;
    };
    home: {
      front_default: Sprite;
      front_female: Sprite;
      front_shiny: Sprite;
      front_shiny_female: Sprite;
    };
    "official-artwork": {
      front_default: Sprite;
      front_shiny: Sprite;
    };
    showdown: {
      back_default: Sprite;
      back_female: Sprite;
      back_shiny: Sprite;
      back_shiny_female: Sprite;
      front_default: Sprite;
      front_female: Sprite;
      front_shiny: Sprite;
      front_shiny_female: Sprite;
    };
  };
  versions: {
    [generation: string]: {
      [game: string]: {
        back_default?: Sprite;
        back_gray?: Sprite;
        back_transparent?: Sprite;
        back_shiny?: Sprite;
        back_shiny_transparent?: Sprite;
        front_default?: Sprite;
        front_gray?: Sprite;
        front_transparent?: Sprite;
        front_shiny?: Sprite;
        front_shiny_transparent?: Sprite;
      };
    };
  };
};

  export type Pokemon = {
    abilities: Ability[];
    base_experience: number;
    cries: Cry;
    forms: Form[];
    game_indices: GameIndex[];
    height: number;
    held_items: unknown[];
    id: number;
    is_default: boolean;
    location_area_encounters: string;
    name: string,
    order: number,
    past_abilities: unknown[],
    past_types: unknown[],
    species: {
      name: string;
      url: string;
    };
    versions:unknown
    stats: Stat[];
    types: PokemonType[];
    weight:number;
    sprites: Sprites;
    moves:unknown[]
  };

 export const estadoInicialPokemon: Pokemon = {
    abilities: [],
    base_experience: 0,
    cries: {
      latest: "",
      legacy: "",
    },
    forms: [],
    game_indices: [],
    height: 0,
    held_items: [],
    id: 0,
    is_default: false,
    location_area_encounters: "",
    name: "",
    order: 0,
    past_abilities: [],
    past_types: [],
    species: {
      name: "",
      url: "",
    },
    versions: {},
    stats: [],
    types: [],
    weight: 0,
    sprites: {
      back_default: "",
      back_female: "",
      back_shiny: "",
      back_shiny_female: "",
      front_default: "",
      front_female: "",
      front_shiny: "",
      front_shiny_female: "",
      other: {
        dream_world: {
          front_default: "",
          front_female: "",
        },
        home: {
          front_default: "",
          front_female: "",
          front_shiny: "",
          front_shiny_female: "",
        },
        "official-artwork": {
          front_default: "",
          front_shiny: "",
        },
        showdown: {
          back_default: "",
          back_female: "",
          back_shiny: "",
          back_shiny_female: "",
          front_default: "",
          front_female: "",
          front_shiny: "",
          front_shiny_female: "",
        },
      },
      versions: {},
    },
    moves: [],
  };
  
  