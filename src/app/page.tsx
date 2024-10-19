import Hero from "./_components/Hero";
import Books from "./books/page";
import { Separator } from "@/components/ui/separator";

export default function Home() {
	return (
		<div>
			<Hero />
			<Separator className="bg-black h-[1.5px]" />
			<Books />
		</div>
	);
}
