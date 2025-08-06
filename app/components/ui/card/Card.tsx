import {
	typeColors,
	typeColorsBorderleft,
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
	console.log(pokemon);
	const imagenDefault =
		pokemon.sprites.other.showdown.front_default || "" ?
			pokemon.sprites.other.showdown.front_default
		:	pokemon.sprites.other["official-artwork"].front_default;

	const [isFlipped, setIsFlipped] = useState(false);

	const handleClick = () => {
		setIsFlipped(!isFlipped);
	};
  const playSound = () => {
    const audio = new Audio(pokemon.cries.latest);
    audio.play();
  };
	console.log("tiposssss", pokemon);
  // Si no hay segundo tipo, se asigna un valor por defecto
  
	return (
<>
			{isFlipped ?
				<Contenedor className="h-full" >
					<Fondo className="h-auto" onClick={handleClick}>
						<h3 className='text-center font-bold text-lg'>Información</h3>
						<p className='text-sm text-gray-700'>Altura: {pokemon.height}</p>
						<p className='text-sm text-gray-700'>Peso: {pokemon.weight}</p>
						<p className='text-sm text-gray-700'>Habilidades:</p>
						<ul className='text-sm text-gray-700'>
							{pokemon.abilities.map((ability, index) => (
								<li key={index}>{ability.ability.name}</li>
							))}
						</ul>
					</Fondo>
            <button onClick={playSound} className="border border-red-600">
            <AiTwotoneSound className="text-black"/>
              </button>

				</Contenedor>
			:	<Contenedor pokemon={pokemon} onClick={handleClick} className="relative w-64 h-80 max-w-xs mx-auto rounded-2xl border-4 border-yellow-400 shadow-xl bg-gradient-to-br from-yellow-100 via-white to-yellow-200 overflow-visible transition-transform hover:scale-105 duration-200">
        

					<Fondo pokemon={pokemon}>
						{" "}
						{/* Evitar que sobresalga */}
						<div
							className={`absolute top-2 right-2 min-w-12 h-12 lg:flex ${typeColorsBorderleft[segundoTipo]} hidden items-center justify-center rounded-full text-black font-bold shadow-md shadow-slate-500 `}
              >
							# {pokemon.id}
						</div>
            
						<div className='relative lg:h-32 flex items-center justify-center overflow-hidden rounded-t-xl h-full w-full'>
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
                width={70}
                height={70}
                className='z-10 lg:max-w-full max-w-20 h-20 lg:h-auto object-contain'
								/>
                :	null}
						</div>
							<h3
								className='text-base uppercase text-black drop-shadow-lg tracking-wide truncate font-thin border text-center'
								title={pokemon.name}
							>
								{pokemon.name}
							</h3>
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
