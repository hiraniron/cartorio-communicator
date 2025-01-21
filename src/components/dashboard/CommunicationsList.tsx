import type { CommunicationType } from "@/types/communication";
import { CommunicationCard } from "./CommunicationCard";

interface CommunicationsListProps {
  communications: CommunicationType[];
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (id: string) => void;
}

export const CommunicationsList = ({
  communications,
  onFileUpload,
  onSubmit,
}: CommunicationsListProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-display font-semibold">Comunicações</h2>
      <div className="grid gap-6">
        {communications.map((comm) => (
          <CommunicationCard
            key={comm.id}
            communication={comm}
            onFileUpload={onFileUpload}
            onSubmit={onSubmit}
          />
        ))}
      </div>
    </div>
  );
};