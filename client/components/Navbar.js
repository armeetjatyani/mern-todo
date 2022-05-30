import Link from "next/link";
import useSession from "../hooks/useSession";
import { CheckCircleIcon, LogoutIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Navbar() {
	const session = useSession();
	const router = useRouter();

	return (
		<div className="w-full h-[80px] flex items-center justify-center">
			<div className="w-[70%] justify-between items-center flex">
				<Link href="/">
					<a className="flex items-center justify-center space-x-2 text-2xl font-bold text-rose-500">
						<CheckCircleIcon width={30} height={30} />
						<h1>Todo</h1>
					</a>
				</Link>

				{session.username ? (
					<div className="flex space-x-2">
						<button className="px-4 py-1 font-bold transition-all duration-200 bg-gray-100 border-2 border-gray-300 rounded-lg hover:border-rose-500 hover:text-rose-500">@{session.username}</button>
						<button
							className="px-4 py-1 font-bold duration-200 hover:text-rose-500"
							onClick={() => {
								localStorage.removeItem("auth");
								router.reload();
							}}
						>
							<LogoutIcon width={20} height={20} />
						</button>
					</div>
				) : (
					<div className="flex space-x-2">
						<Link href="/login">
							<motion.button whileHover={{ y: 2 }} className="px-4 py-1 font-bold bg-gray-100 border-2 border-gray-300 rounded-lg">
								Login
							</motion.button>
						</Link>
						<Link href="/register">
							<motion.button whileHover={{ y: 2 }} className="px-4 py-1 font-bold text-white border-2 rounded-lg border-rose-600 bg-rose-500">
								Register
							</motion.button>
						</Link>
					</div>
				)}
			</div>
		</div>
	);
}
