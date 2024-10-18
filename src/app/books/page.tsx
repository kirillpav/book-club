import { createClient } from "@/utils/supabase/server";
import { Book } from "@/types/custom";

export default async function Books() {
	const supabase = createClient();

	const { data: books, error } = await supabase
		.from("books")
		.select("*")
		.limit(1);

	if (!books || error) {
		console.log("Encountered error:" + error);
		return <p>Cannot find books</p>;
	}
	return (
		<>
			<div>
				{books.map((book: Book) => (
					<div key={book.id}>{book.title}</div>
				))}
			</div>
		</>
	);
}
