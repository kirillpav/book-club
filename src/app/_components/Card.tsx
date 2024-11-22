"use client";

import React, { useState } from "react";
import { Book } from "@/types/custom";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { Trash } from "lucide-react";

interface CardProps {
	book: Book;
	onDelete?: (bookId: string) => void;
}

export default function Card({ book, onDelete }: CardProps) {
	const supabase = createClientComponentClient();

	const handleDelete = async (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();

		try {
			const { error } = await supabase.from("books").delete().eq("id", book.id);
			if (error) throw error;

			if (onDelete) onDelete(book.id);
		} catch (error) {
			console.error("Error deleting book:", error);
		}
	};

	return (
		<Link
			href={`/book/${encodeURIComponent(book.title)}`}
			className="w-full h-full relative"
		>
			<div className="flex flex-col justify-between h-full border-b border-r border-r-black border-b-black bg-gray-100">
				<div className="p-6 flex flex-col items-center relative">
					<div className="flex flex-col gap-1 absolute left-2 top-2">
						<span className="border border-black rounded-full px-2 py-1 text-xs bg-white">
							{book.genre}
						</span>
					</div>
					<img
						src={book.cover}
						alt={book.title}
						height={140}
						width={200}
						className="shadow-lg rounded-md w-[200px] h-[320px] object-cover hover:scale-105 transition-all duration-300"
					/>
					<div className="absolute left-2 bottom-2 z-10">
						<button
							onClick={handleDelete}
							className="bg-white text-black border border-black rounded-full p-2 text-xs hover:bg-gray-100 hover:text-red-500 transition-all duration-300"
						>
							<Trash />
						</button>
					</div>
				</div>
				<div className="mt-auto border-t border-black w-full h-32 p-4 bg-white flex flex-row justify-between items-center">
					<div>
						<p className="text-xs text-gray-600">{book.readingStatus}</p>
						<h3 className="text-lg font-semibold mb-1">{book.title}</h3>
						<p className="text-gray-600 text-sm">{book.author}</p>
					</div>
				</div>
			</div>
		</Link>
	);
}
