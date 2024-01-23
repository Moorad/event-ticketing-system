import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import SignInForm from "./SignInForm";

export default async function signIn() {
	const session = await getServerSession(options);

	if (session) {
		redirect("/");
	}

	return <SignInForm />;
}
