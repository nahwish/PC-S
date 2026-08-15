import axios from "axios";
import { Pokemon } from "@/app/lib";

export const obtenerPokemonPorNombre = async (nombre: string): Promise<Pokemon | null> => {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${nombre}`);
    return response.data;
  } catch (error) {
    console.error(`Error obteniendo datos de ${nombre}`, error);
    return null;
  }
};


