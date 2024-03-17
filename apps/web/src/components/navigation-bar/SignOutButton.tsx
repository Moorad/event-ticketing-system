"use client";

import { useEffect, useState } from "react";
import LoadingButton from "../LoadingButton";
import { signOut } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons/faRightFromBracket";

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
			loaderColor="#fffff"
			onClick={() => setClicked(true)}
		>
			<FontAwesomeIcon icon={faRightFromBracket} />
		</LoadingButton>
	);
}
