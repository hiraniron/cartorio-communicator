import { useState } from "react";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { StatsOverview } from "@/components/dashboard/StatsOverview";
import { CommunicationsList } from "@/components/dashboard/CommunicationsList";
import { CommunicationType } from "@/types/communication";

const Dashboard = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const { data: communications = [], isLoading } = useQuery({
    queryKey: ['communication-types'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('communication_types')
        .select('*');
      
      if (error) throw error;
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

  const handleSubmit = (id: number) => {
    if (selectedFile) {
      toast.success("Comprovante enviado com sucesso!");
      setSelectedFile(null);
    } else {
      toast.error("Por favor, selecione um arquivo");
    }
  };

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  const pendingCount = communications.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto space-y-8 animate-in">
        <DashboardHeader />
        <StatsOverview pendingCount={pendingCount} />
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