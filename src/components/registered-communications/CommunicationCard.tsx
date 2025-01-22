import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Edit, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import type { CommunicationType } from "@/types/communication";

interface CommunicationCardProps {
  communication: CommunicationType;
  onDelete: (id: string) => void;
}

export const CommunicationCard = ({
  communication: comm,
  onDelete,
}: CommunicationCardProps) => {
  const handleDelete = () => {
    if (window.confirm('Tem certeza que deseja excluir esta comunicação?')) {
      onDelete(comm.id);
    }
  };

  return (
    <Card className="p-6 space-y-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-semibold">
            {comm.name}
          </h3>
          <p className="text-gray-500 mt-1">{comm.description}</p>
          <p className="text-gray-500 mt-1">O que informar: {comm.what_to_inform}</p>
          <div className="mt-2">
            <span className="text-sm font-medium">Prazos: </span>
            <span className="text-gray-600">{comm.deadlines.join(', ')} de cada mês</span>
          </div>
        </div>
        <div className="flex gap-2">
          <Link to={`/communication-types/edit/${comm.id}`}>
            <Button variant="outline" size="icon">
              <Edit className="h-4 w-4" />
            </Button>
          </Link>
          <Button variant="destructive" size="icon" onClick={handleDelete}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};