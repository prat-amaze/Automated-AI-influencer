"use client";
import { useMemo, useState } from "react";

export function usePromptGenerator() {
  const [formData, setFormData] = useState({
    subject: "",
    style: "",
    background: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  // 🔑 Structured output (NO JSON parsing later)
  const [output, setOutput] = useState({
    image_prompt: "",
    script: "",
  });

  const isFormValid = useMemo(() => {
    return (
      formData.subject.trim() &&
      formData.style.trim() &&
      formData.background.trim()
    );
  }, [formData]);

  async function generatePrompt() {
    if (loading) return;

    setLoading(true);
    setError("");
    setCopied(false);

    try {
      const res = await fetch("/api/prompt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formData }),
      });

      const data = await res.json();
      if (!data.ok) throw new Error(data.error);

      const parsed = JSON.parse(data.result);

      setOutput({
        image_prompt: parsed.image_prompt || "",
        script: parsed.script || "",
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function copy() {
    const text = `image_prompt:\n${output.image_prompt}\n\nscript:\n${output.script}`;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  }

  return {
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
  };
}
