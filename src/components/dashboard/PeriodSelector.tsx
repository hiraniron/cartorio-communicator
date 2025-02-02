import { useState } from "react";
import { useNavigate } from "react-router-dom";
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

export const PeriodSelector = () => {
  const navigate = useNavigate();
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
    navigate(`/dashboard/${selectedYear}/${selectedMonth}`);
  };

  return (
    <div className="p-6 flex items-center justify-center">
      <Card className="w-full max-w-md p-6 space-y-6 glass-card">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-display font-semibold">Selecione o Período</h1>
          <p className="text-gray-500">
            Escolha o mês e o ano do envio das comunicações
          </p>
        </div>

        <div className="space-y-4">
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

          <Button
            onClick={handleSubmit}
            className="w-full hover-scale"
          >
            Continuar
          </Button>
        </div>
      </Card>
    </div>
  );
};