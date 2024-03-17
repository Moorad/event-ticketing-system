import { useState } from "react";

type BehaviourOptions = {
	keepLoadingAfterSuccess: boolean;
};

const defaultOptions: BehaviourOptions = {
	keepLoadingAfterSuccess: false,
};

export default function useFetch(givenOptions: Partial<BehaviourOptions> = {}) {
	const options: BehaviourOptions = {
		...defaultOptions,
		...givenOptions,
	};

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	async function request(url: string, reqOptions: RequestInit) {
		setLoading(true);
		setError(null);

		const response = await fetch(url, reqOptions);

		const body = await response.json();

		if (!response.ok || body.status == "error") {
			setError(body.message);
			setLoading(false);
		} else {
			setLoading(options.keepLoadingAfterSuccess);
		}

		return { ok: response.ok, details: response, body };
	}

	return { loading, error, request };
}
