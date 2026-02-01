"use client";

import Navbar from "@/components/Navbar";
import PromptForm from "@/components/PromptForm";
import GenerateButton from "@/components/GenerateButton";
import OutputBox from "@/components/OutputBox";
import ImageBox from "@/components/ImageBox";
import VideoBox from "@/components/VideoBox";
import { usePromptGenerator } from "@/hooks/usePromptGenerator";
import { useState } from "react";

export default function Home() {
  const {
    formData,
    setFormData,
    output,
    setOutput,
    loading,
    error,
    copied,
    isFormValid,
    generatePrompt,
    copy,
  } = usePromptGenerator();

  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div>
      <Navbar />

      <main className="bg-black min-h-screen px-4 pb-20">
        <section className="pt-12 text-center">
          <h1 className="text-yellow-500 text-4xl font-bold">
            Idea to Video
          </h1>
          <p className="text-white mt-2">
            Create your own faceless Instagram page today
          </p>
        </section>

        <section className="mt-10 max-w-4xl mx-auto">
          <div className="rounded-2xl border border-yellow-500/20 bg-white/5 p-6">

            <PromptForm formData={formData} setFormData={setFormData} />

            <div className="mt-6">
              <GenerateButton
                onClick={generatePrompt}
                disabled={loading || !isFormValid}
              />
            </div>

            {error && (
              <div className="mt-4 text-red-400 text-sm">❌ {error}</div>
            )}

            <OutputBox
              imagePrompt={output.image_prompt}
              script={output.script}
              onChangeImagePrompt={(val) =>
                setOutput((prev) => ({ ...prev, image_prompt: val }))
              }
              onChangeScript={(val) =>
                setOutput((prev) => ({ ...prev, script: val }))
              }
              onCopy={copy}
              copied={copied}
            />

            {output.image_prompt && (
              <ImageBox
                imagePrompt={output.image_prompt}
                onSelectImage={setSelectedImage}
              />
            )}

            {selectedImage && (
              <VideoBox
                image={selectedImage}
                prompt={output.image_prompt}
                script={output.script}
              />
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
