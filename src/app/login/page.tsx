import { login, signup } from "./actions";

export default function LoginPage() {
	return (
		<div className="flex flex-col items-center justify-center h-screen border border-black">
			<form className="flex flex-col gap-2 border border-black p-5 rounded-md">
				<label htmlFor="email">Email:</label>
				<input
					id="email"
					name="email"
					type="email"
					required
					className="border border-black rounded-md p-2"
				/>
				<label htmlFor="password">Password:</label>
				<input
					id="password"
					name="password"
					type="password"
					required
					className="border border-black rounded-md p-2"
				/>
				<button
					className="bg-blue-500 text-white p-2 rounded-md"
					formAction={login}
				>
					Log in
				</button>
				<button
					className="bg-blue-500 text-white p-2 rounded-md"
					formAction={signup}
				>
					Sign up
				</button>
			</form>
		</div>
	);
}
