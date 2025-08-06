import axios from "axios";
import { Pokemon } from "@/app/lib";
import { obtenerDetallesPokemon } from "./getPokemons";

interface PokemonData {
  pokemon: {
    name: string;
    url: string;
  }
}

export const obtenerUrlListaPokemonsPorTipo = async (tipo: number) => {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/type/${tipo}`);
    return response.data.pokemon; // [{ name, url }, { name, url }, ...]
  } catch (error) {
    console.error("Error obteniendo la lista de Pokémon", error);
    return [];
  }
};

export const obtenerListaPokemonsPorTipo = async (tipo: number) => {
  if(tipo == 20) return null
  const listaPokemons = await obtenerUrlListaPokemonsPorTipo(tipo);
  console.log('lista', listaPokemons)
  if (listaPokemons.length === 0)
    return null
  const detallesPokemons = await Promise.all(
    listaPokemons.map((pokemon: PokemonData) => obtenerDetallesPokemon(pokemon.pokemon.url))
  );
  console.log('detalle', detallesPokemons)
  return detallesPokemons.filter((poke) => poke !== null);
};

  // Nuevo servicio que obtiene todos los tipos de Pokémon
 export const obtenerTodosLosTipos = async () => {
    const response = await fetch("https://pokeapi.co/api/v2/type");
    const data = await response.json();
    return data.results; // Devuelve una lista con todos los tipos
  }