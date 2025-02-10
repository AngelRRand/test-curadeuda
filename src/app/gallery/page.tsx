"use client"
import React from 'react';
import useStore from "@/store";

const SkeletonMasonry = () => {
	const skeletonItems = [
		{height: 'h-64'},
		{height: 'h-96'},
		{height: 'h-72'},
		{height: 'h-80'},
		{height: 'h-64'},
		{height: 'h-48'},
		{height: 'h-56'},
		{height: 'h-72'},
		{height: 'h-64'},
		{height: 'h-80'},
		{height: 'h-48'},
		{height: 'h-96'},
	];

	return (
		<div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 p-4">
			{skeletonItems.map((item, index) => (
				<div
					key={index}
					className={`${item.height} mb-4 break-inside-avoid animate-pulse bg-gray-200 rounded-lg`}
				/>
			))}
		</div>
	);
};

const ImageMasonry = ({images}) => {
	// Definir diferentes alturas para las imágenes
	const getHeight = (index) => {
		const heights = [
			'h-64',  // 256px
			'h-96',  // 384px
			'h-72',  // 288px
			'h-80',  // 320px
			'h-48',  // 192px
			'h-56'   // 224px
		];
		return heights[index % heights.length];
	};

	return (
		<div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 p-4  mt-10">
			{images.map((image, index) => (
				<div
					key={index}
					className={`${getHeight(index)} mb-4 break-inside-avoid relative rounded-lg overflow-hidden group`}
				>
					<img
						src={image.url}
						alt={image.description}
						className="w-full h-full object-cover"
					/>
					<div
						className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
		return <SkeletonMasonry/>;
	}

	// Obtener todas las imágenes de todos los usuarios
	const allImages = data.reduce((acc, user) => {
		return [...acc, ...user.images];
	}, []);

	return <ImageMasonry images={allImages}/>;
}