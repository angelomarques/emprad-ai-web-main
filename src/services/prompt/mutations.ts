import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import { updateDefaultPrompt } from ".";
import type { Prompt } from "./types";

export function useUpdateDefaultPromptMutation(options?:  Omit<UseMutationOptions<Prompt, Error, Prompt, unknown>, "mutationFn">) {
  return useMutation({
    mutationFn: updateDefaultPrompt,
    ...options,
  });
}