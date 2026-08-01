"use client"
import { useEffect, useRef, useState } from "react"
import ReactDOM from "react-dom"
import Image from "next/image"
import { usePokemonStore } from "@/app/lib/store/usePokemonStore/usePokemonStore"
import { typeColors, typeIcons } from "@/app/lib/model/card"
import { FaSkull, FaVolumeHigh, FaVolumeXmark } from "react-icons/fa6"

export const PokemonModal = () => {
	const { selectedPokemon, setSelectedPokemon } = usePokemonStore()
	const modalRef = useRef<HTMLDivElement>(null)
	const lastFocusedElementRef = useRef<HTMLElement | null>(null)
	const audioRef = useRef<HTMLAudioElement | null>(null)
	const [isPlaying, setIsPlaying] = useState(false)

	useEffect(() => {
		if (selectedPokemon) {
			lastFocusedElementRef.current = document.activeElement as HTMLElement
			modalRef.current?.focus()
		}
	}, [selectedPokemon])

	const stopAudio = () => {
		if (audioRef.current) {
			audioRef.current.pause()
			audioRef.current.currentTime = 0
		}
		setIsPlaying(false)
	}

	const closeModal = () => {
		stopAudio()
		setSelectedPokemon(null)
		lastFocusedElementRef.current?.focus()
	}

	const handlePlayCry = () => {
		if (!selectedPokemon?.cries.latest) return
		if (isPlaying) {
			stopAudio()
			return
		}
		audioRef.current = new Audio(selectedPokemon.cries.latest)
		audioRef.current.play()
		setIsPlaying(true)
		audioRef.current.onended = () => setIsPlaying(false)
	}

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Escape") {
			closeModal()
		}

		if (e.key === "Tab" && modalRef.current) {
			const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
				'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
			)
			const firstElement = focusableElements[0]
			const lastElement = focusableElements[focusableElements.length - 1]

			if (e.shiftKey) {
				if (document.activeElement === firstElement) {
					lastElement.focus()
					e.preventDefault()
				}
			} else {
				if (document.activeElement === lastElement) {
					firstElement.focus()
					e.preventDefault()
				}
			}
		}
	}

	if (!selectedPokemon) return null

	const imagen =
    selectedPokemon.sprites.other.showdown.front_default ||
		selectedPokemon.sprites.other["official-artwork"].front_default ||
		""

	return ReactDOM.createPortal(
		<div
			className='fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4'
			onClick={closeModal}
		>
			<div
				ref={modalRef}
				role='dialog'
				aria-modal='true'
				aria-labelledby='pokemon-modal-title'
				className='bg-white rounded-2xl shadow-2xl w-full max-w-sm mx-auto overflow-hidden'
				onClick={(e) => e.stopPropagation()}
				onKeyDown={handleKeyDown}
				tabIndex={-1}
			>
				{/* Header */}
				<div className='flex justify-between items-center px-5 pt-5 pb-2'>
					<div>
						<p className='text-xs text-gray-400 font-semibold'>#{selectedPokemon.id}</p>
						<h2
							id='pokemon-modal-title'
							className='text-2xl font-bold capitalize text-gray-800 leading-tight'
						>
							{selectedPokemon.name}
						</h2>
					</div>
					<button
						onClick={closeModal}
						className='text-gray-400 hover:text-gray-700 focus:outline focus:outline-2 focus:outline-blue-500 rounded-full p-1 text-2xl leading-none'
						aria-label='Cerrar modal'
					>
						&times;
					</button>
				</div>

				{/* Imagen */}
				{imagen && (
					<div className='flex justify-center py-4 bg-gray-50'>
						<div className='relative w-40 h-40'>
							<Image
								unoptimized
								src={imagen}
								alt={`Imagen oficial de ${selectedPokemon.name}`}
								fill
								className='object-contain drop-shadow-lg'
								priority
							/>
						</div>
					</div>
				)}

				{/* Tipos y sonido */}
				<div className='px-5 py-4 flex flex-col gap-3'>
					<div className='flex rounded-lg overflow-hidden'>
						{selectedPokemon.types.map((type, index) => (
							<span
								key={index}
								className={`flex items-center justify-center gap-2 ${
									typeColors[type.type.name] || "bg-gray-300"
								} text-white py-2 w-full text-sm font-semibold`}
								aria-label={`Tipo: ${type.type.name}`}
							>
								{typeIcons[type.type.name] || <FaSkull />}
								<span className='capitalize'>{type.type.name}</span>
							</span>
						))}
					</div>

					{selectedPokemon.cries.latest && (
						<button
							onClick={handlePlayCry}
							className='flex items-center justify-center gap-2 w-full py-2 rounded-lg border-2 border-yellow-400 bg-yellow-50 hover:bg-yellow-100 text-yellow-700 font-semibold text-sm transition-colors focus:outline focus:outline-2 focus:outline-blue-500'
							aria-label={
								isPlaying
									? `Detener sonido de ${selectedPokemon.name}`
									: `Escuchar sonido de ${selectedPokemon.name}`
							}
							aria-pressed={isPlaying}
						>
							{isPlaying ? <FaVolumeXmark size={16} /> : <FaVolumeHigh size={16} />}
							{isPlaying ? "Detener sonido" : "Escuchar sonido"}
						</button>
					)}
				</div>
			</div>
		</div>,
		document.body
	)
}
