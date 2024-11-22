"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Book } from "@/types/custom";
import Card from "../_components/Card";
import { useEffect, useState } from "react";
import Filter from "../_components/Filter";
import { Separator } from "@/components/ui/separator";

export default function Books() {
	const [books, setBooks] = useState<Book[]>([]);
	const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
	const [sort, setSort] = useState("");
	const [genre, setGenre] = useState("");
	const [readingStatus, setReadingStatus] = useState("");
	const supabase = createClientComponentClient();

	const fetchBooks = async () => {
		const { data, error } = await supabase
			.from("books")
			.select("*")
			.order("created_at", { ascending: false });
		if (data && !error) {
			setBooks(data);
		} else {
			console.log("Encountered error:" + error);
		}
	};

	useEffect(() => {
		fetchBooks();
	}, []);

	// Apply filters whenever books or filter states change
	useEffect(() => {
		let result = [...books];

		// Apply genre filter
		if (genre && genre !== "all") {
			result = result.filter(
				(book) => book.genre.toLowerCase() === genre.toLowerCase()
			);
		}

		// Apply reading status filter
		if (readingStatus && readingStatus !== "all") {
			result = result.filter((book) => book.readingStatus === readingStatus);
		}

		// Apply sort
		if (sort) {
			result.sort((a, b) => {
				if (sort === "newest") {
					return (
						new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
					);
				} else {
					return (
						new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
					);
				}
			});
		}

		setFilteredBooks(result);
	}, [books, sort, genre, readingStatus]);

	// Filtering out the deleted book for the UI
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
			<Filter
				onSortChange={setSort}
				onGenreChange={setGenre}
				onStatusChange={setReadingStatus}
			/>
			<Separator className="bg-black" />
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0">
				{filteredBooks.map((book: Book) => (
					<Card key={book.id} book={book} onDelete={handleDelete} />
				))}
			</div>
		</div>
	);
}
