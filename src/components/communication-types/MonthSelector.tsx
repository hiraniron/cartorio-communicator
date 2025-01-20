import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface MonthSelectorProps {
  selectedMonths: Date[];
  setSelectedMonths: (dates: Date[]) => void;
}

export const MonthSelector = ({ selectedMonths, setSelectedMonths }: MonthSelectorProps) => {
  return (
    <div className="space-y-2">
      <Label>Meses de Ocorrência</Label>
      <div className="border rounded-md p-2">
        <Calendar
          mode="multiple"
          selected={selectedMonths}
          onSelect={(dates) => {
            if (dates) {
              setSelectedMonths(Array.isArray(dates) ? dates : [dates]);
            }
          }}
          locale={ptBR}
          disabled={(date) => {
            return date.getDate() !== 1;
          }}
          modifiersStyles={{
            selected: {
              backgroundColor: "var(--primary)",
              color: "white",
            },
          }}
          ISOWeek={true}
          showOutsideDays={false}
          fixedWeeks={false}
          showWeekNumber={false}
        />
      </div>
      <div className="mt-2 text-sm text-muted-foreground">
        Meses selecionados:{" "}
        {selectedMonths
          .map((date) => format(date, "MMMM", { locale: ptBR }))
          .join(", ")}
      </div>
    </div>
  );
};