import { XCircle, Clock, AlertCircle, Coins } from "lucide-react";
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
        iconClassName="text-red-600"
        iconContainerClassName="bg-red-100"
      />
      <StatCard
        icon={AlertCircle}
        title="Enviadas Após Prazo"
        value={pendingCount}
        iconClassName="text-yellow-600"
        iconContainerClassName="bg-yellow-100"
      />
      <StatCard
        icon={Clock}
        title="No Prazo"
        value={pendingCount}
        iconClassName="text-green-600"
        iconContainerClassName="bg-green-100"
      />
      <StatCard
        icon={Coins}
        title="Total"
        value={pendingCount}
        iconClassName="text-blue-600"
        iconContainerClassName="bg-blue-100"
      />
    </div>
  );
};