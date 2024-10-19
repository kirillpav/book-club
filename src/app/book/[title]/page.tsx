import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

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
				<div className="w-1/2 border-r-black border-r"></div>
				<img
					src={book.cover}
					alt=""
					className="h-[500px] absolute shadow-2xl top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
				/>
				<div className="w-1/2 bg-slate-50">
					<h3>{book.title}</h3>
					<Link href={book.goodreads}>
						Goodreads <ArrowUpRight />{" "}
					</Link>
				</div>
			</div>
		</>
	);
};
