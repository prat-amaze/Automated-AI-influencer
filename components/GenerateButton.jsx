export default function GenerateButton({ onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full px-4 py-3 rounded-xl text-sm font-semibold border transition border-yellow-500 text-yellow-500
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      Generate Prompt
    </button>
  );
}
