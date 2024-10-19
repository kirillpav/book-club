import { Dot } from "lucide-react";

export default function Navbar() {
	return (
		<div className="p-5 flex ">
			<h1 className="mx-auto flex flex-row text-2xl items-center">
				<Dot /> MY LIBRARY <Dot />
			</h1>
		</div>
	);
}
