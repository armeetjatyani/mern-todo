import jwt from "jsonwebtoken";
import { useState, useEffect } from "react";

export default function useSession() {
	const [session, setSession] = useState({ status: "loading" });

	useEffect(() => {
		function listener() {
			try {
				if (localStorage);
			} catch (err) {}

			if (localStorage.getItem("auth")) {
				const parsed = JSON.parse(localStorage.getItem("auth"));
				try {
					const decoded = jwt.verify(parsed.accessToken, "asecret");
					const modified = {...decoded, accessToken: parsed.accessToken}
					setSession(modified);
				} catch (err) {
					{
						status: "error";
					}
				}
			} else {
				setSession({ status: "loading" });
			}
		}

		window.addEventListener("storage", listener);
		listener();

		return () => {
			window.removeEventListener("storage", listener);
		};
	}, []);

	return session;
}
