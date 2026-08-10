import { usePokemonStore } from "@/app/lib/store/usePokemonStore/usePokemonStore";
import {
	typeColors,
	typeGradientColors,
	typeIcons,
} from "@/app/lib/model/card";
import { Pokemon } from "@/app/lib/pokemon";
import Image from "next/image";
import { FaSkull } from "react-icons/fa6";
import Contenedor from "../../base/card/Contenedor";
import Fondo from "../../base/card/Fondo";
import { obtenerTipo } from "@/app/lib/utils/obtenerTipo";

const Card = ({ pokemon }: { pokemon: Pokemon }) => {
	const { primerTipo } = obtenerTipo(pokemon);
	const { setSelectedPokemon } = usePokemonStore();

	const imagenDefault =
		pokemon.sprites.other["official-artwork"].front_default ||
		pokemon.sprites.other.showdown.front_default ||
		"";

	const handleClick = () => {
		setSelectedPokemon(pokemon);
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Enter" || e.key === " ") {
			e.preventDefault();
			handleClick();
		}
	};

	return (
		<Contenedor
			pokemon={pokemon}
			onClick={handleClick}
			onKeyDown={handleKeyDown}
			className='relative w-56 h-72 max-w-xs mx-auto rounded-2xl border-4 border-yellow-400 shadow-2xl bg-gradient-to-br from-yellow-100 via-white to-yellow-200 overflow-visible transition-transform hover:scale-105 duration-200'
		>
			<Fondo pokemon={pokemon}>
				{/* Número */}
				<div
					className={`absolute top-3 left-3 bg-white/90 border-2 border-yellow-400 rounded-full px-3 py-1 text-xs font-bold text-gray-700 shadow z-20`}
				>
					#{pokemon.id}
				</div>
				<div className='relative lg:h-32 flex items-center justify-center overflow-hidden rounded-t-xl h-full w-full flex-col'>
					{" "}
					{/* Limitar overflow */}
					<div
						className={`absolute opacity-30 w-full  h-24 lg:h-32 rounded-t-xl bg-gradient-to-b ${typeGradientColors[primerTipo]?.join(" ") ||
							"from-gray-300 via-gray-200 to-gray-100"
							}`}
					></div>
					{imagenDefault ?
						<div className='relative z-10 h-20 w-20'>
							<Image
								unoptimized
								src={imagenDefault}
								alt={`Imagen de ${pokemon.name}`}
								fill
								className='object-contain'
							/>
						</div>
						: null}
					<h3
						className='bg-white/90 border-2 border-yellow-400 rounded-lg px-2 py-1 text-center text-xs uppercase font-extrabold text-gray-900 shadow mb-2'
						title={pokemon.name}
					>
						{pokemon.name}
					</h3>
				</div>
				{/* Nombre y tipos */}

				<div className=' flex-col h-full justify-end items-end'>
					<span className='bg-slate-300 rounded-full font-bold text-gray-700 lg:hidden'>
						#{pokemon.id}
					</span>
					<div className='lg:flex justify-center mt-3 hidden'>
						{pokemon.types.map((type, index) => (
							<span
								key={index}
								className={`flex items-center justify-center ${typeColors[type.type.name] || "bg-gray-300"} text-white p-1  w-full text-lg shadow-md`}
								aria-label={`Tipo: ${type.type.name}`}
							>
								{typeIcons[type.type.name] || <FaSkull />}
							</span>
						))}
					</div>
					<div className='lg:hidden flex justify-center'>
						{pokemon.types.map((type, index) => (
							<span
								key={index}
								className={`flex items-center justify-center ${typeColors[type.type.name] || "bg-gray-300"} text-white  w-full text-lg shadow-md`}
								aria-label={`Tipo: ${type.type.name}`}
							>
								{type.type.name || ""}
							</span>
						))}
					</div>

				</div>
			</Fondo>
		</Contenedor>
	);
};

export default Card;
