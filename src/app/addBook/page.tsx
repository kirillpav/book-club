"use client";
import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function AddBook() {
	const supabase = createClientComponentClient();
	const [formData, setFormData] = useState({
		title: "",
		author: "",
		description: "",
		quote: "",
		genre: "",
	});
	const [cover, setCover] = useState<File | null>(null);
	const [loading, setLoading] = useState(false);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			setCover(e.target.files[0]);
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);

		try {
			let coverUrl = null;
			if (cover) {
				const fileExt = cover.name.split(".").pop();
				const fileName = `${Math.random()}.${fileExt}`;
				const { data: uploadData, error: uploadError } = await supabase.storage
					.from("book-covers")
					.upload(fileName, cover);

				if (uploadError) throw uploadError;
				coverUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/book-covers/${fileName}`;
			}

			const { error } = await supabase.from("books").insert([
				{
					...formData,
					cover: coverUrl,
				},
			]);

			if (error) throw error;
			setFormData({
				title: "",
				author: "",
				description: "",
				quote: "",
				genre: "",
			});
			setCover(null);
			alert("Book added successfully!");
		} catch (error) {
			console.error("Error adding book:", error);
			alert("Error adding book. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="flex justify-center items-center mt-32">
			<form
				onSubmit={handleSubmit}
				className="flex flex-col gap-4 p-5 border border-black w-[500px]"
			>
				<input
					type="text"
					name="title"
					value={formData.title}
					onChange={handleChange}
					placeholder="Title"
					className="p-2 border-b border-black"
					required
				/>
				<input
					type="text"
					name="author"
					value={formData.author}
					onChange={handleChange}
					placeholder="Author"
					className="p-2 border-b border-black"
					required
				/>
				<input
					type="text"
					name="description"
					value={formData.description}
					onChange={handleChange}
					placeholder="Description"
					className="p-2 border-b border-black"
					required
				/>
				<input
					type="text"
					name="quote"
					value={formData.quote}
					onChange={handleChange}
					placeholder="Quote"
					className="p-2 border-b border-black"
					required
				/>
				<input
					type="text"
					name="genre"
					value={formData.genre}
					onChange={handleChange}
					placeholder="Genre"
					className="p-2 border-b border-black"
					required
				/>
				<input
					type="file"
					accept="image/*"
					onChange={handleFileChange}
					className="p-2 border-b border-black"
				/>
				<button
					type="submit"
					className="p-2 bg-black text-white disabled:bg-gray-500"
					disabled={loading}
				>
					{loading ? "Adding Book..." : "Add Book"}
				</button>
			</form>
		</div>
	);
}
