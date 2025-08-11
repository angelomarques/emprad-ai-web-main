export type MessageResponse = {
  answer: string;
  results: Article[];
};

export type Article = {
  _id: string;
  title: string;
  url: string;
  content: string;
  authors: string[];
};

export type GetArticlesResponse = {
  data: Article[];
  count: number;
};
