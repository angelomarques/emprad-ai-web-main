
export interface Article {
  id: string;
  title: string;
  authors: string[];
  year: number;
  pageNumber?: number;
  url: string;
  downloadUrl: string;
  snippet?: string;
  keywords: string[];
}

export interface Message {
  id: string;
  content: string;
  isUser: boolean;
  references?: Article[];
  timestamp: Date;
}
