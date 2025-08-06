import { create } from "zustand";

interface TipoState {
  pokemonTipo: { id: number; nombre: string }[];
  setPokemonTipo: (pokemonTipo: { id: number; nombre: string }[]) => void;

}

export const useTipoStore = create<TipoState>((set) => ({
  pokemonTipo: [],
  setPokemonTipo: (tipo) => set({ pokemonTipo: tipo }),
}));