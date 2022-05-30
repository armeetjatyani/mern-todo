import { ArrowLeftIcon } from "@heroicons/react/outline";
import bcrypt from "bcryptjs";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRef } from "react";
import toast from "react-hot-toast";

export default function Register() {
	const uRef = useRef(null);
	const pRef = useRef(null);
	const router = useRouter();

	async function handleSubmit(e) {
		e.preventDefault();
		if (!uRef.current?.value || uRef.current?.value.length === 0) {
			toast.error("Empty username.");
			return;
		}
		if (!pRef.current?.value || pRef.current?.value.length === 0) {
			toast.error("Empty password.");
			return;
		}
		const username = uRef.current.value;
		const password = pRef.current.value;

		const hash = await bcrypt
			.hash(password, 10)
			.then((hash) => hash)
			.catch((err) => undefined);
		if (!hash) return;

		const data = { username: username, password: hash };

		const req = await fetch(`${process.env.NEXT_PUBLIC_API}/auth/register`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		})
			.then((res) => {
				return res.json();
			})
			.catch((err) => {
				return { error: "Error when creating account." };
			});

		if (req.error) {
			toast.error(req.error);
		} else {
			localStorage.setItem("auth", JSON.stringify(req));
			toast.success("Created account!");
			router.push("/");
		}
	}

	return (
		<div className="flex items-center justify-center w-full h-screen">
			<div className="p-10 space-y-4 bg-white shadow-xl rounded-2xl">
				<h1 className="text-3xl font-bold">Register</h1>
				<form className="flex flex-col space-y-2" onSubmit={handleSubmit}>
					<label htmlFor="username">Username</label>
					<input ref={uRef} autoFocus={true} className="px-4 py-2 transition-all duration-200 border-0 rounded-sm outline-0 ring-2 ring-gray-300 focus:ring-rose-500" type="text" name="username" />
					<label htmlFor="password">Password</label>
					<input ref={pRef} className="px-4 py-2 transition-all duration-200 border-0 rounded-sm outline-0 ring-2 ring-gray-300 focus:ring-rose-500" type="password" name="password" />
					<button type="submit" className="w-full px-4 py-2 font-bold text-white transition-all duration-200 rounded-sm bg-rose-500">
						Register
					</button>
				</form>
				<Link href="/">
					<button className="absolute top-0 flex items-center px-4 py-1 space-x-2 font-bold bg-gray-100 border-2 border-gray-300 rounded-lg left-4">
						<ArrowLeftIcon width={16} height={16} />
						<p>Back</p>
					</button>
				</Link>
				<div>
					<Link href="/login">
						<a className="text-rose-500 hover:underline font-bold ml-[25%] w-full">Login</a>
					</Link>
					<span> instead.</span>
				</div>
			</div>
		</div>
	);
}
