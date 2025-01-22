import { Card } from "@/components/ui/card";
import { AlertOctagon, Clock, XOctagon, Calendar } from "lucide-react";

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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card className="p-6 bg-white/50 backdrop-blur-sm shadow-sm">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-full bg-red-50">
            <AlertOctagon className="w-6 h-6 text-gray-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Pendentes</p>
            <p className="text-2xl font-bold">{stats.pending}</p>
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-white/50 backdrop-blur-sm shadow-sm">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-full bg-gray-100">
            <Clock className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">No Prazo</p>
            <p className="text-2xl font-bold">{stats.onTime}</p>
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-white/50 backdrop-blur-sm shadow-sm">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-full bg-gray-100">
            <XOctagon className="w-6 h-6 text-red-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Atrasadas</p>
            <p className="text-2xl font-bold">{stats.late}</p>
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-white/50 backdrop-blur-sm shadow-sm">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-full bg-blue-50">
            <Calendar className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Total</p>
            <p className="text-2xl font-bold">{stats.total}</p>
          </div>
        </div>
      </Card>
    </div>
  );
};