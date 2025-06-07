
import React from 'react';
import { Download, ExternalLink, BookOpen, Copy } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Article } from "../types";

interface ArticleReferenceProps {
  article: Article;
}

const ArticleReference: React.FC<ArticleReferenceProps> = ({ article }) => {
  const handleCiteCopy = () => {
    const citation = `${article.authors.join(', ')} (${article.year}). ${article.title}. EMPRAD - Encontro de Mestrados Profissionais em Administração, p. ${article.pageNumber}.`;
    navigator.clipboard.writeText(citation);
    // Em uma aplicação real, adicionaríamos um feedback visual aqui
  };

  return (
    <div className="bg-white border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="mb-2">
        <h5 className="font-medium text-emprad-dark-purple text-lg">{article.title}</h5>
        <p className="text-gray-700 mt-1">{article.authors.join(', ')} ({article.year})</p>
        {article.pageNumber && (
          <p className="text-sm text-gray-500">Página {article.pageNumber}</p>
        )}
      </div>
      
      {article.snippet && (
        <div className="my-3 text-sm bg-gray-50 p-3 rounded border border-gray-200 italic">
          <p className="mb-1 text-xs text-gray-500 font-normal not-italic">Trecho relevante:</p>
          "{article.snippet}"
        </div>
      )}
      
      <div className="flex flex-wrap gap-2 mt-2 mb-3">
        {article.keywords.map((keyword, index) => (
          <span 
            key={index} 
            className="bg-emprad-light-purple text-emprad-purple px-2 py-1 rounded-md text-xs"
          >
            {keyword}
          </span>
        ))}
      </div>
      
      <div className="flex flex-wrap gap-2">
        <Button 
          variant="outline" 
          size="sm"
          className="text-emprad-purple border-emprad-purple hover:bg-emprad-light-purple hover:text-emprad-dark-purple"
          onClick={() => window.open(article.url, '_blank')}
        >
          <ExternalLink className="h-4 w-4 mr-1" /> Ver artigo
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          className="text-emprad-purple border-emprad-purple hover:bg-emprad-light-purple hover:text-emprad-dark-purple"
          onClick={() => window.open(article.downloadUrl, '_blank')}
        >
          <Download className="h-4 w-4 mr-1" /> Download
        </Button>
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
        >
          <BookOpen className="h-4 w-4 mr-1" /> Resumo
        </Button>
      </div>
    </div>
  );
};

export default ArticleReference;
