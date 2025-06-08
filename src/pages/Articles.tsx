import React, { useState } from "react";
import Header from "../components/Header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Download, ExternalLink, Filter } from "lucide-react";
import { Article } from "../types";
import { useGetArticlesQuery } from "@/services/chat/queries";

const Articles: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: articles, isLoading, error } = useGetArticlesQuery();
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);

  // Update filtered articles when articles data changes
  // React.useEffect(() => {
  //   if (articles) {
  //     setFilteredArticles(articles);
  //   }
  // }, [articles]);

  // const handleSearch = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (!articles) return;

  //   const query = searchQuery.toLowerCase();

  //   if (query.trim() === "") {
  //     setFilteredArticles(articles);
  //   } else {
  //     const filtered = articles.filter(
  //       (article) =>
  //         article.title.toLowerCase().includes(query) ||
  //         article.authors.some((author) =>
  //           author.toLowerCase().includes(query)
  //         ) ||
  //         article.keywords.some((keyword) =>
  //           keyword.toLowerCase().includes(query)
  //         )
  //     );
  //     setFilteredArticles(filtered);
  //   }
  // };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-emprad-purple mb-2">
          Biblioteca de Artigos EMPRAD
        </h1>
        <p className="text-gray-600 mb-8">
          Acesse todos os artigos publicados nos anais do EMPRAD.
        </p>

        {/* <div className="mb-8">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-grow">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
              <Input
                type="text"
                placeholder="Buscar por título, autor ou palavra-chave..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button type="submit">Buscar</Button>
            <Button variant="outline" className="flex items-center gap-1">
              <Filter size={16} /> Filtros
            </Button>
          </form>
        </div> */}

        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-4 border-b">
            <h2 className="font-medium">
              {isLoading
                ? "Carregando..."
                : error
                ? "Erro ao carregar artigos"
                : `Resultados (${articles.length})`}
            </h2>
          </div>

          {isLoading ? (
            <div className="p-8 text-center text-gray-500">
              Carregando artigos...
            </div>
          ) : error ? (
            <div className="p-8 text-center text-red-500">
              Ocorreu um erro ao carregar os artigos. Por favor, tente novamente
              mais tarde.
            </div>
          ) : (
            <div className="divide-y">
              {articles.map((article) => (
                <div key={article.title} className="p-4 hover:bg-gray-50">
                  <h3 className="font-medium text-emprad-purple">
                    {article.title}
                  </h3>
                  {/* <p className="text-sm text-gray-600 mt-1">
                    {article.authors.join(", ")} ({article.year})
                  </p> */}

                  {/* {article.snippet && (
                    <p className="text-sm text-gray-500 mt-2">
                      {article.snippet}
                    </p>
                  )} */}

                  {/* <div className="flex flex-wrap gap-2 mt-2">
                    {article.keywords.map((keyword, index) => (
                      <span
                        key={index}
                        className="bg-emprad-light-purple text-emprad-purple px-2 py-1 rounded-md text-xs"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div> */}

                  <div className="flex mt-4 gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-1"
                      onClick={() => window.open(article.url, "_blank")}
                    >
                      <ExternalLink size={14} /> Ver artigo
                    </Button>
                    {/* <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-1"
                      onClick={() => window.open(article.downloadUrl, "_blank")}
                    >
                      <Download size={14} /> Download
                    </Button> */}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Articles;
