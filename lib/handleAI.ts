"use client";

import {GoogleGenerativeAI} from "@google/generative-ai";
import { codeHistory, contentHistory } from "./histories";


const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY!;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};





export const handleGetContent = async ({text}:{text:any}) => {
  console.log(text);
  const chatSession = model.startChat({
    generationConfig,
 // safetySettings: Adjust safety settings
 // See https://ai.google.dev/gemini-api/docs/safety-settings
    history: contentHistory
  });

  const result = await chatSession.sendMessage(text);
  console.log(result.response.text());
      return result.response.text();
}

const codeGenarationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  candidateCount:1,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
}

export const handleGetCode = async ({json}:{json:any}) => {
  console.log(json);
  
  const chatSession = model.startChat({
    generationConfig:codeGenarationConfig,
 // safetySettings: Adjust safety settings
 history: codeHistory
  });

  const result = await chatSession.sendMessage(JSON.stringify(json));
  console.log(result.response.text());
  return result.response.text()
}