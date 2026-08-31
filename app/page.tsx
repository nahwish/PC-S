import PokemonExplorer from "./components/PokemonExplorer";
import { obtenerListaCompletaPokemons } from "./services/get/getPokemons";
import { SITE_URL } from "./lib/constants";

export default async function Home() {
  const pokemons = await obtenerListaCompletaPokemons();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: pokemons.slice(0, 100).map((pokemon, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: pokemon.name,
      url: `${SITE_URL}/pokemon/${pokemon.name}`,
    })),
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main>
        <h1 className="sr-only">Pokédex — Todos los Pokémon</h1>
        <PokemonExplorer />
      </main>
    </div>
  );
}
