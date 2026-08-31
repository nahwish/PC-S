import { MetadataRoute } from "next";
import { obtenerListaCompletaPokemons } from "./services/get/getPokemons";
import { SITE_URL } from "./lib/constants";

export const revalidate = 86400;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pokemons = await obtenerListaCompletaPokemons();

  const pokemonEntries: MetadataRoute.Sitemap = pokemons.map((pokemon) => ({
    url: `${SITE_URL}/pokemon/${pokemon.name}`,
    lastModified: new Date(),
  }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
    },
    ...pokemonEntries,
  ];
}
