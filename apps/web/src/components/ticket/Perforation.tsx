// perforation (/ˌpəːfəˈreɪʃn/)
// noun: a small hole or row of small holes punched in a sheet of paper, e.g. of postage stamps, so that a part can be torn off easily.

export default function Perforation({
	sideCutOutClassName,
	middleCutOutClassName,
}: {
	sideCutOutClassName: string;
	middleCutOutClassName: string;
}) {
	return (
		<div className="flex gap-2">
			<div
				className={`w-4 h-4 rounded-r-full ${sideCutOutClassName}`}
			></div>
			<div
				className={`flex-grow bordered border-t-4 border-dashed h-0 self-center ${middleCutOutClassName}`}
			></div>
			<div
				className={`w-4 h-4 rounded-l-full ${sideCutOutClassName}`}
			></div>
		</div>
	);
}
