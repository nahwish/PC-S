import { useCallback } from "react";
import { usePokemonStore } from "@/app/lib/store/usePokemonStore/usePokemonStore";
import { obtenerTodosLosPokemons } from "@/app/services/get/getPokemons";

export function useCargarPokemons() {
  const { setPokemons, setEstaCargando } = usePokemonStore();

  const cargarPokemons = useCallback(async () => {
    const poke = await obtenerTodosLosPokemons();

    setPokemons(poke);
    setEstaCargando(false);
  }, [setPokemons, setEstaCargando]);

  return cargarPokemons;
}
