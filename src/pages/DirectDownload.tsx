
import React, { useState } from 'react';
import Header from '../components/Header';
import { Download, FileType, Filter, Search } from 'lucide-react';
import { mockArticlesDatabase } from '../services/articleService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { useIsMobile } from '@/hooks/use-mobile';

const DirectDownload: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredArticles, setFilteredArticles] = useState(mockArticlesDatabase);
  const [showFilters, setShowFilters] = useState(false);
  const isMobile = useIsMobile();
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const results = mockArticlesDatabase.filter(article => 
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.authors.some(author => author.toLowerCase().includes(searchTerm.toLowerCase())) ||
      article.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredArticles(results);
  };
  
  const handleDownload = (article: any) => {
    alert(`Iniciando download do artigo: ${article.title}`);
    // In a real app, this would trigger the actual download
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-emprad-dark-purple">Download Direto</h1>
            <p className="text-gray-600 mt-1">
              Baixe os artigos completos publicados no EMPRAD
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
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
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
                <h3 className="font-medium mb-2 text-emprad-dark-purple">Formato</h3>
                <div className="space-y-2">
                  {['PDF', 'DOC', 'EPUB', 'HTML'].map(format => (
                    <div key={format} className="flex items-center space-x-2">
                      <Checkbox id={`format-${format}`} />
                      <label htmlFor={`format-${format}`} className="text-sm">{format}</label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-2 text-emprad-dark-purple">Temáticas</h3>
                <div className="space-y-2">
                  {['Empreendedorismo', 'Inovação', 'Gestão', 'Sustentabilidade'].map(topic => (
                    <div key={topic} className="flex items-center space-x-2">
                      <Checkbox id={`topic-${topic}`} />
                      <label htmlFor={`topic-${topic}`} className="text-sm">{topic}</label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 text-emprad-dark-purple">
              <tr className="border-b">
                <th className="px-4 py-3 text-left">Título</th>
                <th className="px-4 py-3 text-left hidden md:table-cell">Autores</th>
                <th className="px-4 py-3 text-left hidden md:table-cell">Ano</th>
                <th className="px-4 py-3 text-left">Formato</th>
                <th className="px-4 py-3 text-right">Ação</th>
              </tr>
            </thead>
            <tbody>
              {filteredArticles.map(article => (
                <tr key={article.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div>
                      <p className="font-medium text-emprad-dark-purple">{article.title}</p>
                      <p className="text-sm text-gray-500 md:hidden">{article.authors.join(', ')}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    {article.authors.join(', ')}
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    {article.year}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center">
                      <FileType className="h-4 w-4 mr-1 text-emprad-purple" />
                      <span>PDF</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="text-emprad-purple border-emprad-purple"
                      onClick={() => handleDownload(article)}
                    >
                      <Download className="h-3 w-3 mr-1" />
                      Baixar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredArticles.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              Nenhum artigo encontrado com os filtros atuais.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DirectDownload;
