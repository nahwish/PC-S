interface TipoOption {
	id: number
	nombre: string
}

interface TipoSelectProps {
	label?: string
	id?: string
	options: TipoOption[]
	value?: number
	onChange?: (value: number) => void
	className?: string
}

const TipoSelect = ({
	label = "Seleccionar tipo",
	id = "tipoSelect",
	options,
	value,
	onChange,
	className = "",
}: TipoSelectProps) => {
	const selectClassName = `w-64 p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-blue-950 ${className}`.trim()

	return (
		<>
			<label
				htmlFor={id}
				className='block text-sm font-medium text-gray-700 self-center'
			>
				{label}
			</label>

			<select
				id={id}
				name='tipo'
				{...(value !== undefined ? { value } : { defaultValue: 0 })}
				onChange={(e) => onChange?.(Number(e.target.value))}
				className={selectClassName}
				aria-label={label}
			>
				<option value={0}>Todos los tipos</option>
				{options.map((tipo) => (
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

export default TipoSelect
