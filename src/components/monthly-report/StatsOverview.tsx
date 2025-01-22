import { Card } from "@/components/ui/card";
import { CheckCircle, AlertCircle, Clock, Calendar } from "lucide-react";

interface StatsOverviewProps {
  stats: {
    onTime: number;
    late: number;
    pending: number;
    total: number;
  };
}

export const StatsOverview = ({ stats }: StatsOverviewProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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

      <Card className="p-4 flex items-center space-x-4">
        <Calendar className="h-8 w-8 text-blue-500" />
        <div>
          <p className="text-sm text-gray-500">Total</p>
          <p className="text-2xl font-bold">{stats.total}</p>
        </div>
      </Card>
    </div>
  );
};