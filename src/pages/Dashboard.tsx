import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { StatsOverview } from "@/components/dashboard/StatsOverview";
import { CommunicationsList } from "@/components/dashboard/CommunicationsList";
import type { CommunicationType } from "@/types/communication";

const Dashboard = () => {
  const { year, month } = useParams();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const { data: communications = [], isLoading } = useQuery({
    queryKey: ['communication-types', year, month],
    queryFn: async () => {
      // Create a date string for the first day of the selected month
      const dateString = `${year}-${month.padStart(2, '0')}-01`;
      
      const { data, error } = await supabase
        .from('communication_types')
        .select('*')
        .contains('selected_months', [dateString]);

      if (error) {
        console.error('Error fetching communications:', error);
        toast.error('Erro ao carregar comunicações');
        throw error;
      }

      return data as CommunicationType[];
    },
  });

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      toast.success("Arquivo selecionado com sucesso!");
    }
  };

  const handleSubmit = (id: string) => {
    if (selectedFile) {
      toast.success("Comprovante enviado com sucesso!");
      setSelectedFile(null);
    } else {
      toast.error("Por favor, selecione um arquivo");
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
      <div className="max-w-7xl mx-auto space-y-8 animate-in">
        <DashboardHeader month={month} year={year} />
        <StatsOverview pendingCount={communications.length} />
        <CommunicationsList
          communications={communications}
          onFileUpload={handleFileUpload}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default Dashboard;