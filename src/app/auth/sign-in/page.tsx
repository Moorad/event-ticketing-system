export default function signIn() {
	return (
		<form className="flex flex-col">
			<div>Sign in</div>
			<input className="border-gray-400 border w-32" />
			<input className="border-gray-400 border w-32" />
			<button className="w-32">Submit</button>
		</form>
	);
}
