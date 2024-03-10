"use client";
import { Event } from "database";
import { UIEvent, UIEventHandler, useEffect, useRef, useState } from "react";

export default function FeaturedEvents({
	events,
}: {
	events: (Event & { thumbnail: string; logo: string })[];
}) {
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
		return (window.innerWidth / 2) * index - window.innerWidth / 4;
	}

	function silentlySwitch(e: UIEvent<HTMLDivElement>) {
		if (e && currentEvent == events.length + 1) {
			if (e.currentTarget.scrollLeft == computeScrollLeft(currentEvent)) {
				setCurrentEvent(1);
			}
		}
	}

	function renderFeaturedEvent(
		key: number,
		event: Event & { thumbnail: string; logo: string }
	) {
		return (
			<div
				key={key}
				className=" w-1/2 flex-shrink-0 aspect-[10/4] featured-event relative"
			>
				{/* {JSON.stringify(event)} */}
				<img src={event.thumbnail} className="rounded-md" />
				<div className="w-full h-full absolute z-10 top-0 right-0 bg-gradient-to-t from-brand-black to-transparent rounded-md"></div>
				<img
					src={event.logo}
					className="absolute bottom-5 left-5 w-24 z-20"
					alt=""
				/>
			</div>
		);
	}

	return (
		<div
			className="flex gap-8 w-full overflow-hidden my-5"
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
