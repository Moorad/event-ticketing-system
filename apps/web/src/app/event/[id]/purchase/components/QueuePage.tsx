export type QueueInformation = {
	status: "waiting";
	position: number | null;
};

export default function QueuePage({ info }: { info: QueueInformation }) {
	return (
		<div>
			<div>Waiting in queue</div>
			<div>There are {info.position} people in front of you</div>
		</div>
	);
}
