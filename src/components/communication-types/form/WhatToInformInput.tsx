import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface WhatToInformInputProps {
  whatToInform: string;
  onWhatToInformChange: (value: string) => void;
}

export const WhatToInformInput = ({
  whatToInform,
  onWhatToInformChange,
}: WhatToInformInputProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="whatToInform">O que informar</Label>
      <Textarea
        id="whatToInform"
        value={whatToInform}
        onChange={(e) => onWhatToInformChange(e.target.value)}
        placeholder="Descreva quais informações devem ser fornecidas"
      />
    </div>
  );
};