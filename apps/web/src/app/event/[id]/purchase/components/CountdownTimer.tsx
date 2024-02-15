"use client";

import { useEffect, useRef, useState } from "react";

export default function CountdownTimer({ endTime }: { endTime: number }) {
	const intervalRef: React.MutableRefObject<NodeJS.Timeout | null> =
		useRef<NodeJS.Timeout | null>(null);
	const [timer, setTimer] = useState("00:00:00");

	function computeTimeRemaining() {
		const deltaTime = new Date(endTime - Date.now()).getTime();

		return {
			hours: Math.floor((deltaTime / 1000 / 60 / 60) % 24),
			minutes: Math.floor((deltaTime / 1000 / 60) % 60),
			seconds: Math.floor((deltaTime / 1000) % 60),
		};
	}

	function formatTime(timeObject: {
		hours: number;
		minutes: number;
		seconds: number;
	}) {
		let strHours = String(timeObject.hours);
		let strMinutes = String(timeObject.minutes);
		let strSeconds = String(timeObject.seconds);

		if (timeObject.hours < 0) {
			strHours = "00";
		} else if (timeObject.hours <= 9) {
			strHours = "0" + timeObject.hours;
		}

		if (timeObject.minutes < 0) {
			strMinutes = "00";
		} else if (timeObject.minutes <= 9) {
			strMinutes = "0" + timeObject.minutes;
		}

		if (timeObject.seconds < 0) {
			strSeconds = "00";
		} else if (timeObject.seconds <= 9) {
			strSeconds = "0" + timeObject.seconds;
		}

		return `${strHours}:${strMinutes}:${strSeconds}`;
	}

	useEffect(() => {
		if (intervalRef.current) {
			clearInterval(intervalRef.current);
		}

		const intervalId = setInterval(() => {
			const timeRemaining = computeTimeRemaining();
			setTimer(formatTime(timeRemaining));
		}, 1000);

		intervalRef.current = intervalId;
	}, []);

	return <div>{timer}</div>;
}
