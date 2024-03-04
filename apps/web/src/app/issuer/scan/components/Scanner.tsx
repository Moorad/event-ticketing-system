const commonStyling = "w-20 aspect-square border-orange-400 absolute"

export default function Scanner() {
    return <div className="max-sm:w-full sm:h-full aspect-square relative">
        <div className={`${commonStyling} border-l-2 border-t-2 top-0 left-0`}></div>
        <div className={`${commonStyling} border-r-2 border-t-2 top-0 right-0`}></div>
        <div className={`${commonStyling} border-l-2 border-b-2 bottom-0 left-0`}></div>
        <div className={`${commonStyling} border-r-2 border-b-2 bottom-0 right-0`}></div>
    </div>
}