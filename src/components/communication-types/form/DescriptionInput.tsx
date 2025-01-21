import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface DescriptionInputProps {
  description: string;
  onDescriptionChange: (value: string) => void;
}

export const DescriptionInput = ({
  description,
  onDescriptionChange,
}: DescriptionInputProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="description">Descrição</Label>
      <Textarea
        id="description"
        value={description}
        onChange={(e) => onDescriptionChange(e.target.value)}
        placeholder="Descreva o tipo de comunicação"
      />
    </div>
  );
};