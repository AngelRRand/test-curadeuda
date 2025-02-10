"use client"
import React from 'react';
import useStore from "@/store";
import {UserImages} from "@/components/core/user-images";

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

export default function Gallery() {
	const {data} = useStore((state) => state);

	if (!data) {
		return <div className=" mt-10">
			<SkeletonMasonry/>
		</div>
	}
	const flattenedImages = data.flatMap(user =>
		user.images.map(image => ({
			user,
			image
		}))
	);

	return (
		<div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 p-4 mt-10">
			{flattenedImages.map(({user, image}, index) => (
				<div key={`${user.id}-${image.url}-${index}`} className="mb-4 break-inside-avoid">
					<UserImages user={user} image={image} index={index}/>
				</div>
			))}
		</div>
	)
}