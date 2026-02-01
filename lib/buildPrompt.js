export function buildPrompt({ formData }) {
  const { basicInfo, style, background } = formData;

  return `
You are an expert prompt engineer for Google's Imagen and Veo models.

STRICT OUTPUT RULES (MUST FOLLOW):
- Return ONLY valid JSON
- JSON must be a SINGLE object
- Allowed keys: "image_prompt", "script"
- "image_prompt" MUST be a string
- "script" MUST be a string
- DO NOT use arrays
- DO NOT use objects
- DO NOT nest anything
- DO NOT add markdown
- DO NOT wrap in \`\`\`
- Prompt should not trigger "Responsible AI" (RAI) filters

TASK:
Create a detailed high-quality image-to-video generation prompt for an 8-second video.

INPUT:
Subject: ${basicInfo}
Style: ${style}
Background: ${background}

OUTPUT FORMAT (EXACT):
{
  "image_prompt": "string",
  "script": "string"
}
`.trim();
}
