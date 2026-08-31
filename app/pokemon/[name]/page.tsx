import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { obtenerListaCompletaPokemons } from "@/app/services/get/getPokemons";
import { obtenerPokemonPorNombre } from "@/app/services/get/getPorNombre";
import { SITE_URL, SITE_NAME } from "@/app/lib/constants";

interface PokemonPageProps {
  params: { name: string };
}

export async function generateStaticParams() {
  const pokemons = await obtenerListaCompletaPokemons();
  return pokemons.map((pokemon) => ({ name: pokemon.name }));
}

const capitalizar = (nombre: string) =>
  nombre.charAt(0).toUpperCase() + nombre.slice(1);

export async function generateMetadata({
  params,
}: PokemonPageProps): Promise<Metadata> {
  const { name } = await params;
  const pokemon = await obtenerPokemonPorNombre(name);

  if (!pokemon) {
    return { title: "Pokémon no encontrado" };
  }

  const nombre = capitalizar(pokemon.name);
  const tipos = pokemon.types.map((t) => t.type.name).join(", ");
  const description = `Descubre todos los datos de ${nombre}: tipos (${tipos}), estadísticas base y habilidades.`;
  const imagen = pokemon.sprites.other["official-artwork"].front_default;

  return {
    title: nombre,
    description,
    alternates: {
      canonical: `${SITE_URL}/pokemon/${pokemon.name}`,
    },
    openGraph: {
      title: `${nombre} | ${SITE_NAME}`,
      description,
      images: imagen ? [{ url: imagen }] : undefined,
    },
  };
}

export default async function PokemonPage({ params }: PokemonPageProps) {
  const { name } = await params;
  const pokemon = await obtenerPokemonPorNombre(name);

  if (!pokemon) {
    notFound();
  }

  const nombre = capitalizar(pokemon.name);
  const imagen =
    pokemon.sprites.other["official-artwork"].front_default ||
    pokemon.sprites.other.showdown.front_default ||
    "";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Thing",
    name: nombre,
    description: `Pokémon de tipo ${pokemon.types.map((t) => t.type.name).join(", ")}`,
    image: imagen || undefined,
    url: `${SITE_URL}/pokemon/${pokemon.name}`,
  };

  return (
    <main className="max-w-2xl mx-auto px-4 py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h1 className="text-3xl font-bold capitalize">
        {nombre} <span className="text-gray-400">#{pokemon.id}</span>
      </h1>
      {imagen && (
        <Image
          unoptimized
          src={imagen}
          alt={`Imagen oficial de ${nombre}`}
          width={300}
          height={300}
          priority
        />
      )}
      <div className="flex gap-2 mt-4">
        {pokemon.types.map((t) => (
          <span
            key={t.type.name}
            aria-label={`Tipo: ${t.type.name}`}
            className="px-3 py-1 rounded-full bg-gray-200 capitalize"
          >
            {t.type.name}
          </span>
        ))}
      </div>
      <h2 className="text-xl font-semibold mt-6">Estadísticas base</h2>
      <ul className="mt-2 space-y-1">
        {pokemon.stats.map((s) => (
          <li key={s.stat.name} className="flex justify-between border-b py-1">
            <span className="capitalize">{s.stat.name.replace("-", " ")}</span>
            <span>{s.base_stat}</span>
          </li>
        ))}
      </ul>
      <h2 className="text-xl font-semibold mt-6">Habilidades</h2>
      <ul className="mt-2 list-disc list-inside">
        {pokemon.abilities.map((a) => (
          <li key={a.ability.name} className="capitalize">
            {a.ability.name.replace("-", " ")}
          </li>
        ))}
      </ul>
    </main>
  );
}
