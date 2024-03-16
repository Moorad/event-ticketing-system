import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import Link from "next/link";
import SignOutButton from "./SignOutButton";
import {
	faRightToBracket,
	faTicket,
	faWallet,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const pages = [
	{
		icon: faTicket,
		name: "Browse",
		href: "/",
	},
	{
		icon: faWallet,
		name: "Wallet",
		href: "/wallet",
	},
];

export default async function NavigationBar() {
	const session = await getServerSession(options);

	return (
		<div className="bg-brand-black text-white flex items-center gap-5 px-5 py-2">
			<Link href="/">
				<div className="p-2 hover:bg-white/10 rounded">
					<img src="/logo-dark.svg" className="h-9" />
				</div>
			</Link>
			{pages.map((p, i) => (
				<Link href={p.href} key={i}>
					<div className="hover:bg-white/10 px-2 py-1 rounded">
						<FontAwesomeIcon icon={p.icon} className="mr-3" />
						{p.name}
					</div>
				</Link>
			))}
			{session ? (
				<SignOutButton className="hover:bg-white/10 px-3 py-1 rounded ml-auto w-fit" />
			) : (
				<Link
					className="hover:bg-white/10 px-2 py-1 rounded ml-auto w-24 text-center"
					href="/auth/sign-in"
				>
					<FontAwesomeIcon icon={faRightToBracket} className="mr-3" />
					Sign in
				</Link>
			)}
		</div>
	);
}
