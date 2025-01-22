import { Card } from "@/components/ui/card";
import { AlertOctagon, Clock, XOctagon, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

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
      <Card 
        className={cn(
          "p-6 backdrop-blur-sm shadow-sm transition-all duration-300",
          stats.pending > 0 
            ? "bg-red-50/50 ring-2 ring-red-500 animate-pulse" 
            : "bg-white/50"
        )}
      >
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-full bg-red-50">
            <AlertOctagon className="w-6 h-6 text-red-600" />
          </div>
          <div>
            <p className="text-sm text-black">Pendentes</p>
            <p className={cn(
              "text-2xl font-bold",
              stats.pending > 0 && "text-red-600"
            )}>
              {stats.pending}
            </p>
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-white/50 backdrop-blur-sm shadow-sm">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-full bg-green-50">
            <Clock className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <p className="text-sm text-black">No Prazo</p>
            <p className="text-2xl font-bold">{stats.onTime}</p>
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-white/50 backdrop-blur-sm shadow-sm">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-full bg-yellow-100">
            <XOctagon className="w-6 h-6 text-yellow-600" />
          </div>
          <div>
            <p className="text-sm text-black">Enviadas após prazo</p>
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
            <p className="text-sm text-black">Total</p>
            <p className="text-2xl font-bold">{stats.total}</p>
          </div>
        </div>
      </Card>
    </div>
  );
};