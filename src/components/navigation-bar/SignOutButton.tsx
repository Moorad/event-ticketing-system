"use client";

import { useEffect, useState } from "react";
import LoadingButton from "../LoadingButton";
import { signOut } from "next-auth/react";

export default function SignOutButton({
	className,
}: {
	className?: string | undefined;
}) {
	const [clicked, setClicked] = useState(false);

	useEffect(() => {
		if (clicked) {
			signOut({ callbackUrl: "/auth/sign-in" });
		}
	}, [clicked]);

	return (
		<LoadingButton
			loading={clicked}
			className={className}
			loaderColor="#404040"
			onClick={() => setClicked(true)}
		>
			Sign out
		</LoadingButton>
	);
}
