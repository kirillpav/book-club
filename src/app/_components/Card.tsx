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
			<div className={`p-5`}>
				<img
					src={book.cover}
					alt={book.title}
					height={140}
					width={200}
					className="shadow-lg w-[200px] h-[320px]"
				/>

				<div className="mt-4">
					<p className="text-lg">{book.title}</p>
					<p>{book.author}</p>
					{book.read ? <p>Read</p> : <p>Want To Read</p>}
					<p>Rating: {book.rating}</p>
				</div>
			</div>
		</Link>
	);
}
