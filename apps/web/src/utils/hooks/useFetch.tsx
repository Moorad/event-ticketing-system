import { useState } from "react";

export default function useFetch(url: string) {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	async function request(reqOptions: RequestInit) {
		setLoading(true);
		setError(null);

		const response = await fetch(url, reqOptions);

		const body = await response.json();

		if (!response.ok && body.status == "error") {
			setLoading(false);
			setError(body.message);
		}

		return { ok: response.ok, details: response, body };
	}

	return { loading, error, request };
}
