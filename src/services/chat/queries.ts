import {
  useQuery,
  type UndefinedInitialDataOptions,
} from "@tanstack/react-query";
import { getArticles } from ".";
import type { Article, GetArticlesResponse } from "./types";

export function useGetArticlesQuery(
  params = {},
  options?: Omit<
    UndefinedInitialDataOptions<
      GetArticlesResponse,
      Error,
      GetArticlesResponse
    >,
    "queryKey" | "queryFn"
  >
) {
  return useQuery({
    queryKey: ["articles"],
    queryFn: getArticles,
    ...(options || {}),
  });
}
