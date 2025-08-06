"use client"
import { useEffect, useCallback } from "react"
import { useTipoStore } from "@/app/lib/index"
import { obtenerTodosLosTipos } from "./services/get/getTipos"
import Cards from "./components/ui/card/Cards"
import { usePokemonStore } from "./lib/store/usePokemonStore/usePokemonStore"
import { obtenerTodosLosPokemons } from "./services/get/getPokemons"
import Nav from "./components/ui/nav/Nav"

export default function Home() {
	const { setPokemonTipo } = useTipoStore()
    const { setPokemons, setEstaCargando } = usePokemonStore()
    // ✅ Obtener todos los pokemones inicialmente
    const getPokemons = useCallback(async () => {
      const poke = await obtenerTodosLosPokemons()
  
      setPokemons(poke)
      setEstaCargando(false)
    }, [])
  
    useEffect(() => {
      getPokemons()
    }, [getPokemons])
	// ✅ Llamada para obtener los tipos de Pokémon (solo una vez)
	const getTiposPokemon = useCallback(async () => {
		try {
			const response = await obtenerTodosLosTipos()
			const tiposConId = response.map((tipo: any, index: number) => ({
				id: index + 1,
				nombre: tipo.name.charAt(0).toUpperCase() + tipo.name.slice(1),
			}))
			setPokemonTipo(tiposConId)
		} catch (error) {
			console.error("Error al obtener los tipos de Pokémon:", error)
		}
	}, [])

	useEffect(() => {
		getTiposPokemon()
	}, [getTiposPokemon])

	return (
		<div>
			<main>
				{/* ✅ Select con estilos de Tailwind */}
				<nav className='bg-white p-4 shadow-md flex justify-center gap-4 fixed w-full z-50'>
          <Nav/>
        </nav>
				{/* ✅ Mostrar las cartas */}
				<Cards />
			</main>
		</div>
	)
}
