import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function SearchBar() {
	return (
		<div className="relative">
			<FontAwesomeIcon
				icon={faMagnifyingGlass}
				className="absolute top-[18px] left-3 w-4 text-gray-400"
			/>
			<input
				className="bg-white border-gray-300 border rounded-full py-2 pr-6 pl-9 text-sm my-2 w-64"
				placeholder="Search"
			/>
		</div>
	);
}
