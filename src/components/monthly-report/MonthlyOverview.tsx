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
        return 'bg-[#F2FCE2] hover:bg-[#F2FCE2]/90'; // Verde para todas no prazo
      case 'late':
        return 'bg-[#D3E4FD] hover:bg-[#D3E4FD]/90'; // Azul para algumas atrasadas
      case 'pending':
        return 'bg-[#ea384c] hover:bg-[#ea384c]/90 text-white'; // Vermelho para pendentes
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
            className={`flex items-center justify-between p-4 ${
              isSelected ? 'border-primary' : ''
            } ${statusColor}`}
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