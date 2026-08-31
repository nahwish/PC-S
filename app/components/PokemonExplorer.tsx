"use client";
import { useEffect, useCallback } from "react";
import { useTipoStore } from "@/app/lib/index";
import { obtenerTodosLosTipos } from "@/app/services/get/getTipos";
import Cards from "@/app/components/ui/card/Cards";
import { PokemonModal } from "@/app/components/ui/modal";
import Nav from "@/app/components/ui/nav/Nav";
import { useCargarPokemons } from "@/app/lib/hooks/useCargarPokemons";

export default function PokemonExplorer() {
  const { setPokemonTipo } = useTipoStore();
  const cargarPokemons = useCargarPokemons();

  useEffect(() => {
    cargarPokemons();
  }, [cargarPokemons]);

  // ✅ Llamada para obtener los tipos de Pokémon (solo una vez)
  const getTiposPokemon = useCallback(async () => {
    try {
      const response = await obtenerTodosLosTipos();
      const tiposConId = response.map((tipo: any, index: number) => ({
        id: index + 1,
        nombre: tipo.name.charAt(0).toUpperCase() + tipo.name.slice(1),
      }));
      setPokemonTipo(tiposConId);
    } catch (error) {
      console.error("Error al obtener los tipos de Pokémon:", error);
    }
  }, [setPokemonTipo]);

  useEffect(() => {
    getTiposPokemon();
  }, [getTiposPokemon]);

  return (
    <>
      <nav className="bg-white p-4 shadow-md flex justify-center gap-4 fixed w-full z-50">
        <Nav />
      </nav>
      <Cards />
      <PokemonModal />
    </>
  );
}
