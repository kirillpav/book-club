"use client";

import { useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

interface FilterProps {
	onSortChange: (sort: string) => void;
	onGenreChange: (genre: string) => void;
	onStatusChange: (status: string) => void;
}

export default function Filter({
	onSortChange,
	onGenreChange,
	onStatusChange,
}: FilterProps) {
	const [genres, setGenres] = useState<string[]>([]);
	const supabase = createClientComponentClient();

	useEffect(() => {
		const fetchGenres = async () => {
			const { data, error } = await supabase.from("books").select("genre");

			if (error) {
				console.error("Error fetching genres:", error);
				return;
			}

			// Hack to pass through set
			const uniqueGenres = [...new Set(data.map((item) => item.genre))];
			setGenres(uniqueGenres);
		};

		fetchGenres();
	}, []);

	return (
		<div>
			<form>
				<select
					name="sort"
					id="sort"
					className="p-2 border-r border-black"
					onChange={(e) => onSortChange(e.target.value)}
				>
					<option value="">Sort</option>
					<option value="newest">Newest</option>
					<option value="oldest">Oldest</option>
				</select>
				<select
					name="genre"
					id="genre"
					className="py-2 px-4 border-r border-black"
					onChange={(e) => onGenreChange(e.target.value)}
				>
					<option value="">Genre</option>
					<option value="all">All</option>
					{genres.map((genre) => (
						<option key={genre} value={genre.toLowerCase()}>
							{genre}
						</option>
					))}
				</select>
				<select
					name="readingStatus"
					id="readingStatus"
					className="p-2 border-r border-black"
					onChange={(e) => onStatusChange(e.target.value)}
				>
					<option value="">Reading Status</option>
					<option value="all">All</option>
					<option value="read">Read</option>
					<option value="want-to-read">Want to Read</option>
					<option value="currently-reading">Currently Reading</option>
				</select>
			</form>
		</div>
	);
}
