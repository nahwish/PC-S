"use client"

import { FormEvent, useState } from "react"

interface SearchPokemonProps {
	label?: string
	placeholder?: string
	className?: string
	onSearch?: (value: string) => void
}

const SearchPokemon = ({
	label = "Buscar Pokémon",
	placeholder = "Nombre del Pokémon",
	className = "",
	onSearch,
}: SearchPokemonProps) => {
	const [query, setQuery] = useState("")

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		const value = query.trim()
		onSearch?.(value)
	}

	return (
		<form
			onSubmit={handleSubmit}
			className={`flex items-center gap-2 ${className}`.trim()}
			role='search'
		>
			<label
				htmlFor='pokemon-search'
				className='sr-only'
			>
				{label}
			</label>

			<input
				id='pokemon-search'
				type='search'
				value={query}
				onChange={(event) => setQuery(event.target.value)}
				placeholder={placeholder}
				className='w-56 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-blue-950 shadow-sm transition focus:outline-none focus:ring-2 focus:ring-blue-500'
				aria-label={label}
			/>

			<button
				type='submit'
				className='rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
			>
				Buscar
			</button>
		</form>
	)
}

export default SearchPokemon
