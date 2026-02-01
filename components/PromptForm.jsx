export default function PromptForm({ formData, setFormData }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="mt-6 grid gap-5">
      {/* Subject */}
      <div>
        <label className="block text-sm font-medium text-gray-200">
          Subject
        </label>
        <input
          name="subject"
          value={formData.subject || ""}
          onChange={handleChange}
          maxLength={200}
          placeholder="Example: a humanoid golden retriever woman, a red apple, a cigarette"
          className="mt-2 w-full rounded-xl border border-yellow-500/20 bg-black px-4 py-3 text-white placeholder:text-gray-500"
        />
      </div>

      {/* Style */}
      <div>
        <label className="block text-sm font-medium text-gray-200">
          Style
        </label>
        <input
          name="style"
          value={formData.style || ""}
          onChange={handleChange}
          maxLength={200}
          placeholder="Example: cinematic, Pixar-style 3D render, photorealistic"
          className="mt-2 w-full rounded-xl border border-yellow-500/20 bg-black px-4 py-3 text-white placeholder:text-gray-500"
        />
      </div>

      {/* Background */}
      <div>
        <label className="block text-sm font-medium text-gray-200">
          Background / Context
        </label>
        <textarea
          name="background"
          value={formData.background || ""}
          onChange={handleChange}
          maxLength={800}
          rows={5}
          placeholder="Example: walking on a sunlit European street, inside a stomach, on a dark stage"
          className="mt-2 w-full rounded-xl border border-yellow-500/20 bg-black px-4 py-3 text-white placeholder:text-gray-500"
        />
      </div>

      
    </div>
  );
}
