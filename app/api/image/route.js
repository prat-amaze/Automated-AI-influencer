import { ai } from "@/lib/gemini";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    let { prompt, aspectRatio, count } = await req.json();
    count= parseInt(count)
    // prompt= "A girl holding a red skateboard"

    if (!prompt) {
      return NextResponse.json(
        { ok: false, error: "Missing prompt" },
        { status: 400 }
      );
    }

    // 🔥 MOCK IMAGES (replace with Imagen later)
    // const images = Array.from({ length: count || 2 }).map(
    //   () =>
    //     "https://picsum.photos/seed/" +
    //     Math.random().toString(36).slice(2) +
    //     "/512/768"
    // );

    const response = await ai.models.generateImages({
        model: "imagen-4.0-generate-001",
        prompt: prompt,
        config: {
            numberOfImages: count,
            aspectRatio: aspectRatio,
            safetySetting: "block_only_high",
            personGeneration: "allow_all",
            includeRaiReason: true
        },
    });

    const images = response.generatedImages.map(img => {
        const base64Data = img.image.imageBytes;
        return `data:image/png;base64,${base64Data}`;
    });

    // return NextResponse.json({ ok: true, images });
    return NextResponse.json({
      ok: true,
      images,
    });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err.message },
      { status: 500 }
    );
  }
}
