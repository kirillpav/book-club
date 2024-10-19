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
			<div className="p-4 flex flex-col justify-center items-center">
				<img
					src={book.cover}
					alt={book.title}
					height={140}
					width={200}
					className="shadow-lg w-[200px] h-[320px]"
				/>

				<div className="mt-4 border-t-black border-b-black">
					<h3 class="text-lg font-semibold mb-1">{book.title}</h3>
					<p class="text-gray-600 text-sm mb-2">{book.author}</p>
				</div>
			</div>
		</Link>
	);
}
