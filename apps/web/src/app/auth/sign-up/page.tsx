import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import SignUpForm from "./SignUpForm";

export default async function signUp() {
	const session = await getServerSession(options);

	if (session) {
		redirect("/");
	}

	return <SignUpForm />;
}
