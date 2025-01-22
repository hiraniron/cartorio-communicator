import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { CheckCircle, AlertCircle, Clock } from "lucide-react";
import { PeriodSelector } from "@/components/dashboard/PeriodSelector";

const MonthlyReport = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<{ month: string; year: string } | null>(null);

  const { data: submissions = [], isLoading } = useQuery({
    queryKey: ['communication-submissions', selectedPeriod],
    queryFn: async () => {
      if (!selectedPeriod) return [];

      const startOfMonth = new Date(
        parseInt(selectedPeriod.year),
        parseInt(selectedPeriod.month) - 1,
        1
      );
      const endOfMonth = new Date(
        parseInt(selectedPeriod.year),
        parseInt(selectedPeriod.month),
        0
      );
      
      const { data, error } = await supabase
        .from('communication_submissions')
        .select(`
          *,
          communication_type:communication_types(name),
          profile:profiles(full_name)
        `)
        .gte('submission_date', startOfMonth.toISOString())
        .lte('submission_date', endOfMonth.toISOString());

      if (error) {
        console.error('Error fetching submissions:', error);
        toast.error('Erro ao carregar submissões');
        throw error;
      }

      return data;
    },
    enabled: !!selectedPeriod,
  });

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

  const stats = {
    onTime: submissions.filter(s => s.status === 'on_time').length,
    late: submissions.filter(s => s.status === 'late').length,
    pending: submissions.filter(s => s.status === 'pending').length,
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Relatório Mensal</h1>
      </div>

      <div className="bg-white/50 backdrop-blur-sm rounded-lg p-6 shadow-sm">
        <div className="mb-8">
          <PeriodSelector 
            onPeriodSelected={(month, year) => setSelectedPeriod({ month, year })}
            showContinueButton={false}
          />
        </div>

        {selectedPeriod && (
          <>
            <h2 className="text-xl font-semibold mb-6">
              Relatório de {format(new Date(parseInt(selectedPeriod.year), parseInt(selectedPeriod.month) - 1), "MMMM 'de' yyyy", { locale: ptBR })}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <Card className="p-4 flex items-center space-x-4">
                <CheckCircle className="h-8 w-8 text-green-500" />
                <div>
                  <p className="text-sm text-gray-500">No Prazo</p>
                  <p className="text-2xl font-bold">{stats.onTime}</p>
                </div>
              </Card>
              
              <Card className="p-4 flex items-center space-x-4">
                <AlertCircle className="h-8 w-8 text-red-500" />
                <div>
                  <p className="text-sm text-gray-500">Atrasadas</p>
                  <p className="text-2xl font-bold">{stats.late}</p>
                </div>
              </Card>
              
              <Card className="p-4 flex items-center space-x-4">
                <Clock className="h-8 w-8 text-yellow-500" />
                <div>
                  <p className="text-sm text-gray-500">Pendentes</p>
                  <p className="text-2xl font-bold">{stats.pending}</p>
                </div>
              </Card>
            </div>

            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <div className="text-gray-500">Carregando...</div>
              </div>
            ) : (
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
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MonthlyReport;