import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Dot } from "lucide-react";

export default async ({ params }: { params: { title: string } }) => {
	const supabase = createClient();

	const decodedTitle = decodeURIComponent(params.title);

	const { data: book, error } = await supabase
		.from("books")
		.select("*")
		.eq("title", decodedTitle)
		.single();

	if (error) {
		console.log("Error fetching book: ", error);
	}

	return (
		<>
			<div className="p-5 flex flex-row items-center border-b border-b-black">
				<h2 className="uppercase text-center">{book.title}</h2>
			</div>
			<div className="flex flex-row h-screen relative">
				<div className="w-1/2 border-r-black border-r">
					<p className="flex flex-row items-center font-semibold w-1/2">
						<Dot />
						{book.quote}
					</p>
					<p className="w-1/2 ml-28">{book.description}</p>
				</div>
				<img
					src={book.cover}
					alt=""
					className="h-[500px] absolute shadow-2xl top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
				/>
				<div className="w-1/2 bg-slate-50">
					<div className="flex flex-col items-start mt-[250px] ml-52">
						<h3 className="font-bold">{book.title}</h3>
						<a href={book.goodreads} className="flex flex-row items-center">
							Goodreads <ArrowUpRight />{" "}
						</a>
					</div>
				</div>
			</div>
		</>
	);
};
