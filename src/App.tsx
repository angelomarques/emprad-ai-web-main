
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Articles from "./pages/Articles";
import About from "./pages/About";
import ResearchAssistant from "./pages/ResearchAssistant";
import NotFound from "./pages/NotFound";
import SmartSearch from "./pages/SmartSearch";
import DirectDownload from "./pages/DirectDownload";
import IndexedArticles from "./pages/IndexedArticles";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/about" element={<About />} />
          <Route path="/research-assistant" element={<ResearchAssistant />} />
          <Route path="/smart-search" element={<SmartSearch />} />
          <Route path="/direct-download" element={<DirectDownload />} />
          <Route path="/indexed-articles" element={<IndexedArticles />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
