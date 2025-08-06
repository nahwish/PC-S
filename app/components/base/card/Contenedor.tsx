import React from "react";
import classNames from "classnames";
import { twMerge } from "tailwind-merge";
import { Pokemon } from "@/app/lib";

export interface ContenedorProps extends React.ComponentProps<"div"> {
	pokemon?: Pokemon;
}
const Contenedor = ({
	children,
	pokemon,
	className,
	...props
}: ContenedorProps) => {
	const defaultStyles =
		"lg:w-52  rounded-2xl shadow-2xl bg-white hover:scale-110 focus:scale-110 focus:outline focus:outline-2 focus:outline-blue-500 transition-transform relative p-2  cursor-pointer";
	const styles = twMerge(classNames(defaultStyles, className));
	const arealLabel = `${pokemon?.name} ? Carta de ${pokemon?.name}, tipo ${pokemon?.types.map((t) => t.type.name).join(", ")}: '`;
	return (
		<div
			tabIndex={0}
			role='button'
			aria-label={arealLabel}
			className={styles}
			{...props}
		>
			{children}
		</div>
	);
};
export default Contenedor;