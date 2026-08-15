import axios from "axios";
import type { Pokemon } from "@/app/lib/pokemon";

export const obtenerPokemonPorNombre = async (
  nombre: string,
): Promise<Pokemon | null> => {
  const normalized = nombre.trim().toLowerCase();
  if (!normalized) return null;

  try {
    const response = await axios.get<Pokemon>(
      `https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(normalized)}`,
    );
    return response.data;
  } catch (error) {
    console.error(`Error obteniendo datos de ${normalized}`, error);
    return null;
  }
};


