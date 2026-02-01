import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseServer";
import crypto from "crypto";
import fs from "fs/promises";

export async function POST(req) {
  try {
    // let { base64Image } = await req.json();
    let base64Image = await fs.readFile("temp.txt", "utf8");

    if (!base64Image) {
      return NextResponse.json(
        { ok: false, error: "Missing image" },
        { status: 400 }
      );
    }

    // Remove data URL prefix if present
    const base64 = base64Image.replace(/^data:image\/\w+;base64,/, "");
    const buffer = Buffer.from(base64, "base64");

    const fileName = `temp-images/${crypto.randomUUID()}.png`;

    const { error } = await supabase.storage
      .from("temp-images")
      .upload(fileName, buffer, {
        contentType: "image/png",
        upsert: false,
      });

    if (error) throw error;

    const { data } = supabase.storage
      .from("temp-images")
      .getPublicUrl(fileName);

    return NextResponse.json({
      ok: true,
      url: data.publicUrl,
      path: fileName, // keep this if you want to delete later
    });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err.message },
      { status: 500 }
    );
  }
}
