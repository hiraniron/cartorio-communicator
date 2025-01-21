import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { CommunicationTypeForm } from "@/components/communication-types/CommunicationTypeForm";
import type { CommunicationType } from "@/types/communication";

const EditCommunication = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: communication, isLoading } = useQuery({
    queryKey: ['communication', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('communication_types')
        .select('*')
        .eq('id', id)
        .maybeSingle();
      
      if (error) {
        console.error('Error fetching communication:', error);
        toast.error('Erro ao carregar comunicação');
        throw error;
      }
      
      if (!data) {
        toast.error('Comunicação não encontrada');
        navigate('/registered-communications');
        return null;
      }
      
      return data as CommunicationType;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 flex items-center justify-center">
        <div className="text-gray-500">Carregando...</div>
      </div>
    );
  }

  if (!communication) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-3xl mx-auto space-y-8">
        <header className="space-y-2">
          <h1 className="text-4xl font-display font-bold">Editar Comunicação</h1>
          <p className="text-gray-500">Atualize os detalhes da comunicação</p>
        </header>
        <CommunicationTypeForm initialData={communication} />
      </div>
    </div>
  );
};

export default EditCommunication;