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
    <div>
      <div>
        <div>
          <AlertCircle />
        </div>
        <div>
          <p>Pendentes</p>
          <p>{stats.pending}</p>
        </div>
      </div>
      
      <div>
        <div>
          <Clock />
        </div>
        <div>
          <p>No Prazo</p>
          <p>{stats.onTime}</p>
        </div>
      </div>
      
      <div>
        <div>
          <AlertCircle />
        </div>
        <div>
          <p>Atrasadas</p>
          <p>{stats.late}</p>
        </div>
      </div>

      <div>
        <div>
          <Calendar />
        </div>
        <div>
          <p>Total</p>
          <p>{stats.total}</p>
        </div>
      </div>
    </div>
  );
};