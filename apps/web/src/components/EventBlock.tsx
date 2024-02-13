import { Prisma } from "@prisma/client";
import Link from "next/link";

export default function EventBlock(props: {
	data: Prisma.EventCreateManyInput;
}) {
	return (
		<Link href={"/event/" + props.data.id}>
			<div className="flex flex-col justify-center w-32 h-32 bg-gray-300 text-center hover:cursor-pointer hover:bg-gray-400">
				<div>{props.data.name}</div>
			</div>
		</Link>
	);
}
