import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar } from "lucide-react";
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

  const getMonthStatus = (month: number) => {
    // Verifica se o mês ainda não começou
    const currentDate = new Date();
    const monthDate = new Date(selectedYear, month, 1);
    if (monthDate > currentDate) return 'not_started';

    const monthSubmissions = submissions.filter(submission => {
      const submissionDate = new Date(submission.submission_date);
      return submissionDate.getMonth() === month;
    });

    // Se não houver submissões, retorna status pendente
    if (monthSubmissions.length === 0) return 'pending';

    const hasLateSubmissions = monthSubmissions.some(submission => submission.status === 'late');
    const hasPendingSubmissions = monthSubmissions.some(submission => submission.status === 'pending');

    if (hasPendingSubmissions) return 'pending';
    if (hasLateSubmissions) return 'late';
    return 'on_time';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on_time':
        return 'bg-green-50 hover:bg-green-100 text-green-600'; // Verde para "No Prazo"
      case 'late':
        return 'bg-yellow-100 hover:bg-yellow-200 text-yellow-600'; // Amarelo para "Enviadas Após Prazo"
      case 'pending':
        return 'bg-red-100 hover:bg-red-200 text-red-600'; // Vermelho para "Pendentes"
      case 'not_started':
        return 'bg-white hover:bg-gray-50 text-gray-600'; // Branco para meses que não começaram
      default:
        return '';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {months.map(({ month, name }) => {
        const isSelected = selectedMonth === month;
        const status = getMonthStatus(month);
        const statusColor = getStatusColor(status);

        return (
          <Button
            key={month}
            variant="outline"
            className={`
              flex items-center justify-between p-4 
              transition-all duration-200 ease-in-out
              ${isSelected ? 'ring-2 ring-primary ring-offset-2 scale-[1.02] shadow-lg' : ''}
              ${statusColor}
            `}
            onClick={() => onMonthSelect(month)}
          >
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span className="capitalize">{name}</span>
            </div>
          </Button>
        );
      })}
    </div>
  );
};