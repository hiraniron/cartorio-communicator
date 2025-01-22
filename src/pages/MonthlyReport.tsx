import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { PeriodSelector } from "@/components/monthly-report/PeriodSelector";
import { StatsOverview } from "@/components/monthly-report/StatsOverview";
import { SubmissionsTable } from "@/components/monthly-report/SubmissionsTable";

const MonthlyReport = () => {
  const currentDate = new Date();
  const previousMonth = currentDate.getMonth() === 0 ? 11 : currentDate.getMonth() - 1;
  const previousMonthYear = currentDate.getMonth() === 0 
    ? currentDate.getFullYear() - 1 
    : currentDate.getFullYear();

  const [selectedMonth, setSelectedMonth] = useState(previousMonth);
  const [selectedYear, setSelectedYear] = useState(previousMonthYear);

  const { data: submissions = [], isLoading } = useQuery({
    queryKey: ['communication-submissions', selectedMonth, selectedYear],
    queryFn: async () => {
      const startOfMonth = new Date(selectedYear, selectedMonth, 1);
      const endOfMonth = new Date(selectedYear, selectedMonth + 1, 0);
      
      const { data, error } = await supabase
        .from('communication_submissions')
        .select(`
          *,
          communication_type:communication_types(name),
          profile:profiles(full_name)
        `)
        .gte('submission_date', startOfMonth.toISOString())
        .lte('submission_date', endOfMonth.toISOString());

      if (error) {
        console.error('Error fetching submissions:', error);
        toast.error('Erro ao carregar submissões');
        throw error;
      }

      return data;
    },
  });

  const stats = {
    onTime: submissions.filter(s => s.status === 'on_time').length,
    late: submissions.filter(s => s.status === 'late').length,
    pending: submissions.filter(s => s.status === 'pending').length,
    total: submissions.length,
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-gray-500">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8 p-6">
      <h1 className="text-3xl font-bold">Relatório Mensal</h1>
      
      <div className="bg-white/50 backdrop-blur-sm rounded-lg p-6 shadow-sm space-y-6">
        <PeriodSelector
          selectedMonth={selectedMonth}
          selectedYear={selectedYear}
          onMonthChange={(value) => setSelectedMonth(parseInt(value))}
          onYearChange={(value) => setSelectedYear(parseInt(value))}
        />

        <StatsOverview stats={stats} />

        <SubmissionsTable submissions={submissions} />
      </div>
    </div>
  );
};

export default MonthlyReport;