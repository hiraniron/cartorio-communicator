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
import { Plus, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const CommunicationTypeForm = () => {
  const [name, setName] = useState("");
  const [customName, setCustomName] = useState("");
  const [description, setDescription] = useState("");
  const [whatToInform, setWhatToInform] = useState("");
  const [deadlines, setDeadlines] = useState<string[]>([""]);
  const [selectedMonths, setSelectedMonths] = useState<Date[]>([]);
  const [year, setYear] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const finalName = name === "outros" ? customName : name;
    
    if (!finalName || !description || !whatToInform || deadlines.some(d => !d) || selectedMonths.length === 0 || !year) {
      toast.error("Por favor, preencha todos os campos");
      return;
    }

    const invalidDeadlines = deadlines.some(deadline => {
      const deadlineNumber = parseInt(deadline);
      return deadlineNumber < 1 || deadlineNumber > 31;
    });

    if (invalidDeadlines) {
      toast.error("Por favor, insira dias válidos (entre 1 e 31)");
      return;
    }

    const yearNumber = parseInt(year);
    if (yearNumber < 2024 || yearNumber > 2100) {
      toast.error("Por favor, insira um ano válido (entre 2024 e 2100)");
      return;
    }

    try {
      const { error } = await supabase
        .from('communication_types')
        .insert({
          name: finalName,
          custom_name: name === "outros" ? customName : null,
          description,
          what_to_inform: whatToInform,
          deadlines: deadlines.map(d => parseInt(d)),
          selected_months: selectedMonths,
          year: yearNumber
        });

      if (error) throw error;

      toast.success("Tipo de comunicação cadastrado com sucesso!");
      
      setName("");
      setCustomName("");
      setDescription("");
      setWhatToInform("");
      setDeadlines([""]);
      setSelectedMonths([]);
      setYear("");
    } catch (error) {
      console.error('Error saving communication type:', error);
      toast.error("Erro ao cadastrar tipo de comunicação");
    }
  };

  const addDeadline = () => {
    setDeadlines([...deadlines, ""]);
  };

  const removeDeadline = (index: number) => {
    if (deadlines.length > 1) {
      const newDeadlines = deadlines.filter((_, i) => i !== index);
      setDeadlines(newDeadlines);
    }
  };

  const updateDeadline = (index: number, value: string) => {
    const newDeadlines = [...deadlines];
    newDeadlines[index] = value;
    setDeadlines(newDeadlines);
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

        <div className="space-y-2">
          <Label htmlFor="whatToInform">O que informar</Label>
          <Textarea
            id="whatToInform"
            value={whatToInform}
            onChange={(e) => setWhatToInform(e.target.value)}
            placeholder="Descreva quais informações devem ser fornecidas"
          />
        </div>

        <div className="space-y-2">
          <Label>Dia</Label>
          <div className="space-y-2">
            {deadlines.map((deadline, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  type="number"
                  min="1"
                  max="31"
                  value={deadline}
                  onChange={(e) => updateDeadline(index, e.target.value)}
                  placeholder="Ex: 5"
                />
                {deadlines.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeDeadline(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addDeadline}
              className="w-full"
            >
              <Plus className="h-4 w-4 mr-2" />
              Adicionar dia
            </Button>
          </div>
        </div>

        <MonthSelector 
          selectedMonths={selectedMonths} 
          setSelectedMonths={setSelectedMonths} 
        />

        <div className="space-y-2">
          <Label htmlFor="year">Ano</Label>
          <Input
            id="year"
            type="number"
            min="2024"
            max="2100"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            placeholder="Ex: 2024"
          />
        </div>

        <Button type="submit" className="w-full">
          Cadastrar
        </Button>
      </form>
    </Card>
  );
};
