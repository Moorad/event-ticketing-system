import Link from "next/link";
import { FormEvent, ReactNode } from "react";

export default function FormContainer({
	children,
	title,
	altMethod,
	onSubmit,
}: {
	children?: ReactNode;
	title?: string;
	altMethod?: {
		name: string;
		text: string;
		url: string;
	};
	onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}) {
	return (
		<div className="h-full flex flex-col gap-12">
			<div>
				<div className="text-center">
					<Link href="/">
						<img
							className="w-10 m-auto mb-6"
							src="/logo-light.svg"
							alt="logo"
						/>
					</Link>
				</div>
				<div className="font-semibold text-2xl mb-2">{title}</div>
				<div className="text-sm">
					{altMethod && (
						<>
							{altMethod.text + " "}
							<Link
								className="text-brand-red font-semibold"
								href={altMethod.url}
							>
								{altMethod.name}
							</Link>
						</>
					)}
				</div>
			</div>
			<form onSubmit={onSubmit} className="flex flex-col flex-1 gap-5">
				{children}
			</form>
		</div>
	);
}
