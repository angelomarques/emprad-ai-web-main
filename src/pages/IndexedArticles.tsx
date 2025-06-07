
import React, { useState } from 'react';
import Header from '../components/Header';
import { mockArticlesDatabase } from '../services/articleService';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search, BookOpen } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const IndexedArticles: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const isMobile = useIsMobile();
  
  // Group articles by first letter of title
  const articlesByLetter: Record<string, typeof mockArticlesDatabase> = {};
  mockArticlesDatabase.forEach(article => {
    const firstLetter = article.title.charAt(0).toUpperCase();
    if (!articlesByLetter[firstLetter]) {
      articlesByLetter[firstLetter] = [];
    }
    articlesByLetter[firstLetter].push(article);
  });
  
  // Group articles by year
  const articlesByYear: Record<number, typeof mockArticlesDatabase> = {};
  mockArticlesDatabase.forEach(article => {
    if (!articlesByYear[article.year]) {
      articlesByYear[article.year] = [];
    }
    articlesByYear[article.year].push(article);
  });

  // Group articles by topic (using keywords)
  const articlesByTopic: Record<string, typeof mockArticlesDatabase> = {};
  const processedKeywords = new Set<string>();
  mockArticlesDatabase.forEach(article => {
    article.keywords.forEach(keyword => {
      if (!processedKeywords.has(keyword)) {
        processedKeywords.add(keyword);
        articlesByTopic[keyword] = mockArticlesDatabase.filter(a => 
          a.keywords.includes(keyword)
        );
      }
    });
  });
  
  // Filter articles by search term
  const filteredArticles = searchTerm ? 
    mockArticlesDatabase.filter(article =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.authors.some(author => author.toLowerCase().includes(searchTerm.toLowerCase())) ||
      article.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm.toLowerCase()))
    ) : [];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-emprad-dark-purple">Artigos Indexados</h1>
          <p className="text-gray-600 mt-1">
            Explore todos os 1585 artigos publicados no EMPRAD
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border mb-6">
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input 
              type="text"
              placeholder="Busque por título, autor, palavras-chave..." 
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          {searchTerm && (
            <div>
              <h2 className="text-lg font-medium text-emprad-dark-purple mb-3">
                Resultados da pesquisa ({filteredArticles.length})
              </h2>
              
              {filteredArticles.length > 0 ? (
                <div className="space-y-4 mb-4">
                  {filteredArticles.map(article => (
                    <div key={article.id} className="p-4 border rounded-md hover:bg-gray-50">
                      <h3 className="font-medium text-emprad-dark-purple">{article.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{article.authors.join(', ')}</p>
                      <p className="text-xs text-gray-500 mt-1">{article.year}</p>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {article.keywords.map(keyword => (
                          <span 
                            key={keyword} 
                            className="px-2 py-0.5 text-xs bg-emprad-light-purple text-emprad-dark-purple rounded-full"
                          >
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-500 py-4">
                  Nenhum artigo encontrado para "{searchTerm}".
                </p>
              )}
            </div>
          )}
          
          {!searchTerm && (
            <Tabs defaultValue="alphabetical">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="alphabetical">Alfabética</TabsTrigger>
                <TabsTrigger value="year">Ano</TabsTrigger>
                <TabsTrigger value="topic">Temática</TabsTrigger>
              </TabsList>
              
              <TabsContent value="alphabetical" className="pt-4">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 mb-4">
                  {Object.keys(articlesByLetter).sort().map(letter => (
                    <a 
                      key={letter}
                      href={`#letter-${letter}`}
                      className="text-center p-2 border rounded hover:bg-emprad-light-purple hover:text-emprad-dark-purple"
                    >
                      {letter}
                    </a>
                  ))}
                </div>
                
                <div className="space-y-6">
                  {Object.entries(articlesByLetter).sort().map(([letter, articles]) => (
                    <div key={letter} id={`letter-${letter}`}>
                      <h2 className="text-lg font-semibold text-emprad-dark-purple mb-3 border-b pb-2">
                        {letter}
                      </h2>
                      <div className="space-y-3">
                        {articles.map(article => (
                          <div key={article.id} className="flex items-start">
                            <BookOpen className="h-5 w-5 text-emprad-purple mr-2 mt-0.5" />
                            <div>
                              <p className="font-medium text-emprad-dark-purple">{article.title}</p>
                              <p className="text-sm text-gray-600">{article.authors.join(', ')}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="year" className="pt-4">
                <div className="space-y-6">
                  {Object.entries(articlesByYear)
                    .sort((a, b) => Number(b[0]) - Number(a[0]))
                    .map(([year, articles]) => (
                    <div key={year}>
                      <h2 className="text-lg font-semibold text-emprad-dark-purple mb-3 border-b pb-2">
                        {year}
                      </h2>
                      <div className="space-y-3">
                        {articles.map(article => (
                          <div key={article.id} className="flex items-start">
                            <BookOpen className="h-5 w-5 text-emprad-purple mr-2 mt-0.5" />
                            <div>
                              <p className="font-medium text-emprad-dark-purple">{article.title}</p>
                              <p className="text-sm text-gray-600">{article.authors.join(', ')}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="topic" className="pt-4">
                <div className="space-y-6">
                  {Object.entries(articlesByTopic).map(([topic, articles]) => (
                    <div key={topic}>
                      <h2 className="text-lg font-semibold text-emprad-dark-purple mb-3 border-b pb-2">
                        {topic}
                      </h2>
                      <div className="space-y-3">
                        {articles.map(article => (
                          <div key={article.id} className="flex items-start">
                            <BookOpen className="h-5 w-5 text-emprad-purple mr-2 mt-0.5" />
                            <div>
                              <p className="font-medium text-emprad-dark-purple">{article.title}</p>
                              <p className="text-sm text-gray-600">{article.authors.join(', ')}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          )}
        </div>
      </div>
    </div>
  );
};

export default IndexedArticles;
