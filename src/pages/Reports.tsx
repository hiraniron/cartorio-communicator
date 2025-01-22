import { StatsTable } from "@/components/reports/StatsTable";
import { ReportsHeader } from "@/components/reports/ReportsHeader";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { CommunicationType } from "@/types/communication";

const Reports = () => {
  const { data: communications = [], isLoading } = useQuery({
    queryKey: ['communications-reports'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('communication_types')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching communications:', error);
        throw error;
      }
      
      return data as CommunicationType[];
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-gray-500">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <ReportsHeader />
      <StatsTable communications={communications} />
    </div>
  );
};

export default Reports;