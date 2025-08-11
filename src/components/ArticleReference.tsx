import { Button } from "@/components/ui/button";
import { Article } from "@/services/chat/types";
import { BookOpen, Copy, ExternalLink } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";
import { getArticleSummary } from "@/services/articleService";

interface ArticleReferenceProps {
  article: Article;
}

const ArticleReference: React.FC<ArticleReferenceProps> = ({ article }) => {
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [summary, setSummary] = useState<string>("");

  const handleCiteCopy = () => {
    // Format authors in ABNT format: SURNAME, N.
    const formattedAuthors = article.authors
      .map((author) => {
        const nameParts = author.trim().split(" ");
        if (nameParts.length >= 2) {
          const lastName = nameParts[nameParts.length - 1];
          const initials = nameParts
            .slice(0, -1)
            .map((part) => part.charAt(0) + ".")
            .join(" ");
          return `${lastName.toUpperCase()}, ${initials}`;
        }
        return author; // Fallback for single names
      })
      .join("; ");

    const citation = `${formattedAuthors}. ${article.title}.`;
    navigator.clipboard.writeText(citation);
    toast.success("Citação ABNT copiada para a área de transferência");
  };

  const handleGenerateSummary = async () => {
    setIsGeneratingSummary(true);

    try {
      // Use the real API to get article summary
      const summaryData = await getArticleSummary(article._id);

      if (summaryData.status === "success") {
        setSummary(summaryData.summary);
        setShowSummary(true);
        toast.success("Resumo gerado com sucesso!");
      } else {
        throw new Error("Failed to generate summary");
      }
    } catch (error) {
      toast.error("Erro ao gerar resumo. Tente novamente.");
      console.error("Erro ao gerar resumo:", error);
    } finally {
      setIsGeneratingSummary(false);
    }
  };

  return (
    <div className="bg-white border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="mb-2">
        <h5 className="font-medium text-emprad-dark-purple text-lg">
          {article.title}
        </h5>
        <p className="text-gray-700 mt-1">{article.authors.join(", ")}</p>
        {/* {article.pageNumber && (
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
          onClick={handleGenerateSummary}
          disabled={isGeneratingSummary}
        >
          <BookOpen className="h-4 w-4 mr-1" />
          {isGeneratingSummary ? "Gerando..." : "Resumo"}
        </Button>
      </div>

      {showSummary && summary && (
        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex justify-between items-start mb-2">
            <h6 className="font-semibold text-emprad-dark-purple">
              Resumo Gerado por IA
            </h6>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowSummary(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </Button>
          </div>
          <div
            className="text-sm text-gray-700 whitespace-pre-line"
            dangerouslySetInnerHTML={{ __html: summary }}
          />
          <div className="mt-3 flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                navigator.clipboard.writeText(summary.replace(/<[^>]*>/g, ""));
                toast.success("Resumo copiado para a área de transferência!");
              }}
              className="text-emprad-purple border-emprad-purple hover:bg-emprad-light-purple"
            >
              <Copy className="h-4 w-4 mr-1" /> Copiar Resumo
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArticleReference;
