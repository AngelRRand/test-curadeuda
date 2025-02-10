"use client"
import React from 'react';
import useStore from "@/store";

const SkeletonGrid = () => {
	const skeletonSizes = [
		'basis-1/3 h-64',
		'basis-1/2 h-96',
		'basis-1/4 h-48',
		'basis-1/3 h-72',
		'basis-1/2 h-64',
		'basis-1/4 h-80',
		'basis-1/3 h-56',
		'basis-1/2 h-72',
	];

	return (
		<div className="flex flex-wrap gap-4 p-4">
			{skeletonSizes.map((size, index) => (
				<div
					key={index}
					className={`${size} animate-pulse bg-gray-200 rounded-lg min-w-[250px]`}
				/>
			))}
		</div>
	);
};

const ImageGrid = ({images}) => {
	const getSizeClass = (index) => {
		const patterns = [
			'basis-1/3 h-64',  // Normal
			'basis-1/2 h-96',  // Grande
			'basis-1/4 h-48',  // Pequeño
			'basis-1/3 h-72',  // Normal alto
		];
		return patterns[index % patterns.length];
	};

	return (
		<div className="flex flex-wrap gap-4 p-4">
			{images.map((image, index) => (
				<div
					key={index}
					className={`${getSizeClass(index)} relative rounded-lg overflow-hidden min-w-[250px] transition-transform duration-300 hover:scale-[1.02]`}
				>
					<img
						src={image.url}
						alt={image.description}
						className="w-full h-full object-cover"
					/>
					<div
						className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70 opacity-0 hover:opacity-100 transition-opacity duration-300">
						<div className="absolute bottom-0 left-0 right-0 p-4">
							<p className="text-white text-sm font-medium truncate">
								{image.description}
							</p>
							<p className="text-gray-300 text-xs">
								{new Date(image.date).toLocaleDateString()}
							</p>
						</div>
					</div>
				</div>
			))}
		</div>
	);
};

export default function Gallery() {
	const {data} = useStore((state) => state);

	if (!data) {
		return <SkeletonGrid/>;
	}

	// Obtener todas las imágenes de todos los usuarios
	const allImages = data.reduce((acc, user) => {
		return [...acc, ...user.images];
	}, []);

	return <ImageGrid images={allImages}/>;
}