import { Dot } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
	return (
		<div className="p-5 flex ">
			<h1 className="mx-auto flex flex-row text-2xl items-center">
				<Dot /> <Link href={"/"}>MY LIBRARY</Link> <Dot />
			</h1>
		</div>
	);
}
