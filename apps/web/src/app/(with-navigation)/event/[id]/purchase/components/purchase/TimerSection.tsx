"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function TimerSection({ endTime }: { endTime: number }) {
	const intervalRef: React.MutableRefObject<NodeJS.Timeout | null> =
		useRef<NodeJS.Timeout | null>(null);
	const [timer, setTimer] = useState<number>(endTime - Date.now());
	const router = useRouter();

	function computeTimeRemaining() {
		return endTime - Date.now();
	}

	function formatTime(deltaTime: number) {
		let hours = Math.floor((deltaTime / 1000 / 60 / 60) % 24);
		let minutes = Math.floor((deltaTime / 1000 / 60) % 60);
		let seconds = Math.floor((deltaTime / 1000) % 60);

		let strHours = String(hours);
		let strMinutes = String(minutes);
		let strSeconds = String(seconds);

		if (hours < 0) {
			strHours = "00";
		} else if (hours <= 9) {
			strHours = "0" + hours;
		}

		if (minutes < 0) {
			strMinutes = "00";
		} else if (minutes <= 9) {
			strMinutes = "0" + minutes;
		}

		if (seconds < 0) {
			strSeconds = "00";
		} else if (seconds <= 9) {
			strSeconds = "0" + seconds;
		}

		return `${strHours}:${strMinutes}:${strSeconds}`;
	}

	useEffect(() => {
		const intervalId = setInterval(() => {
			const timeRemaining = computeTimeRemaining();
			setTimer(timeRemaining);

			if (timeRemaining <= 0) {
				alert(
					"Your given time to submit the form has finished, to allow other people behind you in the queue to get a chance to register to the event you will be placed back to the queue"
				);
				clearInterval(intervalId);
				router.refresh();
			}
		}, 1000);

		intervalRef.current = intervalId;

		return () => {
			clearInterval(intervalId);
		};
	}, [endTime]);

	return (
		<div className="p-3">
			<div className="bg-white rounded light-drop-shadow px-5 py-2 min-w-36 text-center">
				<div>Time left</div>
				<div className="text-xl font-semibold" suppressHydrationWarning>
					{formatTime(timer)}
				</div>
			</div>
		</div>
	);
}
