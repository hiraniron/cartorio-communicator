import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface MonthSelectorProps {
  selectedMonths: Date[];
  setSelectedMonths: (dates: Date[]) => void;
}

export const MonthSelector = ({ selectedMonths, setSelectedMonths }: MonthSelectorProps) => {
  const months = Array.from({ length: 12 }, (_, i) => {
    const date = new Date(2024, i, 1);
    return {
      date,
      name: format(date, "MMMM", { locale: ptBR }),
    };
  });

  const toggleMonth = (date: Date) => {
    const isSelected = selectedMonths.some(
      (selectedDate) => selectedDate.getMonth() === date.getMonth()
    );

    if (isSelected) {
      setSelectedMonths(
        selectedMonths.filter(
          (selectedDate) => selectedDate.getMonth() !== date.getMonth()
        )
      );
    } else {
      setSelectedMonths([...selectedMonths, date]);
    }
  };

  return (
    <div className="space-y-2">
      <Label>Meses de Ocorrência</Label>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {months.map(({ date, name }) => {
          const isSelected = selectedMonths.some(
            (selectedDate) => selectedDate.getMonth() === date.getMonth()
          );

          return (
            <Button
              key={name}
              type="button"
              variant={isSelected ? "default" : "outline"}
              className={cn(
                "w-full capitalize",
                isSelected ? "bg-primary text-primary-foreground" : ""
              )}
              onClick={() => toggleMonth(date)}
            >
              {name}
            </Button>
          );
        })}
      </div>
    </div>
  );
};