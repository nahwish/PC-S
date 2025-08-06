import { create } from "zustand";
import { Pokemon } from "../../pokemon";

interface PokemonState {
  pokemons: Pokemon[];  // Puedes cambiar el tipo según tu modelo
  setPokemons: (newPokemons: Pokemon[]) => void;
  estaCargando: boolean;
  setEstaCargando: (newEstacargando: boolean) => void;
}

export const usePokemonStore = create<PokemonState>((set) => ({
  pokemons: [],
  setPokemons: (newPokemons) => set({ pokemons: newPokemons }),
  estaCargando: true,
  setEstaCargando: (newEstacargando) => set({ estaCargando: newEstacargando }),
}));
