import { useState } from "react";

export default function useFetch() {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	async function request(url: string, reqOptions: RequestInit) {
		setLoading(true);
		setError(null);

		const response = await fetch(url, reqOptions);

		const body = await response.json();

		if (!response.ok && body.status == "error") {
			setError(body.message);
		}

		setLoading(false);

		return { ok: response.ok, details: response, body };
	}

	return { loading, error, request };
}
