import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Save, Loader2 } from "lucide-react";
import { useGetDefaultPromptsQuery } from "@/services/prompt/queries";
import { useUpdateDefaultPromptMutation } from "@/services/prompt/mutations";
import { useToast } from "@/hooks/use-toast";
import type { Prompt } from "@/services/prompt/types";

const PromptEditor: React.FC = () => {
  const [promptText, setPromptText] = useState("");
  const [promptName, setPromptName] = useState("");
  const { toast } = useToast();

  // Fetch the default prompt
  const {
    data: defaultPrompt,
    isLoading: isLoadingPrompt,
    error,
  } = useGetDefaultPromptsQuery();

  // Update prompt mutation
  const { mutate: updatePrompt, isPending: isUpdating } =
    useUpdateDefaultPromptMutation({
      onSuccess: (data) => {
        toast({
          title: "Sucesso!",
          description: "O prompt padrão foi atualizado com sucesso.",
        });
        setPromptText(data.prompt);
        setPromptName(data.name);
      },
      onError: (error) => {
        toast({
          title: "Erro",
          description: "Erro ao atualizar o prompt padrão. Tente novamente.",
          variant: "destructive",
        });
        console.error("Error updating prompt:", error);
      },
    });

  // Set initial values when data is loaded
  useEffect(() => {
    if (defaultPrompt) {
      setPromptText(defaultPrompt.prompt);
      setPromptName(defaultPrompt.name);
    }
  }, [defaultPrompt]);

  const handleSave = () => {
    if (!promptText.trim()) {
      toast({
        title: "Erro",
        description: "O prompt não pode estar vazio.",
        variant: "destructive",
      });
      return;
    }

    const updatedPrompt: Prompt = {
      name: promptName,
      prompt: promptText.trim(),
    };

    updatePrompt(updatedPrompt);
  };

  if (isLoadingPrompt) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-6 flex-grow flex items-center justify-center">
          <div className="flex items-center gap-2">
            <Loader2 className="h-6 w-6 animate-spin text-emprad-dark-purple" />
            <span className="text-gray-600">Carregando prompt padrão...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-6 flex-grow flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-red-600 mb-2">
              Erro ao carregar prompt
            </h2>
            <p className="text-gray-600">
              Não foi possível carregar o prompt padrão. Tente novamente mais
              tarde.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-6 flex-grow">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-emprad-dark-purple">
            Editor de Prompt Padrão
          </h1>
          <p className="text-gray-600 mt-2">
            Edite o prompt padrão usado pelo assistente de pesquisa EMPRAD.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="mb-4">
            <label
              htmlFor="prompt-name"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Nome do Prompt
            </label>
            <input
              id="prompt-name"
              type="text"
              value={promptName}
              onChange={(e) => setPromptName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emprad-purple focus:border-transparent"
              placeholder="Digite o nome do prompt"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="prompt-text"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Conteúdo do Prompt
            </label>
            <Textarea
              id="prompt-text"
              value={promptText}
              onChange={(e) => setPromptText(e.target.value)}
              placeholder="Digite o conteúdo do prompt padrão..."
              className="min-h-[300px] resize-none"
              disabled={isUpdating}
            />
            <p className="text-sm text-gray-500 mt-2">
              Este prompt será usado como base para todas as respostas do
              assistente de pesquisa.
            </p>
          </div>

          <div className="flex justify-end">
            <Button
              onClick={handleSave}
              disabled={isUpdating || !promptText.trim()}
              className="bg-emprad-purple hover:bg-emprad-dark-purple text-white"
            >
              {isUpdating ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Salvando...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Salvar Prompt
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromptEditor;
