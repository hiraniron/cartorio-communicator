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
import { useState } from "react";
import { PdfTemplateEditor } from "./PdfTemplateEditor";
import type { CommunicationType } from "@/types/communication";

interface CommunicationTypeFormProps {
  initialData?: CommunicationType;
}

export const CommunicationTypeForm = ({ initialData }: CommunicationTypeFormProps) => {
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const {
    formState: {
      name,
      description,
      whatToInform,
      deadlines,
      selectedMonths,
      requiresPdf,
      pdfTemplate,
    },
    formHandlers: {
      setName,
      setDescription,
      setWhatToInform,
      setSelectedMonths,
      addDeadline,
      removeDeadline,
      updateDeadline,
      setRequiresPdf,
      setPdfTemplate,
    },
    handleSubmit,
  } = useCommunicationTypeForm(initialData);

  const handleRequiresPdfChange = (checked: boolean) => {
    setRequiresPdf(checked);
    if (checked && !pdfTemplate) {
      setIsEditorOpen(true);
    }
  };

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <CommunicationNameSelect
          name={name}
          onNameChange={setName}
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
            onCheckedChange={handleRequiresPdfChange}
          />
          <Label htmlFor="requires-pdf">Gerar ofício em PDF</Label>
          {requiresPdf && (
            <Button
              type="button"
              variant="outline"
              className="ml-4"
              onClick={() => setIsEditorOpen(true)}
            >
              Editar template
            </Button>
          )}
        </div>

        <Button type="submit" className="w-full">
          {initialData ? "Atualizar" : "Cadastrar"}
        </Button>

        <PdfTemplateEditor
          isOpen={isEditorOpen}
          onClose={() => setIsEditorOpen(false)}
          onSave={setPdfTemplate}
          initialContent={pdfTemplate}
        />
      </form>
    </Card>
  );
};