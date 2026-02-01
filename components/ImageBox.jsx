"use client";
import Image from "next/image";
import { useState } from "react";


const ImageBox = ({ imagePrompt, onSelectImage }) => {
  const [aspectRatio, setAspectRatio] = useState("9:16");
  const [images, setImages] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleGenerateImages() {
    if (!imagePrompt) return;

    setLoading(true);
    setSelectedIndex(null);

    try {
      const res = await fetch("/api/image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: imagePrompt,
          aspectRatio: aspectRatio,
          count: 2,
        }),
      });

      const data = await res.json();

      if (!data.ok) throw new Error(data.error);

      // ✅ append images
      setImages((prev) => [...prev, ...data.images]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const resetImages = () => {
    setImages([]);
    setSelectedIndex(null);
  };

  const handleSelect = (index) => {
    setSelectedIndex(index);
    onSelectImage(images[index]);
  };
  

  return (
    <div className="mt-8">
      {/* Aspect Ratio */}
      <div className="flex justify-center gap-4">
        {["9:16", "16:9"].map((ratio) => (
          <button
            key={ratio}
            onClick={() => setAspectRatio(ratio)}
            className={`px-4 py-2 rounded-2xl border-2 text-sm font-semibold
              ${
                aspectRatio === ratio
                  ? "border-yellow-500 text-yellow-500"
                  : "border-gray-600 text-gray-400 hover:border-yellow-500"
              }`}
          >
            {ratio}
          </button>
        ))}
      </div>

      {/* Generate */}
      <div className="mt-6 flex justify-center w-full">
        <button
          onClick={handleGenerateImages}
          disabled={loading || !imagePrompt}
          className={`px-6 py-3 rounded-xl border text-sm font-semibold w-full
            ${
              loading
                ? "opacity-50 cursor-not-allowed border-gray-600 text-gray-500"
                : "border-yellow-500 text-yellow-500 hover:border-amber-600"
            }`}
        >
          {loading ? "Generating Images..." : "Generate Images"}
        </button>
      </div>

      {/* Images */}
      {images.length > 0 && (
        <div className="mt-6 grid grid-cols-2 gap-4">
          {images.map((img, index) => (
            <div
              key={index}
              onClick={() => handleSelect(index)}
              className={`cursor-pointer rounded-2xl overflow-hidden border-2
                ${
                  selectedIndex === index
                    ? "border-yellow-500"
                    : "border-transparent hover:border-yellow-500/50"
                }`}
            >
              <img
                src={img}
                alt={`Generated ${index}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      )}

      {/* Reset */}
      {images.length > 0 && (
        <div className="flex justify-center mt-6">
          <button
            onClick={resetImages}
            className="px-6 py-3 rounded-xl border border-yellow-500 text-yellow-500"
          >
            Reset
          </button>
        </div>
      )}

      {/* Selected info */}
      {selectedIndex !== null && (
        <p className="mt-4 text-center text-sm text-yellow-500">
          Image {selectedIndex + 1} selected for video generation
        </p>
      )}
    </div>
  );
};

export default ImageBox;
