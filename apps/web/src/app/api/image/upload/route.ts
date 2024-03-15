import { randomUUID } from "crypto";
import { Client } from "minio";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export type AllowedUploads = "thumbnail" | "logo";

const MimeType: Record<string, string> = {
	"image/gif": "gif",
	"image/jpeg": "jpg",
	"image/png": "png",
	"image/tiff": "tiff",
};

export async function POST(req: NextRequest) {
	const formData = await req.formData();

	const image = formData.get("image") as File | null;
	const type = formData.get("type") as AllowedUploads | null;

	if (image == null) {
		return Response.json({
			status: "error",
			message: "You must provide a file in 'image' in the request body",
		});
	}

	if (type == null) {
		return Response.json({
			status: "error",
			message:
				"You must specifiy the type of upload in 'type' in the request body",
		});
	}

	const minioClient = new Client({
		accessKey: process.env.MINIO_ACCESS_KEY!,
		secretKey: process.env.MINIO_SECRET_KEY!,
		endPoint: process.env.MINIO_URL!,
		port: 9000,
		useSSL: false,
	});

	const fileName = `${randomUUID()}.${MimeType[image.type] || "png"}`;
	const bucketName = `event-${type}s`;
	const fileBuffer = await image.arrayBuffer();

	await minioClient.putObject(bucketName, fileName, Buffer.from(fileBuffer));

	return Response.json({
		status: "success",
		imageURL: `http://localhost:9000/${bucketName}/${fileName}`,
	});
}
