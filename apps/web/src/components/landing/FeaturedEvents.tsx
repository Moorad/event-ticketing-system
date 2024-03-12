"use client";
import { Event } from "database";
import Link from "next/link";
import { UIEvent, useEffect, useRef, useState } from "react";

export default function FeaturedEvents({ events }: { events: Event[] }) {
	const [currentEvent, setCurrentEvent] = useState(1);
	const scrollableRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentEvent((eventIdx) => eventIdx + 1);
		}, 5000);

		return () => {
			clearInterval(interval);
		};
	}, []);

	useEffect(() => {
		if (scrollableRef.current) {
			let scrollOption: ScrollToOptions = {
				left: computeScrollLeft(currentEvent),
				behavior: "smooth",
			};

			if (currentEvent == 1) {
				scrollOption.behavior = "instant";
			}

			scrollableRef.current.scrollTo(scrollOption);
		}
	}, [currentEvent]);

	function computeScrollLeft(index: number) {
		const containerSize =
			document.getElementsByClassName("featured-event")[0].clientWidth;
		return containerSize * index - containerSize / 2 + 32 * index + 16;
	}

	function silentlySwitch(e: UIEvent<HTMLDivElement>) {
		if (e && currentEvent >= events.length + 1) {
			if (currentEvent > events.length + 1) {
				setCurrentEvent(1);
			}
		}
	}

	function renderFeaturedEvent(key: number, event: Event) {
		return (
			<div
				key={key}
				className=" w-1/2 min-w-72 flex-shrink-0 aspect-[10/4] featured-event relative"
			>
				<Link href={`/event/${event.id}`}>
					<img src={event.thumbnail} className="rounded-md" />
					<div className="w-full h-full absolute z-10 top-0 right-0 bg-gradient-to-t from-brand-black to-transparent rounded-md"></div>
					{event.logo ? (
						<img
							src={event.logo}
							className="absolute bottom-5 left-5 w-1/4 z-20"
							alt=""
						/>
					) : (
						<div className="absolute bottom-5 left-5 z-20 text-white text-3xl font-bold">
							{event.name}
						</div>
					)}
				</Link>
			</div>
		);
	}

	return (
		<div
			className="flex gap-[32px] w-full overflow-hidden my-5"
			ref={scrollableRef}
			onScroll={silentlySwitch}
		>
			{renderFeaturedEvent(events.length, events[events.length - 1])}
			{events.map((e, i) => renderFeaturedEvent(i, e))}
			{renderFeaturedEvent(-1, events[0])}
			{renderFeaturedEvent(-2, events[1])}
		</div>
	);
}
