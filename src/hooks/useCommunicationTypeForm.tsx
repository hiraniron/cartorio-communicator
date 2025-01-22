import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import type { CommunicationType } from "@/types/communication";
import { validateCommunicationTypeForm } from "./communication-type-form/useFormValidation";
import { saveCommunicationType } from "./communication-type-form/useSupabaseOperations";

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
  const [requiresPdf, setRequiresPdf] = useState(initialData?.requires_pdf ?? false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const isValid = validateCommunicationTypeForm({
      name,
      description,
      whatToInform,
      deadlines,
      selectedMonths,
      requiresPdf
    });

    if (!isValid) return;

    try {
      await saveCommunicationType(
        { name, description, whatToInform, deadlines, selectedMonths, requiresPdf },
        initialData?.id
      );
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
      customName: "", // Kept for compatibility
      description,
      whatToInform,
      deadlines,
      selectedMonths,
      requiresPdf,
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
      setRequiresPdf,
    },
    handleSubmit,
  };
};