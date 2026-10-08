import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { promises as fs } from "fs";
import path from "path";
import prisma from "@/lib/db";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");
const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
const ALLOWED_VIDEO_TYPES = ["video/mp4", "video/webm", "video/quicktime"];
const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

export async function POST(req: NextRequest) {
  const token = requireAdmin();
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const type = (formData.get("type") as string) || "video"; // "video" or "photo"

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: `File too large. Max size is ${MAX_FILE_SIZE / 1024 / 1024}MB` },
        { status: 400 }
      );
    }

    const mimeType = file.type;
    const isVideo = ALLOWED_VIDEO_TYPES.includes(mimeType);
    const isImage = ALLOWED_IMAGE_TYPES.includes(mimeType);

    if (type === "video" && !isVideo) {
      return NextResponse.json(
        { error: "Invalid video type. Allowed: MP4, WebM, MOV" },
        { status: 400 }
      );
    }

    if (type === "photo" && !isImage) {
      return NextResponse.json(
        { error: "Invalid image type. Allowed: JPEG, PNG, WebP, GIF" },
        { status: 400 }
      );
    }

    if (!isVideo && !isImage) {
      return NextResponse.json(
        { error: "Invalid file type" },
        { status: 400 }
      );
    }

    await fs.mkdir(UPLOAD_DIR, { recursive: true });

    const ext = mimeType.split("/")[1].replace("quicktime", "mov");
    const filename = `${Date.now()}-${Math.floor(Math.random() * 10000)}.${ext}`;
    const filepath = path.join(UPLOAD_DIR, filename);

    const bytes = await file.arrayBuffer();
    await fs.writeFile(filepath, Buffer.from(bytes));

    const url = `/uploads/${filename}`;

    return NextResponse.json({ url, filename, size: file.size, type: mimeType });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Upload failed" },
      { status: 500 }
    );
  }
}