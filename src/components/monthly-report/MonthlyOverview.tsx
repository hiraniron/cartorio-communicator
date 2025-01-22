import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CheckSquare, Calendar, ChevronDown, ChevronUp, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MonthlyOverviewProps {
  selectedYear: number;
  submissions: any[];
  onMonthSelect: (month: number) => void;
  selectedMonth: number | null;
}

export const MonthlyOverview = ({ 
  selectedYear, 
  submissions,
  onMonthSelect,
  selectedMonth
}: MonthlyOverviewProps) => {
  const months = Array.from({ length: 12 }, (_, i) => {
    const date = new Date(selectedYear, i, 1);
    return {
      month: i,
      name: format(date, "MMMM", { locale: ptBR }),
    };
  });

  const isMonthOk = (month: number) => {
    const monthSubmissions = submissions.filter(submission => {
      const submissionDate = new Date(submission.submission_date);
      return submissionDate.getMonth() === month;
    });

    // Retorna false se não houver submissões no mês
    if (monthSubmissions.length === 0) return false;

    return monthSubmissions.every(submission => submission.status === 'on_time');
  };

  const isMonthCompleted = (month: number) => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    // Se o ano selecionado for menor que o atual, todos os meses estão completos
    if (selectedYear < currentYear) return true;
    
    // Se o ano selecionado for maior que o atual, nenhum mês está completo
    if (selectedYear > currentYear) return false;
    
    // Se estamos no ano atual, verifica se o mês já passou
    return month < currentMonth;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {months.map(({ month, name }) => {
        const isSelected = selectedMonth === month;
        const isOk = isMonthOk(month);
        const completed = isMonthCompleted(month);

        return (
          <Button
            key={month}
            variant="outline"
            className={`flex items-center justify-between p-4 ${
              isSelected ? 'border-primary' : ''
            }`}
            onClick={() => onMonthSelect(month)}
          >
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span className="capitalize">{name}</span>
            </div>
            <div className="flex items-center gap-2">
              {isOk ? (
                <CheckSquare className="h-4 w-4 text-green-500" />
              ) : (
                <AlertCircle className="h-4 w-4 text-yellow-500" />
              )}
              {!completed && (
                isSelected ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )
              )}
            </div>
          </Button>
        );
      })}
    </div>
  );
};