import { ClipboardListIcon, PlusIcon, TrashIcon, XCircleIcon } from "@heroicons/react/outline";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { Fragment, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import SyncLoader from "react-spinners/SyncLoader";
import Navbar from "../components/Navbar";
import useSession from "../hooks/useSession";
import { Dialog } from "@headlessui/react";
import { useRouter } from "next/router";

export default function Home() {
	const session = useSession();
	const newRef = useRef(null);
	const router = useRouter();
	const [tasks, setTasks] = useState(undefined);
	const [visible, setVisible] = useState(false);

	async function getData() {
		if (session.username) {
			const res = await fetch(`${process.env.NEXT_PUBLIC_API}/tasks/${session.username}`, {
				headers: {
					Authorization: `${session.accessToken}`,
				},
			});
			const resJSON = await res.json();
			setTasks(resJSON);
		}
	}

	useEffect(() => {
		getData();
	}, [session, getData]);

	return (
		<div>
			<Navbar />
			<div className="flex justify-center h-[700px]">
				{session.username ? (
					<div className="w-[70%] flex flex-col space-y-2">
						<div className="flex justify-between">
							<h1 className="inline text-3xl font-bold border-b-8 w-fit border-b-rose-500">Your List</h1>
							<motion.button whileHover={{ rotate: 90, scale: 1.05 }} whileTap={{ rotate: 180, scale: 0.95 }} className="flex justify-center p-2 text-white rounded-full item-center bg-rose-500 w-fit h-fit" onClick={() => setVisible(true)}>
								<PlusIcon width={20} height={20} strokeWidth={3} onClick={() => setVisible(true)} />
							</motion.button>
						</div>
						{tasks && Array.isArray(tasks) ? (
							tasks.length === 0 ? (
								<p>You haven't added any tasks yet. Use the plus button to add one!</p>
							) : (
								<ul className="w-full overflow-y-auto">
									{tasks.map((task) => {
										return (
											<motion.li key={task._id} className={`group cursor-pointer w-full flex items-center space-x-2 hover:bg-gray-100 transition-colors duration-200 rounded-lg px-2 py-2 ${!task.status && "opacity-30"}`}>
												<section className="flex items-center w-full space-x-2">
													<button
														onClick={async (e) => {
															e.preventDefault();
															const res = await fetch(`${process.env.NEXT_PUBLIC_API}/tasks`, {
																method: "PUT",
																headers: {
																	"Content-Type": "application/json",
																},
																body: JSON.stringify({
																	username: session.username,
																	_id: task._id,
																}),
															});
															setVisible(false);
															getData();
														}}
														className={`w-5 h-5 duration-200 border-[3px] border-gray-300 rounded-md hover:border-rose-500 ${!task.status && "bg-rose-500 border-transparent"}`}
													/>
													<p className={`${!task.status && "line-through select-none"}`}>{task.description}</p>
												</section>
												<button
													className="p-1 text-white duration-200 rounded-lg opacity-0 bg-rose-500 group-hover:opacity-100 hover:scale-110 active:scale-90"
													onClick={async (e) => {
														e.preventDefault();
														const res = await fetch(`${process.env.NEXT_PUBLIC_API}/tasks`, {
															method: "DELETE",
															headers: {
																"Content-Type": "application/json",
															},
															body: JSON.stringify({
																username: session.username,
																_id: task._id,
															}),
														});
														setVisible(false);
														getData();
													}}
												>
													<TrashIcon width={20} height={20} />
												</button>
											</motion.li>
										);
									})}
								</ul>
							)
						) : (
							<div className="flex items-center justify-center w-full h-[200px]">
								<SyncLoader color="#f43f5e" />
							</div>
						)}
					</div>
				) : (
					<div className="w-[70%] bg-rose-500 rounded-xl flex flex-col space-y-4 items-center justify-center text-white p-10">
						<h1 className="text-5xl font-bold">Welcome!</h1>
						<p className="text-xl">Keep track of your tasks!</p>
						<ClipboardListIcon width={100} height={100} />
						<Link href="/register">
							<a
								className="px-8 py-2 font-bold bg-white rounded-md text-rose-500"
								onClick={() => {
									toast("Sign up for an account!");
								}}
							>
								Get Started
							</a>
						</Link>
					</div>
				)}
			</div>

			<Dialog as={Fragment} open={visible} onClose={() => setVisible(false)}>
				<div className="absolute top-0 left-0 flex items-center justify-center w-full h-screen bg-black/20">
					<motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} className="absolute p-10 bg-white rounded-md w-[70%]">
						<motion.button whileHover={{ rotate: 90, scale: 1.05 }} whileTap={{ rotate: 180, scale: 0.95 }} className="absolute p-2 rounded-full top-4 right-4 text-rose-500" onClick={() => setVisible(false)}>
							<XCircleIcon width={40} height={40} />
						</motion.button>
						<form
							className="flex flex-col space-y-2"
							onSubmit={async (e) => {
								e.preventDefault();
								const res = await fetch(`${process.env.NEXT_PUBLIC_API}/tasks`, {
									method: "POST",
									headers: {
										"Content-Type": "application/json",
									},
									body: JSON.stringify({
										username: session.username,
										description: newRef.current.value,
									}),
								});
								getData();
								setVisible(false);
							}}
						>
							<h2 className="mb-2 text-2xl font-bold text-center">New Task</h2>
							<input ref={newRef} placeholder="Enter description" autoFocus={true} className="px-4 py-2 transition-all duration-200 border-0 rounded-sm outline-0 ring-2 ring-gray-300 focus:ring-rose-500" type="text" name="task" />
							<button type="submit" className="w-full px-4 py-2 font-bold text-white transition-all duration-200 rounded-sm bg-rose-500">
								Create
							</button>
						</form>
					</motion.div>
				</div>
			</Dialog>
		</div>
	);
}
