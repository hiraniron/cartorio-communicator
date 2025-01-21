import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Paperclip } from "lucide-react";
import type { CommunicationType } from "@/types/communication";

interface CommunicationCardProps {
  communication: CommunicationType;
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (id: string) => void;
}

export const CommunicationCard = ({
  communication: comm,
  onFileUpload,
  onSubmit,
}: CommunicationCardProps) => {
  return (
    <Card className="glass-card p-6 space-y-4">
      <div className="flex justify-between items-start">
        <div>
          <span className="text-sm font-medium text-gray-500">
            <span className="text-yellow-600 bg-yellow-100 px-2 py-1 rounded-full">
              Pendente
            </span>
          </span>
          <h3 className="text-xl font-semibold mt-2">
            {comm.name === 'outros' ? comm.custom_name : comm.name}
          </h3>
          <p className="text-gray-500 mt-1">{comm.description}</p>
          <p className="text-gray-500 mt-1">O que informar: {comm.what_to_inform}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Prazo</p>
          <p className="font-medium">
            {comm.deadlines.join(', ')} de cada mês
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <Input
          type="file"
          onChange={onFileUpload}
          className="flex-1"
          accept=".pdf,.doc,.docx"
        />
        <Button
          onClick={() => onSubmit(comm.id)}
          className="hover-scale"
        >
          <Paperclip className="w-4 h-4 mr-2" />
          Anexar
        </Button>
      </div>
    </Card>
  );
};