import { createClient } from "@/utils/supabase/server";
import { Book } from "@/types/custom";
import Card from "../_components/Card";

export default async function Books() {
	const supabase = createClient();

	const { data: books, error } = await supabase.from("books").select("*");

	if (!books || error) {
		console.log("Encountered error:" + error);
		return <p>Cannot find books</p>;
	}
	return (
		<>
			<div className="flex flex-row">
				{books.map((book: Book) => (
					<div
						className={`${book.id % 3 !== 2 ? "border-r border-black" : ""} 
                    ${
											book.id < books.length - 3 ? "border-b border-black" : ""
										}`}
						key={book.id}
					>
						<Card book={book} />
					</div>
				))}
			</div>
		</>
	);
}
