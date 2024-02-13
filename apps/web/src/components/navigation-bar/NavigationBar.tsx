import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import Link from "next/link";
import SignOutButton from "./SignOutButton";

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
	const session = await getServerSession(options);

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
				<SignOutButton className="hover:bg-gray-300 px-2 py-1 rounded ml-auto w-24" />
			) : (
				<Link
					className="hover:bg-gray-300 px-2 py-1 rounded ml-auto w-24 text-center"
					href="/auth/sign-in"
				>
					Sign in
				</Link>
			)}
		</div>
	);
}
