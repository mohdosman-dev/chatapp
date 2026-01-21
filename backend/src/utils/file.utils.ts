import fs from "fs";
import path from "path";
import { AppError } from "./app-error";

export async function saveAvatar(
  file: any | string,
  identifier: string,
): Promise<string> {
  const uploadDir = path.join(__dirname, "../../uploads/avatars");

  // Ensure directory exists
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  // Handle Base64 String
  if (typeof file === "string") {
    // Expecting format: "data:image/png;base64,iVBORw0KGgo..."
    const matches = file.match(/^data:(.+);base64,(.+)$/);
    if (!matches) {
      throw new AppError("Invalid base64 format", 400);
    }

    const mimeType = matches[1];
    const base64Data = matches[2];

    if (!mimeType.startsWith("image/")) {
      throw new AppError("Only image files are allowed", 400);
    }

    const extension = "." + mimeType.split("/")[1];
    const filename = `avatar-${identifier}-${Date.now()}${extension}`;
    const uploadPath = path.join(uploadDir, filename);

    const buffer = Buffer.from(base64Data, "base64");
    await fs.promises.writeFile(uploadPath, buffer);

    return `/uploads/avatars/${filename}`;
  }

  // Handle File Object (Multipart)
  // Validation
  if (!file.mimetype.startsWith("image/")) {
    throw new AppError("Only image files are allowed", 400);
  }

  const extension = path.extname(file.filename);
  const filename = `avatar-${identifier}-${Date.now()}${extension}`;
  const uploadPath = path.join(uploadDir, filename);

  // Handle file content
  if (file.file) {
    // If it's a stream/buffer wrapper
    const buffer = await file.toBuffer();
    await fs.promises.writeFile(uploadPath, buffer);
  } else if (file._buf) {
    // Direct buffer access if available (fastify-multipart specific)
    await fs.promises.writeFile(uploadPath, file._buf);
  } else {
    throw new AppError("File upload failed: No file content", 400);
  }

  return `/uploads/avatars/${filename}`;
}
