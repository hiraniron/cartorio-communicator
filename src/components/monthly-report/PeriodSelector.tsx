import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface PeriodSelectorProps {
  selectedMonth: number;
  selectedYear: number;
  onMonthChange: (value: string) => void;
  onYearChange: (value: string) => void;
}

const months = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

export const PeriodSelector = ({
  selectedMonth,
  selectedYear,
  onMonthChange,
  onYearChange
}: PeriodSelectorProps) => {
  const currentDate = new Date();
  const years = Array.from(
    { length: 5 },
    (_, i) => (currentDate.getFullYear() - 2 + i)
  );

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Mês</label>
        <Select
          value={selectedMonth.toString()}
          onValueChange={onMonthChange}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecione o mês" />
          </SelectTrigger>
          <SelectContent>
            {months.map((month, index) => (
              <SelectItem key={index} value={index.toString()}>
                {month}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Ano</label>
        <Select
          value={selectedYear.toString()}
          onValueChange={onYearChange}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecione o ano" />
          </SelectTrigger>
          <SelectContent>
            {years.map((year) => (
              <SelectItem key={year} value={year.toString()}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};