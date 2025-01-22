import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface PeriodSelectorProps {
  selectedYear: number;
  onYearChange: (value: string) => void;
}

export const PeriodSelector = ({
  selectedYear,
  onYearChange
}: PeriodSelectorProps) => {
  const currentDate = new Date();
  const years = Array.from(
    { length: 5 },
    (_, i) => (currentDate.getFullYear() - 2 + i)
  );

  return (
    <div className="w-full max-w-xs mx-auto">
      <label className="text-sm font-medium">Ano</label>
      <Select
        value={selectedYear.toString()}
        onValueChange={onYearChange}
      >
        <SelectTrigger className="bg-white dark:bg-gray-800">
          <SelectValue placeholder="Selecione o ano" />
        </SelectTrigger>
        <SelectContent className="bg-white dark:bg-gray-800">
          {years.map((year) => (
            <SelectItem key={year} value={year.toString()}>
              {year}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};