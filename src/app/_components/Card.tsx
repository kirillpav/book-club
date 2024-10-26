import React from "react";
import { Book } from "@/types/custom";

import Link from "next/link";

interface CardProps {
	book: Book;
}

export default function Card({ book }: CardProps) {
	return (
		<Link
			href={`/book/${encodeURIComponent(book.title)}`}
			className="w-full h-full"
		>
			<div className="flex flex-col justify-between h-full border-b border-r border-r-black border-b-black bg-gray-100">
				<div className="p-6 flex flex-col items-center relative">
					<div className="flex flex-col gap-1 absolute left-2 top-2">
						{book.genre?.map((genre: string, index: number) => (
							<span
								key={index}
								className="border border-black rounded-full px-2 py-1 text-xs bg-white"
							>
								{genre}
							</span>
						))}
					</div>
					<img
						src={book.cover}
						alt={book.title}
						height={140}
						width={200}
						className="shadow-lg w-[200px] h-[320px] object-cover"
					/>
				</div>
				<div className="mt-auto border-t border-black w-full p-4 bg-white flex flex-row justify-between items-center">
					<div>
						<h3 className="text-lg font-semibold mb-1">{book.title}</h3>
						<p className="text-gray-600 text-sm">{book.author}</p>
					</div>
				</div>
			</div>
		</Link>
	);
}
