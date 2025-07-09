import { api } from "@/lib/api";
import type { Prompt } from "./types";

export async function getDefaultPrompts() {
  const response = await api.get<Prompt>("/prompts/default");

  return response.data;
}

export async function updateDefaultPrompt(prompt: Prompt) {
  const response = await api.put<Prompt>("/prompts/default", prompt);

  return response.data;
}