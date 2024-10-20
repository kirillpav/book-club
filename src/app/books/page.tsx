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
			<div className="container">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-x divide-black w-full">
					{books.map((book: Book) => (
						<div key={book.id}>
							<Card book={book} />
						</div>
					))}
				</div>
			</div>
		</>
	);
}
