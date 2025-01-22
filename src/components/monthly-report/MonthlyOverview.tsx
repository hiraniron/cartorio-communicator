import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CheckSquare, Calendar, ChevronDown, ChevronUp } from "lucide-react";
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

    return monthSubmissions.every(submission => submission.status === 'on_time');
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {months.map(({ month, name }) => {
        const isSelected = selectedMonth === month;
        const isOk = isMonthOk(month);

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
              {isOk && <CheckSquare className="h-4 w-4 text-green-500" />}
              {isSelected ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </div>
          </Button>
        );
      })}
    </div>
  );
};