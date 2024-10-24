// import { NextRequest, NextResponse } from 'next/server';

// export async function POST(request: NextRequest) {
//   try {
//     // Get the text from the form data
//     const formData = await request.formData();
//     const paragraph = formData.get("paragraph") as string | null;

//     console.log("Data sending to the Gemini API:", paragraph);

//     if (!paragraph) {
//       return NextResponse.json({ error: "No text provided" }, { status: 400 });
//     }

//     // Make a request to the Gemini API with a prompt
//     const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${process.env.GEMINI_API_KEY}`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         prompt: "Correct the grammar and spilling mistakes of the following paragraph", // Add the prompt here
//         contents: [
//           {
//             parts: [
//               { text: paragraph }
//             ]
//           }
//         ]
//       }),
//     });

//     if (!response.ok) {
//       throw new Error('Failed to correct grammar via Gemini API');
//     }

//     // Parse the Gemini API response
//     const data = await response.json();
//     const correctedText = data.contents?.[0]?.parts?.[0]?.text || paragraph; // Fallback to the original text if correction not found

//     return NextResponse.json({ correctedText }, { status: 200 });

//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ error: "Grammar correction failed" }, { status: 500 });
//   }
// }


import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: NextRequest) {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const data = await req.json();
    const thread: string = data.thread;
    const language: string = data.language;
    console.log(thread, language);

    if (!thread || !language) {
      return NextResponse.json({
        error: "Thread and language must be provided.",
      });
    }

    const prompt = `Correct the grammar and spelling in the following text in ${language} language:
    "${thread}"`;

    const result = await model.generateContent(prompt);

    const response = result.response;
    let output = response.text();
    console.log(output);

    let correctedText = output.replace(/```/g, ""); 

    if (!correctedText) {
      return NextResponse.json({
        error: "Failed to generate the corrected text.",
      });
    }
    return NextResponse.json({
      correctedText,
    });
  } catch (error) {
    console.error("Error correcting grammar and spelling:", error);
    return NextResponse.json({
      error: "An error occurred while processing the text.",
    });
  }
}
