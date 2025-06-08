import {
    useQuery,
    type UndefinedInitialDataOptions,
} from "@tanstack/react-query";
import { getArticles } from ".";
import type { Article } from "./types";
  
  export function useGetArticlesQuery(
    params = {},
    options?: Omit<
      UndefinedInitialDataOptions<Article[], Error, Article[]>,
      "queryKey" | "queryFn"
    >
  ) {
    return useQuery({
      queryKey: ["articles"],
      queryFn: getArticles,
      ...(options || {}),
    });
  }
  