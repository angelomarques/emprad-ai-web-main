import { Button } from "@/components/ui/button";
import { Article } from "@/services/chat/types";
import { BookOpen, Copy, ExternalLink } from "lucide-react";
import React from "react";
import { toast } from "sonner";

interface ArticleReferenceProps {
  article: Article;
}

const ArticleReference: React.FC<ArticleReferenceProps> = ({ article }) => {
  const handleCiteCopy = () => {
    const citation = `${article.title} - ${article.content}`;
    navigator.clipboard.writeText(citation);
    toast.success("Citação copiada para a área de transferência");
  };

  return (
    <div className="bg-white border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="mb-2">
        <h5 className="font-medium text-emprad-dark-purple text-lg">
          {article.title}
        </h5>
        {/* <p className="text-gray-700 mt-1">
          {article.authors.join(", ")} ({article.year})
        </p>
        {article.pageNumber && (
          <p className="text-sm text-gray-500">Página {article.pageNumber}</p>
        )} */}
      </div>

      {article.content && (
        <div className="my-3 text-sm bg-gray-50 p-3 rounded border border-gray-200 italic">
          <p className="mb-1 text-xs text-gray-500 font-normal not-italic">
            Trecho relevante:
          </p>
          "{article.content}"
        </div>
      )}

      <div className="flex flex-wrap gap-2 mt-2 mb-3">
        {/* {article.keywords.map((keyword, index) => (
          <span
            key={index}
            className="bg-emprad-light-purple text-emprad-purple px-2 py-1 rounded-md text-xs"
          >
            {keyword}
          </span>
        ))} */}
      </div>

      <div className="flex flex-wrap gap-2">
        <Button
          variant="outline"
          size="sm"
          className="text-emprad-purple border-emprad-purple hover:bg-emprad-light-purple hover:text-emprad-dark-purple"
          onClick={() => window.open(article.url, "_blank")}
        >
          <ExternalLink className="h-4 w-4 mr-1" /> Ver artigo
        </Button>
        {/* <a
          className={buttonVariants({
            variant: "outline",
            size: "sm",
            className:
              "text-emprad-purple border-emprad-purple hover:bg-emprad-light-purple hover:text-emprad-dark-purple",
          })}
          href={article.url}
          download={`${article.title}.pdf`}
        >
          <Download className="h-4 w-4 mr-1" /> Download
        </a> */}
        <Button
          variant="outline"
          size="sm"
          className="text-emprad-purple border-emprad-purple hover:bg-emprad-light-purple hover:text-emprad-dark-purple"
          onClick={handleCiteCopy}
        >
          <Copy className="h-4 w-4 mr-1" /> Copiar citação
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="text-emprad-purple border-emprad-purple hover:bg-emprad-light-purple hover:text-emprad-dark-purple"
          onClick={() => toast.info("Funcionalidade em desenvolvimento")}
        >
          <BookOpen className="h-4 w-4 mr-1" /> Resumo
        </Button>
      </div>
    </div>
  );
};

export default ArticleReference;
