import React from "react";
import classNames from "classnames";
import { twMerge } from "tailwind-merge";
import { Pokemon } from "@/app/lib";
import { typeColorsBorder, typeColorsBorderleft } from "@/app/lib/model/card";

export interface FondoProps extends React.ComponentProps<"div"> {
	pokemon?: Pokemon;
}
const Fondo = ({
	children,
	pokemon,
	className,
	...props
}: FondoProps) => {
	const mainType = pokemon?.types[0]?.type.name || "normal";
	const segundoType = pokemon?.types[1]?.type.name || mainType;
	const defaultStyles = `${typeColorsBorder[mainType]} ${typeColorsBorderleft[segundoType]} border-2 border-gray-300 rounded-2xl overflow-hidden`;
	const styles = twMerge(classNames(defaultStyles, className));

	return (
		<div
			className={styles}
			{...props}
		>
			{children}
		</div>
	);
};
export default Fondo;