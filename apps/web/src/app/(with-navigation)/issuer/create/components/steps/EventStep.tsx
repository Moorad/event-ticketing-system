import { ChangeEvent, useContext, useState } from "react";
import FieldRow from "../FieldRow";
import { EventFormContext } from "../../page";
import useFetch from "@/utils/hooks/useFetch";
import { AllowedUploads as AllowedUploadType } from "@/app/api/image/upload/route";

export default function EventStep() {
	const ctx = useContext(EventFormContext);
	const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(
		ctx.event.thumbnail || null
	);
	const [logoPreview, setLogoPreview] = useState<string | null>(
		ctx.event.logo || null
	);
	const { request } = useFetch();

	async function handleImageUpload(
		e: ChangeEvent<HTMLInputElement>,
		uploadType: AllowedUploadType
	) {
		if (e.target.files && e.target.files.length > 0) {
			const formData = new FormData();

			formData.append("type", uploadType);
			formData.append("image", e.target.files[0]);

			const res = await request("/api/image/upload", {
				method: "POST",
				body: formData,
				headers: {
					"Conent-Type": "multipart/form-data",
				},
			});

			if (res.ok) {
				if (uploadType == "thumbnail") {
					setThumbnailPreview(res.body.imageURL);
					ctx.setEvent({
						...ctx.event,
						thumbnail: res.body.imageURL,
					});
				} else {
					setLogoPreview(res.body.imageURL);
					ctx.setEvent({
						...ctx.event,
						logo: res.body.imageURL,
					});
				}
			}
		}
	}
	return (
		<>
			<FieldRow
				title="Name"
				description="This will be the event name displayed on the home and details page"
			>
				<input
					type="text"
					className="w-full border px-3 py-2 text-sm"
					placeholder="Event name"
					value={ctx.event.name}
					onChange={(e) => {
						ctx.setEvent({
							...ctx.event,
							name: e.target.value,
						});
					}}
				/>
			</FieldRow>
			<hr className="my-3" />
			<FieldRow
				title="Description"
				description="Provide a brief overview or description of your event. "
			>
				<textarea
					className="w-full border px-3 py-2 text-sm resize-none"
					placeholder="Description"
					value={ctx.event.description}
					onChange={(e) => {
						ctx.setEvent({
							...ctx.event,
							description: e.target.value,
						});
					}}
				/>
			</FieldRow>
			<hr className="my-3" />
			<FieldRow
				title="Dates"
				description="Specify the date when your event will begin and end."
			>
				<div className="flex gap-5">
					<input
						type="date"
						className="w-full border px-3 py-2 text-sm"
						placeholder="Start Date"
						value={ctx.event.startDate.toISOString().split("T")[0]}
						onChange={(e) => {
							ctx.setEvent({
								...ctx.event,
								startDate: new Date(e.target.value),
							});
						}}
					/>
					<input
						type="date"
						className="w-full border px-3 py-2 text-sm"
						placeholder="End Date"
						value={
							ctx.event.endDate
								? ctx.event.endDate.toISOString().split("T")[0]
								: undefined
						}
						onChange={(e) => {
							ctx.setEvent({
								...ctx.event,
								endDate: new Date(e.target.value),
							});
						}}
					/>
				</div>
			</FieldRow>
			<hr className="my-3" />
			<FieldRow
				title="Location"
				description="Enter the location where your event will take place."
			>
				<input
					type="text"
					className="w-full border px-3 py-2 text-sm"
					placeholder="Location address"
					value={ctx.event.location}
					onChange={(e) => {
						ctx.setEvent({
							...ctx.event,
							location: e.target.value,
						});
					}}
				/>
			</FieldRow>
			<hr className="my-3" />
			<FieldRow
				title="Thumbnail"
				description="Enter the location where your event will take place. Use an image with a resolution of 1080x432 or maintain a 5:2 aspect ration for best representation"
			>
				<input
					className="text-sm file:bg-red-500 file:text-white file:py-2 file:px-4 file:rounded text-black file:border-0 hover:file:bg-red-600"
					type="file"
					onChange={(e) => {
						handleImageUpload(e, "thumbnail");
					}}
				/>

				{thumbnailPreview && (
					<div className="mt-4">
						<img
							className="aspect-[10/4] object-cover rounded-md"
							src={thumbnailPreview}
							alt=""
						/>
						<div className="text-gray-400 text-xs">Preview</div>
					</div>
				)}
			</FieldRow>
			<hr className="my-3" />
			<FieldRow
				title="Logo"
				required={false}
				description="Upload the logo or branding image associated with your event. (optional)"
			>
				<input
					className="text-sm file:bg-red-500 file:text-white file:py-2 file:px-4 file:rounded text-black file:border-0 hover:file:bg-red-600"
					type="file"
					onChange={(e) => {
						handleImageUpload(e, "logo");
					}}
				/>

				{logoPreview && (
					<div className="mt-4">
						<div className="bg-gray-300 rounded-md w-1/2 p-2">
							<img
								src={logoPreview}
								className="aspect-square object-contain"
							/>
						</div>
						<div className="text-gray-400 text-xs">Preview</div>
					</div>
				)}
			</FieldRow>
		</>
	);
}
