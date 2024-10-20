import React from "react";
import { Book } from "@/types/custom";
import Image from "next/image";
import Link from "next/link";

interface CardProps {
	book: Book;
}

export default function Card({ book }: CardProps) {
	return (
		<Link key={book.id} href={`/book/${encodeURIComponent(book.title)}`}>
			<div className="flex flex-col justify-center items-center border-b border-b-black bg-gray-100 relative">
				<div className="p-6 relative">
					<img
						src={book.cover}
						alt={book.title}
						height={140}
						width={200}
						className="shadow-lg w-[200px] h-[320px]"
					/>
				</div>
				<div className="absolute left-3 bottom-28">
					{book.genre?.map((genre: string) => (
						<span className="border border-black rounded-full p-1 mr-2 text-xs">
							{genre}
						</span>
					))}
				</div>
				<div className="mt-4 border-t border-t-black border-b-black w-full p-4 bg-white">
					<h3 className="text-lg font-semibold mb-1">{book.title}</h3>
					<p className="text-gray-600 text-sm mb-2">{book.author}</p>
				</div>
			</div>
		</Link>
	);
}
