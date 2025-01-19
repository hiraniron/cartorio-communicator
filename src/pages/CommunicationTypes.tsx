import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  const [customName, setCustomName] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [frequency, setFrequency] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const finalName = name === "outros" ? customName : name;
    
    if (!finalName || !description || !deadline || !frequency) {
      toast.error("Por favor, preencha todos os campos");
      return;
    }

    // Aqui será implementada a lógica para salvar no banco de dados
    toast.success("Tipo de comunicação cadastrado com sucesso!");
    
    // Limpa o formulário
    setName("");
    setCustomName("");
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
            <Select value={name} onValueChange={setName}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o tipo de comunicação" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="defensoria">Defensoria</SelectItem>
                <SelectItem value="sirc-inss-pfb">SIRC-INSS/PFB</SelectItem>
                <SelectItem value="fecom">FECOM</SelectItem>
                <SelectItem value="ibge">IBGE</SelectItem>
                <SelectItem value="crc">CRC</SelectItem>
                <SelectItem value="justica-federal">Justiça Federal</SelectItem>
                <SelectItem value="cni">CNJ</SelectItem>
                <SelectItem value="policia-federal">Polícia Federal</SelectItem>
                <SelectItem value="justica-militar">Justiça Militar</SelectItem>
                <SelectItem value="funai">FUNAI</SelectItem>
                <SelectItem value="ssp-estadual">SSP Estadual</SelectItem>
                <SelectItem value="juiz-direito">Juiz de Direito</SelectItem>
                <SelectItem value="corregedoria-geral">Corregedoria Geral de Justiça</SelectItem>
                <SelectItem value="corregedoria-permanente">Juiz Corregedor Permanente</SelectItem>
                <SelectItem value="malote-digital">Malote Digital</SelectItem>
                <SelectItem value="sedemaf">SEDEMAF</SelectItem>
                <SelectItem value="cgj">CGJ</SelectItem>
                <SelectItem value="detran-municipio">DETRAN/MUNICÍPIO</SelectItem>
                <SelectItem value="dgi">DGI</SelectItem>
                <SelectItem value="censec">CENSEC</SelectItem>
                <SelectItem value="outros">Outros</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {name === "outros" && (
            <div className="space-y-2">
              <Label htmlFor="customName">Especifique o nome da comunicação</Label>
              <Input
                id="customName"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                placeholder="Digite o nome da comunicação"
              />
            </div>
          )}

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
              <Select value={frequency} onValueChange={setFrequency}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a frequência" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="diario">Diário</SelectItem>
                  <SelectItem value="quinzenal">Quinzenal</SelectItem>
                  <SelectItem value="mensal">Mensal</SelectItem>
                  <SelectItem value="trimestral">Trimestral</SelectItem>
                  <SelectItem value="semestral">Semestral</SelectItem>
                </SelectContent>
              </Select>
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