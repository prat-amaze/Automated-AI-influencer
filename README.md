# 🤖 Automated AI-Influencer

Turn a simple idea into a cinematic, faceless short-form video using Gemini 3, Imagen 4.0, and Veo 3.1 — all in one seamless pipeline.

---

## 🚀 Overview

**Automated AI-Influencer** is an end-to-end AI content generation tool that converts plain ideas into high-quality short videos.  
It is designed for creators who want to build faceless Instagram Reels, YouTube Shorts, or TikToks without cameras, editing software, or manual workflows.

The project focuses on **control, iteration, and quality**, not one-click randomness.

---

## ✨ Features

- 🧠 **Idea → Prompt Generation** using Gemini 3 Flash Preview  
- 🎨 **High-quality Image Generation** using Imagen 4.0  
- 🖼️ **Multiple Image Options** with manual selection  
- 🎥 **Image-grounded Video Generation** using Veo 3.1  
- 🔁 **Iterative Workflow** — tweak, regenerate, refine  
- ⚡ **Fast, responsive UI** built with Next.js App Router  

---

## 🧩 AI Stack

| Stage | Model Used | Purpose |
|------|-----------|---------|
| Prompt Generation | Gemini 3 Flash Preview | Reasoning + orchestration |
| Image Generation | Imagen 4.0 | Visual creation |
| Video Generation | Veo 3.1 | Cinematic video synthesis |

Each model is used intentionally, not redundantly.

---

## 🛠️ Tech Stack

- **Frontend:** Next.js (App Router), React  
- **Backend:** Next.js API Routes  
- **AI SDK:** Google Gemini API  
- **Storage:** Supabase Storage  
- **Language:** JavaScript / TypeScript  

---

## 🔄 How It Works

1. Enter a **subject**, **style**, and **background**
2. Gemini generates:
   - A detailed image prompt  
   - A structured short-form video script
3. Imagen generates multiple images
4. Select the best image
5. Veo generates a video using the selected image as reference

Every step is transparent and editable.

---

## ⚙️ Environment Variables

Create a `.env.local` file:

```env
GEMINI_API_KEY=your_google_gemini_api_key
```

---

## ⚙️ Environment Variables

```
npm install
npm run dev
```

