import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { MonthSelector } from "./MonthSelector";
import { CommunicationNameSelect } from "./form/CommunicationNameSelect";
import { DescriptionInput } from "./form/DescriptionInput";
import { WhatToInformInput } from "./form/WhatToInformInput";
import { DeadlinesInput } from "./form/DeadlinesInput";
import { YearInput } from "./form/YearInput";
import { format } from "date-fns";
import type { CommunicationType } from "@/types/communication";

interface CommunicationTypeFormProps {
  initialData?: CommunicationType;
}

export const CommunicationTypeForm = ({ initialData }: CommunicationTypeFormProps) => {
  const navigate = useNavigate();
  const [name, setName] = useState(initialData?.name ?? "");
  const [customName, setCustomName] = useState(initialData?.custom_name ?? "");
  const [description, setDescription] = useState(initialData?.description ?? "");
  const [whatToInform, setWhatToInform] = useState(initialData?.what_to_inform ?? "");
  const [deadlines, setDeadlines] = useState<string[]>(
    initialData?.deadlines.map(String) ?? [""]
  );
  const [selectedMonths, setSelectedMonths] = useState<Date[]>(
    initialData?.selected_months.map(date => new Date(date)) ?? []
  );
  const [year, setYear] = useState(initialData?.year.toString() ?? "");

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
      const data = {
        name: finalName,
        custom_name: name === "outros" ? customName : null,
        description,
        what_to_inform: whatToInform,
        deadlines: deadlines.map(d => parseInt(d)),
        selected_months: selectedMonths.map(date => format(date, 'yyyy-MM-dd')),
        year: yearNumber
      };

      if (initialData) {
        const { error } = await supabase
          .from('communication_types')
          .update(data)
          .eq('id', initialData.id);

        if (error) throw error;

        toast.success("Comunicação atualizada com sucesso!");
      } else {
        const { error } = await supabase
          .from('communication_types')
          .insert(data);

        if (error) throw error;

        toast.success("Comunicação cadastrada com sucesso!");
      }
      
      navigate('/registered-communications');
    } catch (error) {
      console.error('Error saving communication type:', error);
      toast.error("Erro ao salvar comunicação");
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
        <CommunicationNameSelect
          name={name}
          customName={customName}
          onNameChange={setName}
          onCustomNameChange={setCustomName}
        />

        <DescriptionInput
          description={description}
          onDescriptionChange={setDescription}
        />

        <WhatToInformInput
          whatToInform={whatToInform}
          onWhatToInformChange={setWhatToInform}
        />

        <DeadlinesInput
          deadlines={deadlines}
          onDeadlineAdd={addDeadline}
          onDeadlineRemove={removeDeadline}
          onDeadlineUpdate={updateDeadline}
        />

        <MonthSelector 
          selectedMonths={selectedMonths} 
          setSelectedMonths={setSelectedMonths} 
        />

        <YearInput
          year={year}
          onYearChange={setYear}
        />

        <Button type="submit" className="w-full">
          {initialData ? "Atualizar" : "Cadastrar"}
        </Button>
      </form>
    </Card>
  );
};