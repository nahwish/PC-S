import axios from "axios";
import { Pokemon } from "@/app/lib";

interface PokemonData {
  name: string;
  url: string;
}

export const obtenerListaPokemons = async () => {
  try {
    const response = await axios.get("https://pokeapi.co/api/v2/pokemon/");
    return response.data.results; // [{ name, url }, { name, url }, ...]
  } catch (error) {
    console.error("Error obteniendo la lista de Pokémon", error);
    return [];
  }
};
export const obtenerDetallesPokemon = async (url: string) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(`Error obteniendo datos de ${url}`, error);
    return null; // En caso de error, devolver null para manejarlo después
  }
};

export const obtenerTodosLosPokemons = async () => {
  const listaPokemons = await obtenerListaPokemons();

  const detallesPokemons = await Promise.all(
    listaPokemons.map((pokemon : PokemonData) => obtenerDetallesPokemon(pokemon.url))
  );

  return detallesPokemons.filter((poke) => poke !== null);
};

