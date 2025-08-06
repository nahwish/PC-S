import { Pokemon } from "../pokemon";

export const obtenerTipo = (pokemon:Pokemon) =>{
  const tipo1 = pokemon.types[0]?.type.name || "normal"
	const tipo2 = pokemon.types[1]?.type.name || tipo1
  return {primerTipo: tipo1, segundoTipo: tipo2}
}