import { useTipoStore } from "@/app/lib/index"
import { usePokemonStore } from "@/app/lib/store/usePokemonStore/usePokemonStore"
import { obtenerTodosLosPokemons } from "@/app/services/get/getPokemons"
import { obtenerListaPokemonsPorTipo } from "@/app/services/get/getTipos"
import { useCallback } from "react"
import TipoSelect from "@/app/components/ui/select/TipoSelect"
import SearchPokemon from "@/app/components/ui/search/SearchPokemon"
import { obtenerPokemonPorNombre } from "@/app/services/get/getPorNombre"

const Nav = () => {
	const { setPokemons, setEstaCargando } = usePokemonStore()
	const { pokemonTipo } = useTipoStore()

	const getPokemons = useCallback(async () => {
		const poke = await obtenerTodosLosPokemons()

		setPokemons(poke)
		setEstaCargando(false)
	}, [setPokemons, setEstaCargando])

	const obtenerTipos = useCallback(
		async (tipo: number) => {
			if (tipo === 0) {
				await getPokemons()
				return
			}

			setEstaCargando(true)
			const listaPokemonsPorTipo = await obtenerListaPokemonsPorTipo(tipo)

			if (listaPokemonsPorTipo == null) {
				setPokemons([])
			} else {
				setPokemons(listaPokemonsPorTipo)
			}

			setEstaCargando(false)
		},
		[getPokemons, setEstaCargando, setPokemons],
	)

	const buscarPokemon = useCallback(
		async (nombre: string) => {
			const valor = nombre.trim()

			if (!valor) {
				setEstaCargando(true)
				await getPokemons()
				return
			}

			setEstaCargando(true)
			const pokemon = await obtenerPokemonPorNombre(valor.toLowerCase())
			if (pokemon == null) {
				setPokemons([])
				setEstaCargando(false)
				return
			}

			setPokemons([pokemon])
			setEstaCargando(false)
		},
		[getPokemons, setEstaCargando, setPokemons],
	)

	return (
		<nav className='bg-white p-4 shadow-md flex justify-center items-center gap-4 fixed w-full z-50'>
			<TipoSelect
				options={pokemonTipo}
				onChange={obtenerTipos}
			/>
			<SearchPokemon onSearch={buscarPokemon} />
		</nav>
	)
}

export default Nav
