import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import Link from "next/link";
import SignOutButton from "./SignOutButton";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons/faRightToBracket";
import { faTicket } from "@fortawesome/free-solid-svg-icons/faTicket";
import { faWallet } from "@fortawesome/free-solid-svg-icons/faWallet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarPlus } from "@fortawesome/free-solid-svg-icons/faCalendarPlus";
import { faQrcode } from "@fortawesome/free-solid-svg-icons/faQrcode";
import { Permission, checkPermission } from "@/utils/permissions";

const pages = {
	consumer: [
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
	],
	issuer: [
		{
			icon: faTicket,
			name: "Browse",
			href: "/",
		},
		{
			icon: faQrcode,
			name: "Scan Ticket",
			href: "/issuer/scan",
		},
		{
			icon: faCalendarPlus,
			name: "Create event",
			href: "/issuer/create",
		},
	],
};

export default async function NavigationBar() {
	const session = await getServerSession(options);
	const hasPermission = await checkPermission(session, Permission.ISSUER);

	function renderPages() {
		const pagesToRender = hasPermission ? pages.issuer : pages.consumer;

		return pagesToRender.map((p, i) => (
			<Link href={p.href} key={i}>
				<div className="hover:bg-white/10 px-2 py-1 rounded">
					<FontAwesomeIcon icon={p.icon} className="mr-3" />
					{p.name}
				</div>
			</Link>
		));
	}

	return (
		<div className="bg-brand-black text-white flex items-center gap-5 px-5 py-2">
			<Link href="/">
				<div className="p-2 hover:bg-white/10 rounded">
					<img src="/logo-dark.svg" className="h-9" />
				</div>
			</Link>
			{renderPages()}
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
