import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MonthSelector } from "./MonthSelector";
import { CommunicationNameSelect } from "./form/CommunicationNameSelect";
import { DescriptionInput } from "./form/DescriptionInput";
import { WhatToInformInput } from "./form/WhatToInformInput";
import { DeadlinesInput } from "./form/DeadlinesInput";
import { useCommunicationTypeForm } from "@/hooks/useCommunicationTypeForm";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import type { CommunicationType } from "@/types/communication";

interface CommunicationTypeFormProps {
  initialData?: CommunicationType;
}

export const CommunicationTypeForm = ({ initialData }: CommunicationTypeFormProps) => {
  const {
    formState: {
      name,
      customName,
      description,
      whatToInform,
      deadlines,
      selectedMonths,
      requiresPdf,
    },
    formHandlers: {
      setName,
      setCustomName,
      setDescription,
      setWhatToInform,
      setSelectedMonths,
      addDeadline,
      removeDeadline,
      updateDeadline,
      setRequiresPdf,
    },
    handleSubmit,
  } = useCommunicationTypeForm(initialData);

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <CommunicationNameSelect
          name={name}
          customName={customName}
          onNameChange={setName}
          onCustomNameChange={setCustomName}
        />

        <DescriptionInput
          description={description}
          onDescriptionChange={setDescription}
        />

        <WhatToInformInput
          whatToInform={whatToInform}
          onWhatToInformChange={setWhatToInform}
        />

        <DeadlinesInput
          deadlines={deadlines}
          onDeadlineAdd={addDeadline}
          onDeadlineRemove={removeDeadline}
          onDeadlineUpdate={updateDeadline}
        />

        <MonthSelector 
          selectedMonths={selectedMonths} 
          setSelectedMonths={setSelectedMonths} 
        />

        <div className="flex items-center space-x-2">
          <Switch
            id="requires-pdf"
            checked={requiresPdf}
            onCheckedChange={setRequiresPdf}
          />
          <Label htmlFor="requires-pdf">Gerar ofício em PDF</Label>
        </div>

        <Button type="submit" className="w-full">
          {initialData ? "Atualizar" : "Cadastrar"}
        </Button>
      </form>
    </Card>
  );
};