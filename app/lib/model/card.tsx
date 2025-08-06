import { JSX } from "react"
import {
	FaFire,
	FaLeaf,
	FaBolt,
	FaBug,
	FaMountain,
	FaGhost,
	FaSkull,
} from "react-icons/fa6"
import {
	GiSevenPointedStar,
	GiLibertyWing,
	GiPsychicWaves,
	GiFairyWand,
	GiPoisonBottle,
} from "react-icons/gi"
import { IoWaterSharp } from "react-icons/io5"

export const typeColors: { [key: string]: string } = {
    fire: "bg-red-500",
    water: "bg-blue-500",
    grass: "bg-green-500",
    electric: "bg-yellow-500",
    psychic: "bg-purple-500",
    bug: "bg-green-400",
    rock: "bg-gray-600",
    ghost: "bg-indigo-500",
    fairy: "bg-pink-500",
    poison: "bg-violet-400",
    flying: "bg-sky-400",
    normal: "bg-gray-300",
  }
export const typeColorsBorder: { [key: string]: string } = {
    fire: "border-l-red-500 border-b-red-500",
    water: "border-l-blue-500 border-b-blue-500",
    grass: "border-l-green-500 border-b-green-500",
    electric: "border-l-yellow-500 border-b-yellow-500",
    psychic: "border-l-purple-500 border-b-purple-500",
    bug: "border-l-green-400 border-b-green-400",
    rock: "border-l-gray-600 border-b-gray-600",
    ghost: "border-l-indigo-500 border-b-indigo-500",
    fairy: "border-l-pink-500 border-b-pink-500",
    poison: "border-l-violet-400 border-b-violet-400",
    flying: "border-l-sky-400 border-b-sky-400",
    normal: "border-l-gray-300 border-b-gray-300",
  }
export const typeColorsBorderleft: { [key: string]: string } = {
    fire: "border-t-red-500 border-r-red-500",
    water: "border-t-blue-500 border-r-blue-500",
    grass: "border-t-green-500 border-r-green-500",
    electric: "border-t-yellow-500 border-r-yellow-500",
    psychic: "border-t-purple-500 border-r-purple-500",
    bug: "border-t-green-400 border-r-green-400",
    rock: "border-t-gray-600 border-r-gray-600",
    ghost: "border-t-indigo-500 border-r-indigo-500",
    fairy: "border-t-pink-500 border-r-pink-500",
    poison: "border-t-violet-400 border-r-violet-400",
    flying: "border-t-sky-400 border-r-sky-400",
    normal: "border-t-gray-300 border-r-gray-300",
  }

export const typeIcons: { [key: string]: JSX.Element } = {
    fire: <FaFire size={20} />,
    water: <IoWaterSharp size={20} />,
    grass: <FaLeaf size={20} />,
    electric: <FaBolt size={20} />,
    psychic: <GiPsychicWaves size={20} />,
    bug: <FaBug size={20} />,
    rock: <FaMountain size={20} />,
    ghost: <FaGhost size={20} />,
    fairy: <GiFairyWand size={20} />,
    poison: <GiPoisonBottle size={20} />,
    flying: <GiLibertyWing size={20} />,
    normal: <GiSevenPointedStar size={20} />,
  }
export const typeGradientColors: { [key: string]: string[] } = {
    fire: ["from-red-500", "via-orange-400", "to-yellow-300"],
    water: ["from-blue-500", "via-cyan-400", "to-teal-300"],
    grass: ["from-green-500", "via-lime-400", "to-green-300"],
    electric: ["from-yellow-400", "via-amber-300", "to-yellow-200"],
    psychic: ["from-purple-500", "via-pink-400", "to-red-300"],
    bug: ["from-lime-500", "via-green-400", "to-green-300"],
    rock: ["from-gray-600", "via-gray-500", "to-gray-400"],
    ghost: ["from-indigo-500", "via-purple-400", "to-indigo-300"],
    fairy: ["from-pink-500", "via-rose-400", "to-pink-300"],
    poison: ["from-violet-500", "via-purple-400", "to-violet-300"],
    flying: ["from-sky-400", "via-blue-300", "to-indigo-200"],
    normal: ["from-gray-400", "via-gray-300", "to-gray-200"],
  }