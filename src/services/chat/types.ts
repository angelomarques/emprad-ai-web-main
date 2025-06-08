export type MessageResponse = {
  answer: string;
  results: Article[];
};

export type Article = {
  title: string;
  url: string;
  content: string;
};