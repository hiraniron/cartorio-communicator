import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import type { CommunicationType } from "@/types/communication";

export const useCommunicationTypeForm = (initialData?: CommunicationType) => {
  const navigate = useNavigate();
  const [name, setName] = useState(initialData?.name ?? "");
  const [description, setDescription] = useState(initialData?.description ?? "");
  const [whatToInform, setWhatToInform] = useState(initialData?.what_to_inform ?? "");
  const [deadlines, setDeadlines] = useState<string[]>(
    initialData?.deadlines.map(String) ?? [""]
  );
  const [selectedMonths, setSelectedMonths] = useState<Date[]>(
    initialData?.selected_months.map(date => new Date(date)) ?? []
  );

  const validateForm = () => {
    if (!name || !description || !whatToInform || deadlines.some(d => !d) || selectedMonths.length === 0) {
      toast.error("Por favor, preencha todos os campos");
      return false;
    }

    const invalidDeadlines = deadlines.some(deadline => {
      const deadlineNumber = parseInt(deadline);
      return deadlineNumber < 1 || deadlineNumber > 31;
    });

    if (invalidDeadlines) {
      toast.error("Por favor, insira dias válidos (entre 1 e 31)");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      const data = {
        name,
        description,
        what_to_inform: whatToInform,
        deadlines: deadlines.map(d => parseInt(d)),
        selected_months: selectedMonths.map(date => format(date, 'yyyy-MM-dd'))
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

  return {
    formState: {
      name,
      customName: "",
      description,
      whatToInform,
      deadlines,
      selectedMonths,
    },
    formHandlers: {
      setName,
      setCustomName: () => {}, // Kept for compatibility
      setDescription,
      setWhatToInform,
      setSelectedMonths,
      addDeadline,
      removeDeadline,
      updateDeadline,
    },
    handleSubmit,
  };
};