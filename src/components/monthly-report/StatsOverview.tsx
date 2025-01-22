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
    <div className="grid grid-cols-4 gap-4 bg-black/90 p-4 rounded-lg">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-full bg-white/10">
          <AlertCircle className="h-5 w-5 text-white" />
        </div>
        <div>
          <p className="text-sm text-white/60">Pendentes</p>
          <p className="text-xl font-bold text-white">{stats.pending}</p>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-full bg-green-500/20">
          <Clock className="h-5 w-5 text-green-500" />
        </div>
        <div>
          <p className="text-sm text-white/60">No Prazo</p>
          <p className="text-xl font-bold text-white">{stats.onTime}</p>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-full bg-red-500/20">
          <AlertCircle className="h-5 w-5 text-red-500" />
        </div>
        <div>
          <p className="text-sm text-white/60">Atrasadas</p>
          <p className="text-xl font-bold text-white">{stats.late}</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="p-2 rounded-full bg-blue-500/20">
          <Calendar className="h-5 w-5 text-blue-500" />
        </div>
        <div>
          <p className="text-sm text-white/60">Total</p>
          <p className="text-xl font-bold text-white">{stats.total}</p>
        </div>
      </div>
    </div>
  );
};