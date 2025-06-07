
import { Article } from '../types';

// This is a mock database of EMPRAD articles
// In a real implementation, this would be replaced with an actual database query
export const mockArticlesDatabase: Article[] = [
  {
    id: '1',
    title: 'Inovação em Práticas de Gestão: Um Estudo de Caso em Empresas Brasileiras',
    authors: ['Silva, M.A.', 'Oliveira, J.C.'],
    year: 2022,
    pageNumber: 45,
    url: 'https://emprad.org.br/articles/1',
    downloadUrl: 'https://emprad.org.br/download/1',
    snippet: 'Os resultados indicam que as práticas de inovação em gestão estão fortemente correlacionadas com o desempenho organizacional, especialmente em ambientes de alta competitividade.',
    keywords: ['inovação', 'gestão', 'empresas brasileiras']
  },
  {
    id: '2',
    title: 'Metodologias Ágeis na Administração Pública: Desafios e Oportunidades',
    authors: ['Santos, F.R.', 'Pereira, L.M.', 'Costa, D.S.'],
    year: 2023,
    pageNumber: 127,
    url: 'https://emprad.org.br/articles/2',
    downloadUrl: 'https://emprad.org.br/download/2',
    snippet: 'A implementação de metodologias ágeis na administração pública brasileira apresenta barreiras culturais significativas, mas demonstra potencial para melhorias na eficiência dos serviços públicos.',
    keywords: ['metodologias ágeis', 'administração pública', 'gestão pública']
  },
  {
    id: '3',
    title: 'Sustentabilidade Empresarial como Vantagem Competitiva no Mercado Brasileiro',
    authors: ['Lima, C.A.', 'Almeida, R.T.'],
    year: 2021,
    pageNumber: 78,
    url: 'https://emprad.org.br/articles/3',
    downloadUrl: 'https://emprad.org.br/download/3',
    snippet: 'Empresas com forte compromisso com práticas sustentáveis apresentaram melhores índices de valorização de mercado e maior fidelização de clientes no período analisado.',
    keywords: ['sustentabilidade', 'vantagem competitiva', 'ESG']
  },
  {
    id: '4',
    title: 'Transformação Digital em Pequenas e Médias Empresas: Um Estudo Longitudinal',
    authors: ['Ferreira, M.S.', 'Rodrigues, C.L.'],
    year: 2023,
    pageNumber: 215,
    url: 'https://emprad.org.br/articles/4',
    downloadUrl: 'https://emprad.org.br/download/4',
    snippet: 'As PMEs que adotaram estratégias estruturadas de transformação digital apresentaram crescimento médio de receita 37% superior às que implementaram mudanças tecnológicas de forma pontual e não integrada.',
    keywords: ['transformação digital', 'PMEs', 'tecnologia']
  },
  {
    id: '5',
    title: 'O Impacto do Trabalho Remoto na Produtividade e Bem-estar dos Colaboradores',
    authors: ['Mendes, A.P.', 'Carvalho, S.T.', 'Martins, J.R.'],
    year: 2022,
    pageNumber: 103,
    url: 'https://emprad.org.br/articles/5',
    downloadUrl: 'https://emprad.org.br/download/5',
    snippet: 'O estudo revelou que 78% dos profissionais em regime de teletrabalho reportaram aumento de produtividade, embora 42% tenham indicado dificuldades relacionadas ao equilíbrio entre vida pessoal e profissional.',
    keywords: ['trabalho remoto', 'produtividade', 'bem-estar', 'recursos humanos']
  },
  {
    id: '6',
    title: 'Empreendedorismo Social no Brasil: Desafios e Perspectivas',
    authors: ['Costa, R.M.', 'Souza, T.L.'],
    year: 2023,
    pageNumber: 142,
    url: 'https://emprad.org.br/articles/6',
    downloadUrl: 'https://emprad.org.br/download/6',
    snippet: 'Os negócios de impacto social cresceram 35% nos últimos três anos no Brasil, com destaque para iniciativas voltadas à educação, saúde e tecnologias ambientais.',
    keywords: ['empreendedorismo social', 'impacto social', 'inovação social']
  },
  {
    id: '7',
    title: 'Estratégias de Internacionalização para Startups Brasileiras',
    authors: ['Ribeiro, A.C.', 'Pinto, F.S.', 'Gomes, L.T.'],
    year: 2022,
    pageNumber: 91,
    url: 'https://emprad.org.br/articles/7',
    downloadUrl: 'https://emprad.org.br/download/7',
    snippet: 'A pesquisa identificou que a estratégia de internacionalização mais eficaz para startups brasileiras envolve parcerias estratégicas com players locais nos mercados-alvo.',
    keywords: ['internacionalização', 'startups', 'estratégia empresarial']
  },
  {
    id: '8',
    title: 'Ecossistemas de Inovação: O Papel das Universidades no Desenvolvimento de Novos Negócios',
    authors: ['Martins, P.R.', 'Torres, C.V.'],
    year: 2021,
    pageNumber: 156,
    url: 'https://emprad.org.br/articles/8',
    downloadUrl: 'https://emprad.org.br/download/8',
    snippet: 'As parcerias entre universidades e setor privado resultaram na criação de 270 novas empresas nos últimos cinco anos, com taxa de sobrevivência 22% superior à média nacional.',
    keywords: ['ecossistemas de inovação', 'universidades', 'empreendedorismo']
  }
];

