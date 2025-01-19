import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface CommunicationType {
  id: string;
  name: string;
  description: string;
  deadline: number;
  frequency: string;
}

const CommunicationTypes = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [frequency, setFrequency] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !description || !deadline || !frequency) {
      toast.error("Por favor, preencha todos os campos");
      return;
    }

    // Aqui será implementada a lógica para salvar no banco de dados
    toast.success("Tipo de comunicação cadastrado com sucesso!");
    
    // Limpa o formulário
    setName("");
    setDescription("");
    setDeadline("");
    setFrequency("");
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Cadastro de Tipos de Comunicações</h1>
        <Button variant="outline" onClick={() => navigate("/dashboard")}>
          Voltar
        </Button>
      </div>

      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Nome da Comunicação</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Comunicação ao CENSEC"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descreva o tipo de comunicação"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="deadline">Prazo (em dias)</Label>
              <Input
                id="deadline"
                type="number"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                placeholder="Ex: 5"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="frequency">Frequência</Label>
              <Input
                id="frequency"
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
                placeholder="Ex: Mensal"
              />
            </div>
          </div>

          <Button type="submit" className="w-full">
            Cadastrar
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default CommunicationTypes;