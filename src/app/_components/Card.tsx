import React from "react";
import { Book } from "@/types/custom";
import Image from "next/image";
import Link from "next/link";

interface CardProps {
	book: Book;
}

export default function Card({ book }: CardProps) {
	return (
		<Link href={"/" + book.title}>
			<div className={`p-5 h-[450px] `}>
				<img src={book.cover} alt={book.title} width={200} height={150} />
				<p>{book.title}</p>
				<p>{book.author}</p>
				{book.read ? <p>Read</p> : <p>Want To Read</p>}
				<p>Rating: {book.rating}</p>
			</div>
		</Link>
	);
}
