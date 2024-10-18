import React from "react";
import { Book } from "@/types/custom";
import Image from "next/image";

interface CardProps {
	book: Book;
}

export default function Card({ book }: CardProps) {
	return (
		<div>
			<Image src={book.cover} alt={book.title} />
			<p>{book.title}</p>
			<p>{book.author}</p>
			{book.read ? <p>Read</p> : <p>Want To Read</p>}
			<p>Rating: {book.rating}</p>
		</div>
	);
}
