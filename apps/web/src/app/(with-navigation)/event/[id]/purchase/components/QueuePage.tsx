"use client"
import { formatTimeLeft } from "@/utils/format";
import { useEffect, useState } from "react";
import { Response } from "../page";
import { useRouter } from "next/navigation";

export type QueueInformation = {
	status: "waiting";
	position: number | null;
};


export default function QueuePage({ info, params }: { info: QueueInformation, params: { id: string } }) {
	const [queueState, setQueueState] = useState<QueueInformation>(info)
	const router = useRouter();

	useEffect(() => {
		setInterval(() => {
			fetch("http://localhost:4000/queue/check", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					eid: Number(params.id),
					uid: 2,
				}),
				cache: "no-store",
			}).then(res => res.json())
				.then((json: Response) => {
					if (json.status == 'waiting') {
						setQueueState(json);
					} else {
						router.refresh()
					}
				})
		}, 10000)
	}, [])

	return (
		<div className="flex flex-col max-w-96 gap-5 absolute-center text-brand-black">
			<div className="flex flex-col">
				<div className="font-semibold text-center text-3xl">You are in the queue...</div>
				<div className="text-center text-gray-500">Event name here</div>
			</div>
			<div className="flex flex-col text-center gap-5">
				<div className="flex gap-5">
					<div className="w-1/2 flex flex-col justify-center tracking-tight">
						Number of people in front of you
					</div>
					<div className="w-1/2 flex flex-col justify-center">
						Estimated wait time
					</div>
				</div>
				<div className="flex gap-5">
					<div className="w-1/2 flex flex-col justify-center font-semibold">
						{queueState.position || "N/A"}
					</div>
					<div className="w-1/2 flex flex-col justify-center font-semibold">
						{queueState.position ? formatTimeLeft(((queueState.position) * (1 / 20)) * 60 * 1000) : "N/A"}
					</div>
				</div>
			</div>

		</div>
	);
}
