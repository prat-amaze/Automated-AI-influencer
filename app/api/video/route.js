import { ai } from "@/lib/gemini";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    let { imageBytes, prompt, script, aspectRatio } = await req.json();
    const fullPrompt = `${prompt}\n${script}`;
    // console.log(fullPrompt)

    if (!imageBytes) {
      return NextResponse.json(
        { ok: false, error: "Missing image data" },
        { status: 400 }
      );
    }

    // 1. Start the generation
    let operation = await ai.models.generateVideos({
      model: "veo-3.1-generate-preview",
      prompt: fullPrompt,
      image: {
        imageBytes: imageBytes,
        mimeType: "image/png",
      },
      config: {
        aspectRatio: aspectRatio,
        sampleCount: 1, 
      }
    });

    // 2. Poll for completion
    while (!operation.done) {
        console.log("Waiting for video generation to complete...")
        await new Promise((resolve) => setTimeout(resolve, 10000));
        operation = await ai.operations.getVideosOperation({
            operation: operation,
        });
    }

    const videoFile = operation.response.generatedVideos[0].video;
    const videoUrl = videoFile.uri || videoFile.downloadUri;

    // Fetch the actual video data using your API key
    const videoResponse = await fetch(videoUrl, {
    headers: { 
        "x-goog-api-key": process.env.GEMINI_API_KEY // Use your server-side key
    },
    });

    if (!videoResponse.ok) {
    throw new Error(`Failed to fetch video from Google: ${videoResponse.statusText}`);
    }

    const arrayBuffer = await videoResponse.arrayBuffer();

    return new NextResponse(Buffer.from(arrayBuffer), {
    headers: {
        "Content-Type": "video/mp4", // Most Veo models output mp4
        "Content-Disposition": 'attachment; filename="generated-video.mp4"',
    },
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { ok: false, error: err.message },
      { status: 500 }
    );
  }
}