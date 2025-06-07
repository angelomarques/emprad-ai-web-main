
import React, { useState } from 'react';
import Header from '../components/Header';
import { Search, FileDown, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { mockArticlesDatabase } from '../services/articleService';
import { Checkbox } from '@/components/ui/checkbox';
import ArticleReference from '@/components/ArticleReference';
import { useIsMobile } from '@/hooks/use-mobile';

const SmartSearch: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState(mockArticlesDatabase.slice(0, 3));
  const [showFilters, setShowFilters] = useState(false);
  const isMobile = useIsMobile();
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const filteredResults = mockArticlesDatabase.filter(article => 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.keywords.some(keyword => keyword.toLowerCase().includes(searchQuery.toLowerCase())) ||
      article.authors.some(author => author.toLowerCase().includes(searchQuery.toLowerCase()))
    );
    setResults(filteredResults.length > 0 ? filteredResults : []);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-emprad-dark-purple">Pesquisa Inteligente</h1>
            <p className="text-gray-600 mt-1">
              Busque entre os 1585 artigos cadastrados no EMPRAD
            </p>
          </div>
          
          <Button 
            variant="outline" 
            className="mt-4 md:mt-0"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-4 w-4 mr-2" />
            {showFilters ? 'Ocultar Filtros' : 'Exibir Filtros'}
          </Button>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border mb-6">
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input 
                type="text"
                placeholder="Busque por título, autor, palavras-chave..." 
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button type="submit">Pesquisar</Button>
          </form>
          
          {showFilters && (
            <div className="mt-4 border-t pt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <h3 className="font-medium mb-2 text-emprad-dark-purple">Ano de Publicação</h3>
                <div className="space-y-2">
                  {[2023, 2022, 2021, 2020, 2019].map(year => (
                    <div key={year} className="flex items-center space-x-2">
                      <Checkbox id={`year-${year}`} />
                      <label htmlFor={`year-${year}`} className="text-sm">{year}</label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-2 text-emprad-dark-purple">Temáticas</h3>
                <div className="space-y-2">
                  {['Empreendedorismo', 'Inovação', 'Gestão', 'Sustentabilidade', 'Tecnologia'].map(topic => (
                    <div key={topic} className="flex items-center space-x-2">
                      <Checkbox id={`topic-${topic}`} />
                      <label htmlFor={`topic-${topic}`} className="text-sm">{topic}</label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-2 text-emprad-dark-purple">Tipo de Pesquisa</h3>
                <div className="space-y-2">
                  {['Estudo de Caso', 'Pesquisa Quantitativa', 'Revisão da Literatura', 'Ensaio Teórico'].map(type => (
                    <div key={type} className="flex items-center space-x-2">
                      <Checkbox id={`type-${type}`} />
                      <label htmlFor={`type-${type}`} className="text-sm">{type}</label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-emprad-dark-purple">Resultados da Pesquisa</h2>
            {results.length > 0 && (
              <Button variant="outline" size="sm">
                <FileDown className="h-4 w-4 mr-2" />
                Exportar Resultados
              </Button>
            )}
          </div>
          
          {results.length > 0 ? (
            <div className="space-y-4">
              {results.map(article => (
                <ArticleReference key={article.id} article={article} />
              ))}
            </div>
          ) : (
            <div className="bg-white p-8 rounded-lg border text-center">
              <p className="text-gray-500">Nenhum resultado encontrado. Tente ajustar sua pesquisa.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SmartSearch;
