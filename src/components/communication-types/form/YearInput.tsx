import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface YearInputProps {
  year: string;
  onYearChange: (value: string) => void;
}

export const YearInput = ({ year, onYearChange }: YearInputProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="year">Ano</Label>
      <Input
        id="year"
        type="number"
        min="2024"
        max="2100"
        value={year}
        onChange={(e) => onYearChange(e.target.value)}
        placeholder="Ex: 2024"
      />
    </div>
  );
};