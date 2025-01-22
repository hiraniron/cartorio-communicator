import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CheckCircle, AlertCircle, Clock } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Submission {
  id: string;
  status: string;
  communication_type: {
    name: string;
  };
  profile: {
    full_name: string;
  };
  submission_date: string;
  original_deadline: string;
}

interface SubmissionsTableProps {
  submissions: Submission[];
}

export const SubmissionsTable = ({ submissions }: SubmissionsTableProps) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'on_time':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'late':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      default:
        return null;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'on_time':
        return 'No prazo';
      case 'late':
        return 'Atrasado';
      case 'pending':
        return 'Pendente';
      default:
        return status;
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Status</TableHead>
          <TableHead>Comunicação</TableHead>
          <TableHead>Usuário</TableHead>
          <TableHead>Data de Envio</TableHead>
          <TableHead>Prazo Original</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {submissions.map((submission) => (
          <TableRow key={submission.id}>
            <TableCell className="flex items-center space-x-2">
              {getStatusIcon(submission.status)}
              <span>{getStatusText(submission.status)}</span>
            </TableCell>
            <TableCell>{submission.communication_type?.name}</TableCell>
            <TableCell>{submission.profile?.full_name}</TableCell>
            <TableCell>
              {submission.submission_date
                ? format(new Date(submission.submission_date), "dd/MM/yyyy", { locale: ptBR })
                : '-'}
            </TableCell>
            <TableCell>
              {format(new Date(submission.original_deadline), "dd/MM/yyyy", { locale: ptBR })}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};