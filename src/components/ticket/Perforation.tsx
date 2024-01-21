// perforation (/ˌpəːfəˈreɪʃn/)
// noun: a small hole or row of small holes punched in a sheet of paper, e.g. of postage stamps, so that a part can be torn off easily.

export default function Perforation() {
	return (
		<div className="flex gap-2">
			<div className="w-4 h-4 bg-white rounded-r-full"></div>
			<div className="flex-grow bordered border-t-2 border-dashed border-white h-0 self-center"></div>
			<div className="w-4 h-4 bg-white rounded-l-full"></div>
		</div>
	);
}
