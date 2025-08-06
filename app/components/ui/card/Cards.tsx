import { usePokemonStore } from "@/app/lib/store/usePokemonStore/usePokemonStore";
import Card from "./Card";
import Image from "next/image";
import Contenedor from "../../base/card/Contenedor";
import Fondo from "../../base/card/Fondo";

const Cards = () => {
	const { pokemons, estaCargando } = usePokemonStore();

	if (estaCargando) {
		return (
			<div className='flex lg:justify-center justify-around px-2 md:px-20 lg:px-40 pt-24'>
				<Contenedor>
					<Fondo>
						<Image
							src='/cargando.gif'
							alt='Cargando'
							width={200}
							height={100}
							className='z-10 lg:max-w-full max-w-20 h-20 lg:h-auto object-contain'
						/>
					</Fondo>
					<p className='text-pretty font-bold text-gray-500'>Cargando...</p>
				</Contenedor>
			</div>
		);
	}

	return (
		<div className='flex lg:justify-center justify-around px-2 md:px-20 lg:px-40'>
			{pokemons?.length > 0 ?
				<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-4 mt-20'>
					{pokemons.map((poke) => (
						<Card
							key={poke.id}
							pokemon={poke}
						/>
					))}
				</div>
			:	<div className='flex flex-col border items-center justify-center self-center h-screen gap-3'>
					<Image
						src='/psy.png'
						alt='No hay pokemons'
						width={400}
						height={400}
					/>
					<p className='col-span-full text-center text-lg font-black text-yellow-300 bg-gray-600 px-3 rounded-xl'>
						Parece que no hay resultados...
					</p>
				</div>
			}
		</div>
	);
};

export default Cards;
