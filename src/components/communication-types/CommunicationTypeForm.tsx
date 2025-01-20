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
import { MonthSelector } from "./MonthSelector";
import { useState } from "react";
import { toast } from "sonner";

export const CommunicationTypeForm = () => {
  const [name, setName] = useState("");
  const [customName, setCustomName] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [selectedMonths, setSelectedMonths] = useState<Date[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const finalName = name === "outros" ? customName : name;
    
    if (!finalName || !description || !deadline || selectedMonths.length === 0) {
      toast.error("Por favor, preencha todos os campos");
      return;
    }

    const deadlineNumber = parseInt(deadline);
    if (deadlineNumber < 1 || deadlineNumber > 31) {
      toast.error("Por favor, insira um dia válido (entre 1 e 31)");
      return;
    }

    toast.success("Tipo de comunicação cadastrado com sucesso!");
    
    setName("");
    setCustomName("");
    setDescription("");
    setDeadline("");
    setSelectedMonths([]);
  };

  return (
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
            <Label htmlFor="deadline">Até o dia</Label>
            <Input
              id="deadline"
              type="number"
              min="1"
              max="31"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              placeholder="Ex: 5"
            />
          </div>

          <MonthSelector 
            selectedMonths={selectedMonths} 
            setSelectedMonths={setSelectedMonths} 
          />
        </div>

        <Button type="submit" className="w-full">
          Cadastrar
        </Button>
      </form>
    </Card>
  );
};