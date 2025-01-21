import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, X } from "lucide-react";

interface DeadlinesInputProps {
  deadlines: string[];
  onDeadlineAdd: () => void;
  onDeadlineRemove: (index: number) => void;
  onDeadlineUpdate: (index: number, value: string) => void;
}

export const DeadlinesInput = ({
  deadlines,
  onDeadlineAdd,
  onDeadlineRemove,
  onDeadlineUpdate,
}: DeadlinesInputProps) => {
  return (
    <div className="space-y-2">
      <Label>Dia</Label>
      <div className="space-y-2">
        {deadlines.map((deadline, index) => (
          <div key={index} className="flex gap-2">
            <Input
              type="number"
              min="1"
              max="31"
              value={deadline}
              onChange={(e) => onDeadlineUpdate(index, e.target.value)}
              placeholder="Ex: 5"
            />
            {deadlines.length > 1 && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => onDeadlineRemove(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onDeadlineAdd}
          className="w-full"
        >
          <Plus className="h-4 w-4 mr-2" />
          Adicionar dia
        </Button>
      </div>
    </div>
  );
};