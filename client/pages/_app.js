import { LockClosedIcon } from "@heroicons/react/outline";
import { Toaster } from "react-hot-toast";
import "../styles/globals.css";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
	return (
		<div className="">
			<Head>
				<title>My page title</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			<Toaster key="toaster" id="toaster" />
			<div className="selection:bg-rose-500/80 selection:text-white">
				<Component {...pageProps} />
			</div>
			<footer className="sticky bottom-0 flex items-center justify-center w-full space-x-2 font-bold text-center text-white uppercase bg-rose-500">
				<LockClosedIcon width={20} height={20} strokeWidth={3} />
				<p>Do not use your real passwords here</p>
			</footer>
		</div>
	);
}

export default MyApp;
