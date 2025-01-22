import { XCircle, Calendar, Clock, AlertCircle } from "lucide-react";
import { StatCard } from "./StatCard";

interface StatsOverviewProps {
  pendingCount: number;
}

export const StatsOverview = ({ pendingCount }: StatsOverviewProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        icon={XCircle}
        title="Pendentes"
        value={pendingCount}
        iconClassName="text-primary"
        iconContainerClassName="bg-primary/10"
      />
      <StatCard
        icon={Clock}
        title="No Prazo"
        value={pendingCount}
        iconClassName="text-green-600"
        iconContainerClassName="bg-green-100"
      />
      <StatCard
        icon={AlertCircle}
        title="Atrasadas"
        value={pendingCount}
        iconClassName="text-red-600"
        iconContainerClassName="bg-red-100"
      />
      <StatCard
        icon={Calendar}
        title="Total"
        value={pendingCount}
        iconClassName="text-blue-600"
        iconContainerClassName="bg-blue-100"
      />
    </div>
  );
};