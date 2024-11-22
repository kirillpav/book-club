import Link from "next/link";
import { createClient } from "@/utils/supabase/server";

import { ArrowUpRight } from "lucide-react";

export default async ({ params }: { params: { title: string } }) => {
	const supabase = createClient();

	const decodedTitle = decodeURIComponent(params.title);

	const { data: book, error } = await supabase
		.from("books")
		.select("*")
		.eq("title", decodedTitle)
		.single();

	const { data: relatedBooks, error: relatedError } = await supabase
		.from("books")
		.select("*")
		.eq("genre", book.genre)
		.neq("title", decodedTitle) // Exclude current book
		.limit(2); // Limit to 4 related books

	if (error) {
		console.log("Error fetching book: ", error);
	}

	if (relatedError) {
		console.log("Error fetching related books");
	}

	return (
		<>
			<div className="p-5 flex flex-row items-center border-b border-b-black justify-between">
				<h2 className="uppercase text-center">{book.title}</h2>
				<h2 className="uppercase text-center">{book.author}</h2>
			</div>
			<div className="flex flex-row h-screen relative">
				<div className="w-1/2 border-r-black border-r">
					<div className="flex flex-col gap-10 items-start ml-10 mt-16">
						<p className="flex flex-row items-center font-semibold w-1/2">
							{book.quote ? <>{book.quote}</> : ""}
						</p>
						<p className="w-1/2 text-left">{book.description}</p>
					</div>
				</div>
				<div className="absolute shadow-2xl top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
					<a
						href={book.goodreads}
						className="flex flex-row items-center bg-transparent"
					>
						Goodreads <ArrowUpRight />{" "}
					</a>
					<img src={book.cover} alt="" className="h-[500px] " />
				</div>

				<div className="w-1/2 bg-slate-50 relative">
					<div className="p-8 flex flex-row justify-center ml-32">
						<h3 className="text-xl font-semibold text-center mb-6 pl-4">
							More {book.genre} books:
						</h3>
						<div className="grid grid-cols-1 md:grid-cols-1 gap-0 w-1/2">
							{relatedBooks?.map((book) => (
								<Link
									key={book.id}
									href={`/book/${encodeURIComponent(book.title)}`}
								>
									<div className="flex flex-col justify-center items-center border-black relative">
										<div className="p-6 relative">
											<img
												src={book.cover}
												alt={book.title}
												className="shadow-lg w-[160px] h-[240px]"
											/>
										</div>

										<div className="mt-4 border-b border-black w-full p-4">
											<h3 className="text-base font-semibold mb-1">
												{book.title}
											</h3>
											<p className="text-gray-600 text-xs">{book.author}</p>
										</div>
									</div>
								</Link>
							))}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
