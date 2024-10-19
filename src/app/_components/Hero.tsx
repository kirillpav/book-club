import React from "react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

export default function Hero() {
	return (
		<div className="p-5 flex flex-row items-center">
			<h2 className="uppercase font-bold">Welcome to my collection of books</h2>
			<div>
				<Select>
					<SelectTrigger className="w-[180px]">
						<SelectValue placeholder="Genre" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="light">Light</SelectItem>
						<SelectItem value="dark">Dark</SelectItem>
						<SelectItem value="system">System</SelectItem>
					</SelectContent>
				</Select>
			</div>
		</div>
	);
}
