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
    <div className="grid grid-cols-4 gap-4">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-full bg-[#E5DEFF]">
          <AlertCircle className="h-5 w-5 text-[#6E59A5]" />
        </div>
        <div>
          <p className="text-sm text-white/80">Pendentes</p>
          <p className="text-xl font-bold text-white">{stats.pending}</p>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-full bg-[#F2FCE2]">
          <Clock className="h-5 w-5 text-green-600" />
        </div>
        <div>
          <p className="text-sm text-white/80">No Prazo</p>
          <p className="text-xl font-bold text-white">{stats.onTime}</p>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-full bg-[#FEC6A1]">
          <AlertCircle className="h-5 w-5 text-red-600" />
        </div>
        <div>
          <p className="text-sm text-white/80">Atrasadas</p>
          <p className="text-xl font-bold text-white">{stats.late}</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="p-2 rounded-full bg-[#FEF7CD]">
          <Calendar className="h-5 w-5 text-[#7E69AB]" />
        </div>
        <div>
          <p className="text-sm text-white/80">Total</p>
          <p className="text-xl font-bold text-white">{stats.total}</p>
        </div>
      </div>
    </div>
  );
};