import React from "react";

export default function Hero() {
	return (
		<div className="p-5 flex flex-row items-center justify-between">
			<h2 className="uppercase font-bold">Welcome to my collection of books</h2>
			<a
				className="border border-black text-black p-2 uppercase hover:bg-black hover:text-white transition-all duration-300"
				href="/addBook"
			>
				Add Book
			</a>
		</div>
	);
}
