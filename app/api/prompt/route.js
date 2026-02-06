import { ai } from "@/lib/gemini";
import { buildPrompt } from "@/lib/buildPrompt";

function stripJsonFence(text) {
  return text
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/```$/i, "")
    .trim();
}

export const MOCK_RESPONSE = {
  image_prompt: "Photorealistic, high-resolution, cinematic quality, an authentic street photography shot of a confident young woman in her late 20s, with medium-length wavy brown hair, wearing a stylish light denim jacket, dark jeans, and white sneakers, carrying a beige cross-body bag. She is mid-stride, walking on a vibrant, sun-drenched street in New York City, looking slightly to her right at a distant building with a faint, curious smile. The background is bustling with classic yellow cabs, iconic brownstone buildings, diverse pedestrians, and street vendors. Soft natural sunlight illuminates the scene, casting subtle shadows. Eye-level medium shot, slightly wide angle, capturing the lively urban atmosphere.",
  script: "The video begins with the young woman from the image prompt, taking another step forward, her stride confident and purposeful. The camera subtly tracks her, following her from a medium-wide perspective as she navigates the lively New York City street. In the first two seconds, the immediate foreground and background show gentle movement of other pedestrians and the flicker of distant streetlights. From two to four seconds, a classic yellow taxi cab drives past from left to right in the background, partially obscuring and then revealing a vibrant street art mural she briefly glances at. As she continues walking from four to six seconds, she passes a bustling sidewalk cafe on her left, where patrons are visible enjoying coffee and conversation. A wisp of steam subtly rises from a distant manhole in the mid-ground, adding to the authentic urban atmosphere. In the final two seconds, she approaches a broader intersection, iconic NYC architecture towering in the background. She takes a final appreciative look around with a slight head turn before continuing to walk into the distance, maintaining her steady pace as the camera holds a medium-wide shot, capturing the expansive urban landscape. The lighting remains consistent: bright, natural sunlight, enhancing the photorealistic and energetic street scene throughout the 8 seconds."
};

function sleep() {
  return new Promise(resolve => setTimeout(resolve, 1000));
}

export async function POST(req) {
  try {
    const body = await req.json();

    const {formData} = body;

    if (!formData) {
      return Response.json(
        { ok: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const finalPrompt = buildPrompt({formData});

    // await sleep()
    // return Response.json({
    //     ok: true,
    //     result: JSON.stringify(MOCK_RESPONSE),
    //   });

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: finalPrompt,
      "generationConfig": {
        "response_mime_type": "application/json",
        }
    });
    console.log(response)
    const rawText = response.text;
    const cleanText = stripJsonFence(rawText);

    return Response.json({
      ok: true,
      result: cleanText,
    });
  } catch (err) {
    return Response.json(
      { ok: false, error: err.message },
      { status: 500 }
    );
  }
}
