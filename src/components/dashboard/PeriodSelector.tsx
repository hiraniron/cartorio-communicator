import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const months = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

interface PeriodSelectorProps {
  onPeriodChange?: (year: string, month: string) => void;
}

export const PeriodSelector = ({ onPeriodChange }: PeriodSelectorProps) => {
  const currentDate = new Date();
  // Get previous month (if current month is January, set to December and decrease year)
  const previousMonth = currentDate.getMonth() === 0 ? 12 : currentDate.getMonth();
  const previousMonthYear = currentDate.getMonth() === 0 
    ? currentDate.getFullYear() - 1 
    : currentDate.getFullYear();

  const [selectedMonth, setSelectedMonth] = useState(previousMonth.toString());
  const [selectedYear, setSelectedYear] = useState(previousMonthYear.toString());

  const years = Array.from(
    { length: 5 },
    (_, i) => (currentDate.getFullYear() - 2 + i).toString()
  );

  const handleSubmit = () => {
    if (onPeriodChange) {
      onPeriodChange(selectedYear, selectedMonth);
    }
  };

  return (
    <Card className="w-full p-6 space-y-6">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Selecione o Período</h2>
        <p className="text-gray-500">
          Escolha o mês e ano para visualizar as comunicações
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Mês</label>
          <Select
            value={selectedMonth}
            onValueChange={setSelectedMonth}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione o mês" />
            </SelectTrigger>
            <SelectContent>
              {months.map((month, index) => (
                <SelectItem key={index + 1} value={(index + 1).toString()}>
                  {month}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Ano</label>
          <Select
            value={selectedYear}
            onValueChange={setSelectedYear}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione o ano" />
            </SelectTrigger>
            <SelectContent>
              {years.map((year) => (
                <SelectItem key={year} value={year}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button
        onClick={handleSubmit}
        className="w-full"
      >
        Filtrar
      </Button>
    </Card>
  );
};