import { usePokemonStore } from "@/app/lib/store/usePokemonStore/usePokemonStore";
import Card from "./Card";
import Image from "next/image";
import { loadingPokemon } from "@/app/lib/pokemon";

const Cards = () => {
	const { pokemons, estaCargando } = usePokemonStore();

    if (estaCargando) {
        return (
            <div className='flex lg:justify-center justify-around px-2 md:px-20 lg:px-40 pt-24'>
                <Card pokemon={loadingPokemon} />
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