// More sophisticated AI response generation with topic analysis and recommendation logic
export const mockQueryArticles = async (query: string): Promise<Article[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  const normalizedQuery = query.toLowerCase();

  // First, let's try to find some relevant articles
  let matchedArticles = mockArticlesDatabase.filter(article => {
    // Check title, keywords, and snippet with different weights
    const titleMatch = article.title.toLowerCase().includes(normalizedQuery);
    const keywordMatch = article.keywords.some(keyword => 
      normalizedQuery.includes(keyword) || keyword.includes(normalizedQuery)
    );
    const snippetMatch = article.snippet?.toLowerCase().includes(normalizedQuery);
    
    return titleMatch || keywordMatch || snippetMatch;
  });

  // If no direct matches, try to find articles by topic or related concepts
  if (matchedArticles.length === 0) {
    // Define common topics and related terms in entrepreneurship research
    const topics = {
      empreendedorismo: ['startup', 'negócio', 'empresário', 'empreender', 'negócios', 'empresa'],
      inovação: ['novo', 'criativo', 'disruptivo', 'tecnologia', 'inovar', 'transformação'],
      sustentabilidade: ['ambiental', 'verde', 'ecológico', 'sustentável', 'ESG', 'responsabilidade'],
      gestão: ['administração', 'gerenciamento', 'liderança', 'estratégia', 'governança'],
      pesquisa: ['estudo', 'análise', 'metodologia', 'investigação', 'resultados', 'dados'],
      mercado: ['consumidor', 'cliente', 'vendas', 'marketing', 'competição', 'tendências']
    };
    
    // Check for conceptual matches
    for (const [topic, relatedWords] of Object.entries(topics)) {
      const queryWords = normalizedQuery.split(' ');
      const isRelated = queryWords.some(word => 
        word === topic || relatedWords.includes(word)
      );
      
      if (isRelated) {
        matchedArticles = mockArticlesDatabase.filter(article => 
          article.keywords.includes(topic) || 
          article.title.toLowerCase().includes(topic) ||
          relatedWords.some(related => article.title.toLowerCase().includes(related))
        );
        
        if (matchedArticles.length > 0) break;
      }
    }
    
    // If still no matches, return a few random articles as recommendations
    if (matchedArticles.length === 0) {
      // Shuffle the array and take a few random articles
      matchedArticles = [...mockArticlesDatabase]
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);
    }
  }

  // Limit to most relevant results
  return matchedArticles.slice(0, Math.min(5, matchedArticles.length));
};

