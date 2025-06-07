
import React from 'react';
import Header from '../components/Header';
import { CheckCircle } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const About: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="bg-emprad-purple py-8 md:py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-2xl md:text-4xl font-bold text-white mb-4">
            Sobre o EMPRAD
          </h1>
          <p className="text-lg text-emprad-light-purple max-w-3xl mx-auto">
            Encontro de Mestrados Profissionais em Administração
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8 mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-emprad-purple mb-4">Nossa Missão</h2>
          <p className="text-gray-700 mb-6">
            O EMPRAD (Encontro de Mestrados Profissionais em Administração) tem como missão promover o diálogo entre acadêmicos, 
            estudantes e profissionais, fortalecendo a pesquisa aplicada e o conhecimento em administração.
          </p>
          
          <h2 className="text-xl md:text-2xl font-bold text-emprad-purple mb-4">História</h2>
          <p className="text-gray-700 mb-6">
            Fundado em 2014, o EMPRAD nasceu da necessidade de criar um espaço específico para os Mestrados Profissionais 
            em Administração compartilharem suas experiências e produções acadêmicas. Ao longo dos anos, o evento se consolidou 
            como um dos mais importantes no calendário da área, reunindo pesquisadores de todo o Brasil.
          </p>
          
          <h2 className="text-xl md:text-2xl font-bold text-emprad-purple mb-4">Objetivos</h2>
          <ul className="space-y-3 mb-6">
            {[
              "Promover o intercâmbio de conhecimentos entre programas de Mestrado Profissional em Administração",
              "Incentivar a produção científica de relevância aplicada",
              "Aproximar a academia do mercado e das organizações",
              "Disseminar boas práticas e casos de sucesso",
              "Fortalecer a comunidade de Mestrados Profissionais em Administração"
            ].map((item, index) => (
              <li key={index} className="flex items-start">
                <CheckCircle className="text-emprad-purple shrink-0 mr-2 mt-0.5" size={18} />
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
          
          <h2 className="text-xl md:text-2xl font-bold text-emprad-purple mb-4">EMPRAD 2025</h2>
          <p className="text-gray-700">
            A edição de 2025 do EMPRAD acontecerá nos dias 26 e 27 de setembro em formato híbrido, 
            permitindo participação presencial e online. O evento contará com palestras, workshops, 
            apresentações de trabalhos e mesas redondas com especialistas nacionais e internacionais.
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
          <h2 className="text-xl md:text-2xl font-bold text-emprad-purple mb-4">Contato</h2>
          <p className="text-gray-700 mb-4">
            Para mais informações sobre o EMPRAD, entre em contato conosco:
          </p>
          <div className="space-y-2">
            <p className="text-gray-700"><strong>E-mail:</strong> mpe@usp.br</p>
            <p className="text-gray-700"><strong>Telefone:</strong> (11) 98792-6892</p>
            <p className="text-gray-700"><strong>Endereço:</strong> Av. Prof. Luciano Gualberto, 908 - São Paulo/SP</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
