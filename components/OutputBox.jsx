"use client";

export default function OutputBox({
  imagePrompt,
  script,
  onChangeImagePrompt,
  onChangeScript,
  onCopy,
  copied,
}) {
  return (
    <div className="mt-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-yellow-500 font-semibold text-lg">Output</h2>
        <button
          onClick={onCopy}
          className="px-3 py-2 rounded-xl text-xs font-semibold border text-yellow-500"
        >
          {copied ? "Copied ✅" : "Copy"}
        </button>
      </div>

      <textarea
        value={imagePrompt}
        onChange={(e) => onChangeImagePrompt(e.target.value)}
        placeholder="Image prompt"
        className="w-full min-h-[140px] rounded-2xl border border-yellow-500/20 bg-black p-4 text-sm text-gray-200 focus:outline-none focus:ring-1 focus:ring-yellow-500"
      />

      <textarea
        value={script}
        onChange={(e) => onChangeScript(e.target.value)}
        placeholder="Script"
        className="w-full min-h-[120px] rounded-2xl border border-yellow-500/20 bg-black p-4 text-sm text-gray-200 focus:outline-none focus:ring-1 focus:ring-yellow-500"
      />
    </div>
  );
}
