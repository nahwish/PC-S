import { Pokemon, useTipoStore } from "@/app/lib/index"
import { usePokemonStore } from "@/app/lib/store/usePokemonStore/usePokemonStore"
import { obtenerTodosLosPokemons } from "@/app/services/get/getPokemons"
import { obtenerListaPokemonsPorTipo } from "@/app/services/get/getTipos"
import { useCallback, useEffect } from "react"

const Nav = () => {
	const { setPokemons, setEstaCargando } = usePokemonStore()
	const { pokemonTipo } = useTipoStore()

	// ✅ Obtener todos los pokemones inicialmente
	const getPokemons = useCallback(async () => {
		const poke = await obtenerTodosLosPokemons()

		setPokemons(poke)
		setEstaCargando(false)
	}, [])


	// ✅ Filtrar pokemones por tipo
	const obtenerTipos = async (tipo: number) => {
		console.log("busqueda", tipo)
		if (tipo === 0) {
			getPokemons() // Mostrar todos si selecciona "Todos"
			return
		}
		setEstaCargando(true)
		const listaPokemonsPorTipo = await obtenerListaPokemonsPorTipo(tipo)
		if (listaPokemonsPorTipo == null) {
			setPokemons([])
		} else {
			setPokemons(listaPokemonsPorTipo)
		}
		console.log("Resultado", listaPokemonsPorTipo)
		setEstaCargando(false)
	}
	return (
		<>
			<label
				htmlFor='tipoSelect'
				className='block text-sm font-medium text-gray-700 self-center'
			>
				Seleccionar tipo
			</label>

			<select
				id='tipoSelect'
				name='tipo'
				onChange={(e) => obtenerTipos(Number(e.target.value))}
				className='w-64 p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-blue-950'
				aria-labelledby='tipoSelect'
			>
				<option value={0}>Todos los tipos</option>
				{pokemonTipo.map((tipo) => (
					<option
						key={tipo.id}
						value={tipo.id}
					>
						{tipo.nombre}
					</option>
				))}
			</select>
		</>
	)
}
export default Nav
