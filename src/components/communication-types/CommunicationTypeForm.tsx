import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { MonthSelector } from "./MonthSelector";
import { CommunicationNameSelect } from "./form/CommunicationNameSelect";
import { DescriptionInput } from "./form/DescriptionInput";
import { WhatToInformInput } from "./form/WhatToInformInput";
import { DeadlinesInput } from "./form/DeadlinesInput";
import { YearInput } from "./form/YearInput";
import { format } from "date-fns";

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
          selected_months: selectedMonths.map(date => format(date, 'yyyy-MM-dd')),
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
          Cadastrar
        </Button>
      </form>
    </Card>
  );
};