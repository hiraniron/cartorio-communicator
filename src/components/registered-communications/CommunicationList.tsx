import { CommunicationCard } from "./CommunicationCard";
import type { CommunicationType } from "@/types/communication";

interface CommunicationListProps {
  communications: CommunicationType[];
  onDelete: (id: string) => void;
}

export const CommunicationList = ({
  communications,
  onDelete,
}: CommunicationListProps) => {
  if (communications.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Nenhuma comunicação cadastrada</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      {communications.map((comm) => (
        <CommunicationCard
          key={comm.id}
          communication={comm}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};