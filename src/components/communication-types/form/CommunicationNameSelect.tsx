import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface CommunicationNameSelectProps {
  name: string;
  customName: string;
  onNameChange: (value: string) => void;
  onCustomNameChange: (value: string) => void;
}

export const CommunicationNameSelect = ({
  name,
  onNameChange,
}: CommunicationNameSelectProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="name">Nome da Comunicação</Label>
      <Input
        id="name"
        value={name}
        onChange={(e) => onNameChange(e.target.value)}
        placeholder="Digite o nome da comunicação"
        className="bg-white"
      />
    </div>
  );
};