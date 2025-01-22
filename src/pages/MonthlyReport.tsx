import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { PeriodSelector } from "@/components/monthly-report/PeriodSelector";
import { MonthlyOverview } from "@/components/monthly-report/MonthlyOverview";
import { SubmissionsTable } from "@/components/monthly-report/SubmissionsTable";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const MonthlyReport = () => {
  const currentDate = new Date();
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);

  const { data: submissions = [], isLoading } = useQuery({
    queryKey: ['communication-submissions', selectedYear],
    queryFn: async () => {
      const startOfYear = new Date(selectedYear, 0, 1);
      const endOfYear = new Date(selectedYear, 11, 31, 23, 59, 59);
      
      const { data, error } = await supabase
        .from('communication_submissions')
        .select(`
          *,
          communication_type:communication_types(name),
          profile:profiles(full_name)
        `)
        .gte('submission_date', startOfYear.toISOString())
        .lte('submission_date', endOfYear.toISOString());

      if (error) {
        console.error('Error fetching submissions:', error);
        toast.error('Erro ao carregar submissões');
        throw error;
      }

      return data;
    },
  });

  const filteredSubmissions = selectedMonth !== null
    ? submissions.filter(submission => {
        const submissionDate = new Date(submission.submission_date);
        return submissionDate.getMonth() === selectedMonth;
      })
    : [];

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
      
      <div className="space-y-8">
        <PeriodSelector
          selectedYear={selectedYear}
          onYearChange={(value) => {
            setSelectedYear(parseInt(value));
            setSelectedMonth(null);
          }}
        />

        <MonthlyOverview
          selectedYear={selectedYear}
          submissions={submissions}
          onMonthSelect={setSelectedMonth}
          selectedMonth={selectedMonth}
        />

        {selectedMonth !== null && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">
              {format(new Date(selectedYear, selectedMonth), "MMMM 'de' yyyy", { locale: ptBR })}
            </h2>
            <div className="bg-white/50 backdrop-blur-sm rounded-lg p-6 shadow-sm">
              <SubmissionsTable submissions={filteredSubmissions} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MonthlyReport;