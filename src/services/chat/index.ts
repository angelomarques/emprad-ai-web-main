import { api } from "@/lib/api";
import type { Article, MessageResponse } from "./types";

export async function sendMessage(message: string) {
  const response = await api.post<MessageResponse>("/chat", { message });
  return response.data;
}

export async function getArticles() {
  const response = await api.get<Article[]>("/articles");
  return response.data;
}
