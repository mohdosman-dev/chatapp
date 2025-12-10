import fs from "fs";
import path from "path";
import crypto from "crypto";
import { BadRequestError } from "./app-error";

export const saveBase64Image = (base64: string, folder = "uploads"): string => {
  if (!base64) {
    throw new BadRequestError("Empty image payload");
  }

  const matches = base64.match(/^data:(image\/\w+);base64,(.+)$/);
  if (!matches) {
    throw new BadRequestError("Invalid base64 image format");
  }

  const ext = matches[1].split("/")[1];
  const data = matches[2];

  const buffer = Buffer.from(data, "base64");

  const fileName = `${crypto.randomUUID()}.${ext}`;
  const uploadPath = path.join(process.cwd(), folder);

  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
  }

  const filePath = path.join(uploadPath, fileName);

  fs.writeFileSync(filePath, buffer);

  return `${folder}/${fileName}`;
};
