import { useQuery, type UndefinedInitialDataOptions } from "@tanstack/react-query";
import { getDefaultPrompts } from ".";
import type { Prompt } from "./types";

export function useGetDefaultPromptsQuery(options?: Omit<UndefinedInitialDataOptions<Prompt, Error, Prompt>, "queryKey" | "queryFn">) {
  return useQuery({
    queryKey: ["prompts", "default"],
    queryFn: getDefaultPrompts,
    ...options,
  });
}