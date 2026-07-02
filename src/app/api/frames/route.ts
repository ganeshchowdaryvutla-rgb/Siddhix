import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  const framesDir = path.join(process.cwd(), "public", "frames");

  try {
    if (!fs.existsSync(framesDir)) {
      return NextResponse.json({ frames: [], error: "Frames directory not found" }, { status: 404 });
    }

    const files = fs.readdirSync(framesDir)
      .filter((file) => /\.(webp|png|jpg|jpeg|avif)$/i.test(file))
      .sort((a, b) => {
        const numA = parseInt(a.replace(/\D/g, "")) || 0;
        const numB = parseInt(b.replace(/\D/g, "")) || 0;
        return numA - numB;
      })
      .map((file) => `/frames/${file}`);

    return NextResponse.json({ frames: files, count: files.length });
  } catch {
    return NextResponse.json({ frames: [], error: "Failed to read frames" }, { status: 500 });
  }
}
