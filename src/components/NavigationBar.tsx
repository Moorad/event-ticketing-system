import { getServerSession } from "next-auth";
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

export default async function NavigationBar() {
	const session = await getServerSession();

	return (
		<div className="bg-gray-200 flex gap-5 px-5 py-2">
			{pages.map((p, i) => (
				<Link href={p.href} key={i}>
					<div className="hover:bg-gray-300 px-2 py-1 rounded">
						{p.name}
					</div>
				</Link>
			))}
			{session ? (
				<Link
					className="hover:bg-gray-300 px-2 py-1 rounded ml-auto"
					href="/api/auth/signout"
				>
					<div>Sign out</div>
				</Link>
			) : (
				<Link
					className="hover:bg-gray-300 px-2 py-1 rounded ml-auto"
					href="/auth/sign-in"
				>
					<div>Sign in</div>
				</Link>
			)}
		</div>
	);
}
