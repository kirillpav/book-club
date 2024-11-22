"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Book } from "@/types/custom";
import Card from "../_components/Card";
import { useEffect, useState } from "react";

export default function Books() {
	const [books, setBooks] = useState<Book[]>([]);
	const supabase = createClientComponentClient();

	const fetchBooks = async () => {
		const { data, error } = await supabase.from("books").select("*");
		if (data && !error) {
			setBooks(data);
		} else {
			console.log("Encountered error:" + error);
		}
	};

	useEffect(() => {
		fetchBooks();
	}, []);

	const handleDelete = (deletedBookId: string) => {
		setBooks((prevBooks) =>
			prevBooks.filter((book) => book.id !== deletedBookId)
		);
	};

	if (!books.length) {
		return <p>Cannot find books</p>;
	}

	return (
		<div className="w-full min-h-screen bg-white">
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0">
				{books.map((book: Book) => (
					<Card key={book.id} book={book} onDelete={handleDelete} />
				))}
			</div>
		</div>
	);
}
