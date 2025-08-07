import {
	typeColors,
	typeGradientColors,
	typeIcons,
} from "@/app/lib/model/card";
import { Pokemon } from "@/app/lib/pokemon";
import Image from "next/image";
import { useState } from "react";
import { FaSkull } from "react-icons/fa6";
import Contenedor from "../../base/card/Contenedor";
import Fondo from "../../base/card/Fondo";
import { obtenerTipo } from "@/app/lib/utils/obtenerTipo";
import { AiTwotoneSound } from "react-icons/ai";

const Card = ({ pokemon }: { pokemon: Pokemon }) => {
	const { primerTipo, segundoTipo } = obtenerTipo(pokemon);

	const imagenDefault =
  pokemon.sprites.other["official-artwork"].front_default ||
		pokemon.sprites.other.showdown.front_default ||
		"";
  const width = pokemon.width || 100;
	const [isFlipped, setIsFlipped] = useState(false);

	const handleClick = () => setIsFlipped((prev) => !prev);

	const playSound = () => {
		const audio = new Audio(pokemon.cries.latest);
		audio.play();
	};
	return (
		<>
			{isFlipped ?
				<Contenedor
                className="relative w-56 h-72 max-w-xs mx-auto rounded-2xl border-4 border-yellow-400 shadow-2xl bg-gradient-to-br from-yellow-100 via-white to-yellow-200 overflow-visible transition-transform duration-200"
            >
                <Fondo
                    className="h-full flex flex-col justify-center items-center"
                    onClick={handleClick}
                >
                    <h3 className="text-center font-bold text-lg mb-2">Información</h3>
                    <p className="text-sm text-gray-700">Altura: {pokemon.height}</p>
                    <p className="text-sm text-gray-700">Peso: {pokemon.weight}</p>
                    <p className="text-sm text-gray-700">Habilidades:</p>
                    <ul className="text-sm text-gray-700 mb-4">
                        {pokemon.abilities.map((ability, index) => (
                            <li key={index}>{ability.ability.name}</li>
                        ))}
                    </ul>
                    <button
                        onClick={playSound}
                        className="border border-red-600 rounded-full p-2 mt-2 flex justify-center items-center bg-white shadow"
                        aria-label="Reproducir sonido"
                    >
                        <AiTwotoneSound className="text-black text-xl" />
                    </button>
                </Fondo>
            </Contenedor>
			:	<Contenedor
					pokemon={pokemon}
					onClick={handleClick}
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
								className={`absolute opacity-30 w-full  h-24 lg:h-32 rounded-t-xl bg-gradient-to-b ${
                  typeGradientColors[primerTipo]?.join(" ") ||
									"from-gray-300 via-gray-200 to-gray-100"
								}`}
							></div>
							{imagenDefault ?
								<Image
                unoptimized
                src={imagenDefault}
                alt={`Imagen de ${pokemon.name}`}
                width={width}
                height={70}
                className='z-10 lg:max-w-full max-w-20 h-20 lg:h-auto object-contain'
								/>
                :	null}
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
			}
		</>
	);
};

export default Card;
