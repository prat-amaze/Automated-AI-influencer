"use client";
import { useState } from "react";
// import fs from "fs/promises";

const VideoBox = ({ image, prompt, script, aspectRatio }) => {
  const [loading, setLoading] = useState(false);

  async function handleGenerateVideo() {
    // console.log("Start")
    if (!image) return;

    setLoading(true);

    try {
      // 1️⃣ Upload image to Supabase
      // console.log("Trying")
      // const uploadRes = await fetch("/api/upload-image", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ base64Image: image }),
      // });

      // const uploadData = await uploadRes.json();
      // if (!uploadData.ok) throw new Error(uploadData.error);

      // const imageUrl = uploadData.url

      // 2️⃣ Call video generation API
      // let base64Image = await fs.readFile("temp.txt", "utf8");
      const imageBytes= image.split(",")[1];

      const videoRes = await fetch("/api/video", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageBytes,
          prompt,
          script,
          aspectRatio
        }),
      });

      if (!videoRes.ok) {
        const errText = await videoRes.text();
        throw new Error(errText || "Video generation failed");
      }

      const blob = await videoRes.blob();
      const videoUrl = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.style.display = "none";
      a.href = videoUrl;
      a.download = "my-ai-video.mp4";
      document.body.appendChild(a);
      a.click();

      // Cleanup
      window.URL.revokeObjectURL(videoUrl);
      document.body.removeChild(a);

    } catch (err) {
      console.error("Video generation failed:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex justify-center mt-8">
      <button
        onClick={handleGenerateVideo}
        disabled={loading || !image}
        className={`px-6 py-3 rounded-xl border text-sm font-semibold w-full
          ${
            loading
              ? "opacity-50 cursor-not-allowed border-gray-600 text-gray-500"
              : "border-yellow-500 text-yellow-500 hover:border-amber-600"
          }`}
      >
        {loading ? "Generating Video..." : "Generate Video"}
      </button>
    </div>
  );
};

export default VideoBox;
