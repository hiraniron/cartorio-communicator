import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { toast } from "sonner";

interface CommunicationTypeData {
  name: string;
  description: string;
  whatToInform: string;
  deadlines: string[];
  selectedMonths: Date[];
}

export const saveCommunicationType = async (
  data: CommunicationTypeData,
  id?: string
) => {
  const formattedData = {
    name: data.name,
    description: data.description,
    what_to_inform: data.whatToInform,
    deadlines: data.deadlines.map(d => parseInt(d)),
    selected_months: data.selectedMonths.map(date => format(date, 'yyyy-MM-dd'))
  };

  if (id) {
    const { error } = await supabase
      .from('communication_types')
      .update(formattedData)
      .eq('id', id);

    if (error) throw error;
    toast.success("Comunicação atualizada com sucesso!");
  } else {
    const { error } = await supabase
      .from('communication_types')
      .insert(formattedData);

    if (error) throw error;
    toast.success("Comunicação cadastrada com sucesso!");
  }
};