// Generate more sophisticated AI responses with contextual analysis
export const generateEnhancedAIResponse = (query: string, articles: Article[]): string => {
  // If no articles found, provide a helpful response anyway
  if (articles.length === 0) {
    const generalResponses = [
      `Não encontrei artigos específicos sobre "${query}" nos anais do EMPRAD, mas posso ajudar em outros tópicos relacionados ao empreendedorismo, inovação, gestão ou sustentabilidade. Você poderia reformular sua pergunta?`,
      `Sua pergunta sobre "${query}" é interessante, mas não localizei estudos específicos nos anais do EMPRAD. Gostaria de explorar algum tema relacionado como empreendedorismo social, inovação tecnológica ou gestão estratégica?`,
      `Não identifiquei pesquisas diretamente relacionadas a "${query}" nos 1585 artigos do EMPRAD. Talvez possamos refinar sua busca ou explorar tópicos adjacentes na área de administração e empreendedorismo?`
    ];
    return generalResponses[Math.floor(Math.random() * generalResponses.length)];
  }

  // Extract years for time-based analysis
  const years = articles.map(a => a.year);
  const minYear = Math.min(...years);
  const maxYear = Math.max(...years);
  const yearRange = minYear === maxYear ? `${minYear}` : `${minYear} a ${maxYear}`;

  // Extract keywords for topic analysis
  const allKeywords = articles.flatMap(a => a.keywords);
  const keywordFrequency = allKeywords.reduce((acc, keyword) => {
    acc[keyword] = (acc[keyword] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  // Sort keywords by frequency
  const topKeywords = Object.entries(keywordFrequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([keyword]) => keyword);

  // Generate introduction
  let response = `Com base na sua consulta sobre "${query}", analisei os anais do EMPRAD e encontrei ${articles.length} artigos relevantes publicados entre ${yearRange}.\n\n`;

  // Analyze the query to determine the type of response needed
  const queryLower = query.toLowerCase();
  
  // Check if it's a question
  const isQuestion = queryLower.includes('?') || 
                    queryLower.startsWith('como') || 
                    queryLower.startsWith('qual') || 
                    queryLower.startsWith('quais') || 
                    queryLower.startsWith('o que') || 
                    queryLower.startsWith('por que');

  // Check if it's a comparison request
  const isComparison = queryLower.includes(' versus ') || 
                      queryLower.includes(' vs ') || 
                      queryLower.includes(' comparado ') || 
                      queryLower.includes(' diferença ');

  // Check if it's a definition request
  const isDefinition = queryLower.includes('o que é') || 
                      queryLower.includes('definição de') || 
                      queryLower.includes('conceito de') || 
                      queryLower.includes('significado de');

  // Generate synthesis of findings based on query type
  response += `**Síntese das descobertas:**\n`;
  
  if (isQuestion) {
    response += `Analisando os estudos publicados no EMPRAD, posso responder que ${generateQuestionResponse(query, articles)}.\n\n`;
  } else if (isComparison) {
    response += `Os artigos do EMPRAD apresentam diferentes perspectivas sobre este tema. ${generateComparisonResponse(query, articles)}.\n\n`;
  } else if (isDefinition) {
    response += `Segundo a literatura acadêmica do EMPRAD, ${generateDefinitionResponse(query, articles)}.\n\n`;
  } else if (queryLower.includes('empreendedorismo')) {
    response += `As pesquisas sobre empreendedorismo no contexto brasileiro destacam a importância da inovação, sustentabilidade e adaptação às condições econômicas locais. Os estudos revelam que empreendimentos com forte componente tecnológico e/ou impacto social positivo demonstram maior resiliência e crescimento sustentado no mercado brasileiro.\n\n`;
  } else if (queryLower.includes('inovação')) {
    response += `A literatura do EMPRAD sobre inovação enfatiza a necessidade de ecossistemas integrados, onde universidades, empresas e governo colaboram efetivamente. Os dados indicam que organizações com práticas de inovação estruturadas apresentam resultados financeiros e operacionais significativamente superiores aos concorrentes tradicionais, especialmente em contextos de alta competitividade e mudança tecnológica acelerada.\n\n`;
  } else if (queryLower.includes('gestão')) {
    response += `As pesquisas em gestão organizacional publicadas no EMPRAD apontam para uma crescente adoção de metodologias ágeis e práticas centradas no ser humano. A transformação digital aparece como um tema recorrente, com ênfase na necessidade de adaptação dos modelos de gestão às novas tecnologias e demandas do mercado, privilegiando estruturas mais horizontais e colaborativas.\n\n`;
  } else {
    response += `A análise dos artigos revela tendências convergentes sobre ${topKeywords.join(', ')} no contexto empresarial brasileiro. Os estudos demonstram a interconexão desses temas e sua relevância para o desenvolvimento de negócios mais competitivos e sustentáveis no atual cenário econômico e social.\n\n`;
  }

  // Generate methodology insights
  response += `**Abordagens metodológicas:**\n`;
  response += `Os estudos analisados utilizaram predominantemente ${generateMethodologyInsights(articles)}, o que permite compreender tanto as particularidades dos casos estudados quanto estabelecer correlações estatisticamente significativas entre variáveis de interesse.\n\n`;

  // Generate conclusion and next steps
  response += `**Implicações práticas:**\n`;
  response += `As pesquisas sugerem que ${generatePracticalImplications(query, articles)}. A literatura recomenda a adoção de práticas colaborativas e o monitoramento contínuo do ambiente competitivo para identificar oportunidades de inovação e crescimento sustentável.\n\n`;

  response += `Você pode encontrar mais detalhes nas referências abaixo, incluindo links para o texto completo de cada artigo.`;

  return response;
};

// Helper functions for response generation
function generateQuestionResponse(query: string, articles: Article[]): string {
  const queryLower = query.toLowerCase();
  
  if (queryLower.includes('como') && queryLower.includes('empreender')) {
    return "o processo empreendedor envolve identificação de oportunidades, avaliação de riscos, planejamento estratégico e implementação. Os estudos indicam que empreendedores bem-sucedidos combinam análise de mercado com capacidade de adaptação rápida às mudanças do ambiente de negócios";
  } else if (queryLower.includes('impacto') || queryLower.includes('efeito')) {
    return "o impacto das práticas inovadoras é substancial nos resultados organizacionais, com melhorias documentadas em produtividade (aumento médio de 27%), satisfação do cliente (incremento de 35% nos índices de fidelização) e vantagem competitiva sustentável";
  } else if (queryLower.includes('desafio') || queryLower.includes('barreira')) {
    return "os principais desafios identificados nas pesquisas incluem acesso limitado a capital, burocracia excessiva, carência de mão de obra qualificada e dificuldades para implementar e escalar inovações no contexto brasileiro";
  } else if (queryLower.includes('tendência') || queryLower.includes('futuro')) {
    return "as tendências emergentes apontam para modelos de negócio mais colaborativos, intensivos em tecnologia e orientados por propósito, com crescente valorização de práticas sustentáveis e socialmente responsáveis";
  } else {
    return "os estudos apontam para a importância da contextualização das práticas de gestão e empreendedorismo à realidade brasileira, considerando as especificidades culturais, econômicas e sociais do país";
  }
}

function generateComparisonResponse(query: string, articles: Article[]): string {
  const queryLower = query.toLowerCase();
  
  if (queryLower.includes('startup') && queryLower.includes('tradicional')) {
    return "as pesquisas evidenciam que startups demonstram maior agilidade adaptativa e propensão à inovação disruptiva, enquanto empresas tradicionais apresentam vantagens em estabilidade operacional, relacionamentos estabelecidos e acesso a recursos. Os estudos sugerem que a combinação de elementos de ambos os modelos pode gerar valor sinérgico";
  } else if (queryLower.includes('público') && queryLower.includes('privado')) {
    return "os artigos analisam as diferenças fundamentais entre gestão pública e privada, destacando que organizações públicas enfrentam maior complexidade institucional e restrições normativas, enquanto empresas privadas possuem maior autonomia decisória mas enfrentam pressão contínua por resultados financeiros";
  } else if (queryLower.includes('nacional') && queryLower.includes('internacional')) {
    return "as comparações entre empreendimentos nacionais e internacionais revelam que fatores culturais, institucionais e econômicos moldam significativamente as práticas gerenciais e estratégias de negócio em diferentes contextos";
  } else {
    return "a literatura examina diversos modelos e abordagens, evidenciando que não existe uma solução universal. O sucesso depende da adequação das estratégias ao contexto específico, considerando fatores como estágio de desenvolvimento organizacional, setor econômico e ambiente competitivo";
  }
}

function generateDefinitionResponse(query: string, articles: Article[]): string {
  const queryLower = query.toLowerCase();
  
  if (queryLower.includes('empreendedorismo')) {
    return "o empreendedorismo é conceituado como processo de identificação, desenvolvimento e implementação de oportunidades de negócio que gerem valor econômico e/ou social, caracterizado por inovação, assunção calculada de riscos e proatividade";
  } else if (queryLower.includes('inovação')) {
    return "a inovação é definida como a implementação bem-sucedida de novas ideias, processos, produtos ou serviços que geram valor significativo para os stakeholders. As pesquisas distinguem entre inovação incremental (melhorias contínuas) e disruptiva (transformações radicais)";
  } else if (queryLower.includes('sustentabilidade')) {
    return "o conceito de sustentabilidade empresarial abrange práticas que equilibram objetivos econômicos, sociais e ambientais, visando a longevidade organizacional e a criação de valor compartilhado para todos os stakeholders";
  } else if (queryLower.includes('gestão')) {
    return "a gestão contemporânea é caracterizada como processo integrado de planejamento, organização, liderança e controle de recursos e processos organizacionais, com crescente ênfase em abordagens adaptativas, colaborativas e orientadas por dados";
  } else {
    return "os conceitos fundamentais na área de administração e empreendedorismo passam por constante evolução, refletindo as transformações do ambiente de negócios, tecnologias emergentes e valores sociais";
  }
}

function generateMethodologyInsights(articles: Article[]): string {
  const methodologyOptions = [
    "métodos qualitativos (estudos de caso e entrevistas em profundidade) combinados com análise quantitativa de dados setoriais",
    "abordagens mistas que integram surveys em larga escala com análises qualitativas aprofundadas em casos exemplares",
    "métodos longitudinais que acompanham a evolução de organizações e mercados ao longo do tempo, identificando padrões de transformação e adaptação",
    "análises comparativas entre diferentes contextos organizacionais, setores econômicos e regiões geográficas"
  ];
  
  return methodologyOptions[Math.floor(Math.random() * methodologyOptions.length)];
}

function generatePracticalImplications(query: string, articles: Article[]): string {
  const queryLower = query.toLowerCase();
  
  if (queryLower.includes('empreendedorismo')) {
    return "empreendedores devem investir no desenvolvimento de redes de relacionamento, capacidade de adaptação e aprendizagem contínua para aumentar suas chances de sucesso";
  } else if (queryLower.includes('inovação')) {
    return "organizações inovadoras necessitam criar ambientes que estimulem a experimentação, tolerem falhas produtivas e estabeleçam mecanismos eficientes para implementar e escalar novas ideias";
  } else if (queryLower.includes('sustentabilidade')) {
    return "a integração de práticas sustentáveis ao core business representa não apenas um imperativo ético, mas uma fonte potencial de vantagem competitiva e criação de valor a longo prazo";
  } else {
    return "gestores e empreendedores devem desenvolver competências adaptativas e visão sistêmica para navegar com sucesso em ambientes de negócio cada vez mais complexos, voláteis e interconectados";
  }
}
