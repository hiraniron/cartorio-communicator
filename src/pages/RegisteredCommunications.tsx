import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { CommunicationList } from "@/components/registered-communications/CommunicationList";
import { PageHeader } from "@/components/registered-communications/PageHeader";
import type { CommunicationType } from "@/types/communication";

const RegisteredCommunications = () => {
  const { data: communications = [], isLoading, refetch } = useQuery({
    queryKey: ['registered-communications'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('communication_types')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching communications:', error);
        toast.error('Erro ao carregar comunicações');
        throw error;
      }
      
      return data as CommunicationType[];
    },
  });

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('communication_types')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast.success('Comunicação excluída com sucesso');
      refetch();
    } catch (error) {
      console.error('Error deleting communication:', error);
      toast.error('Erro ao excluir comunicação');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 flex items-center justify-center">
        <div className="text-gray-500">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <PageHeader />
        <CommunicationList 
          communications={communications}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default RegisteredCommunications;