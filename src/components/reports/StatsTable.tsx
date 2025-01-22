import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { CommunicationType } from "@/types/communication";

interface StatsTableProps {
  communications: CommunicationType[];
}

export const StatsTable = ({ communications }: StatsTableProps) => {
  // Mock data for demonstration - in a real app, this would be calculated based on actual submissions
  const getStatus = (comm: CommunicationType) => {
    // Randomly assign status for demonstration
    const random = Math.random();
    if (random < 0.33) return "no-prazo";
    if (random < 0.66) return "fora-do-prazo";
    return "pendente";
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "no-prazo":
        return (
          <span className="text-green-600 bg-green-100 px-2 py-1 rounded-full text-sm">
            No prazo
          </span>
        );
      case "fora-do-prazo":
        return (
          <span className="text-red-600 bg-red-100 px-2 py-1 rounded-full text-sm">
            Fora do prazo
          </span>
        );
      default:
        return (
          <span className="text-yellow-600 bg-yellow-100 px-2 py-1 rounded-full text-sm">
            Pendente
          </span>
        );
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Descrição</TableHead>
            <TableHead>Prazos</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {communications.map((comm) => (
            <TableRow key={comm.id}>
              <TableCell className="font-medium">
                {comm.name === 'outros' ? comm.custom_name : comm.name}
              </TableCell>
              <TableCell>{comm.description}</TableCell>
              <TableCell>{comm.deadlines.join(', ')} de cada mês</TableCell>
              <TableCell>{getStatusLabel(getStatus(comm))}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};