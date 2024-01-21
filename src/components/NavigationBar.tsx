import Link from "next/link";

const pages = [
	{
		name: "Home",
		href: "/",
	},
	{
		name: "Wallet",
		href: "/wallet",
	},
];

export default function NavigationBar() {
	return (
		<div className="bg-gray-200 flex gap-5 px-5 py-2">
			{pages.map((p) => (
				<Link href={p.href}>
					<div className="hover:bg-gray-300 px-2 py-1 rounded">
						{p.name}
					</div>
				</Link>
			))}
		</div>
	);
}
