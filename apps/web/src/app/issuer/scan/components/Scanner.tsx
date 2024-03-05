"use client";

import { Html5Qrcode, Html5QrcodeResult } from "html5-qrcode";
import { Html5QrcodeSupportedFormats } from "html5-qrcode/esm/core";
import { useEffect, useState } from "react";

const commonStyling = "w-20 aspect-square border-orange-400 absolute z-10";

export type QRValueType = { ticketId: number };

export default function Scanner({
	detectedQRCode,
}: {
	detectedQRCode: (value: QRValueType) => void;
}) {
	const [isCameraOpen, setIsCameraOpen] = useState(false);
	const [QRScanner, setQRScanner] = useState<Html5Qrcode | null>(null);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (QRScanner == null) {
			setQRScanner(
				new Html5Qrcode("reader", {
					formatsToSupport: [Html5QrcodeSupportedFormats.QR_CODE],
					verbose: true,
				})
			);
		}
	}, []);

	useEffect(() => {
		if (QRScanner != null && isCameraOpen) {
			QRScanner.start(
				{ facingMode: "user" },
				{
					fps: 5,
					aspectRatio: 1,
					disableFlip: true,
				},
				success,
				() => {}
			).catch((err) => {
				setError(
					"You have not granted camera permission or some API is not supported by your browser"
				);
			});
		}
	}, [isCameraOpen]);

	function success(decodedText: string, result: Html5QrcodeResult) {
		const json: QRValueType = JSON.parse(decodedText);
		QRScanner?.stop();
		setIsCameraOpen(false);
		detectedQRCode(json);
	}

	return (
		<>
			<div
				className="max-sm:w-full sm:h-full aspect-square relative"
				onClick={() => setIsCameraOpen(true)}
			>
				<div
					className={`${commonStyling} border-l-2 border-t-2 top-0 left-0`}
				></div>
				<div
					className={`${commonStyling} border-r-2 border-t-2 top-0 right-0`}
				></div>
				<div
					className={`${commonStyling} border-l-2 border-b-2 bottom-0 left-0`}
				></div>
				<div
					className={`${commonStyling} border-r-2 border-b-2 bottom-0 right-0`}
				></div>
				{!isCameraOpen && (
					<div className="h-full w-full flex justify-center items-center text-gray-500 leading-[0]">
						Click here to open the camera
					</div>
				)}
				{error && (
					<div className="h-full w-full flex justify-center items-center text-orange-500 px-5 text-center">
						{error}
					</div>
				)}
				<div
					id="reader"
					className="max-sm:w-full sm:h-full aspect-square"
				></div>
			</div>
		</>
	);
}
