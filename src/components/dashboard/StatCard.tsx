import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  icon: LucideIcon;
  title: string;
  value: number;
  iconClassName?: string;
  iconContainerClassName?: string;
}

export const StatCard = ({
  icon: Icon,
  title,
  value,
  iconClassName,
  iconContainerClassName,
}: StatCardProps) => {
  return (
    <Card className="glass-card p-6 hover-scale">
      <div className="flex items-center space-x-4">
        <div className={`p-3 rounded-full ${iconContainerClassName}`}>
          <Icon className={`w-6 h-6 ${iconClassName}`} />
        </div>
        <div>
          <h3 className="text-sm font-medium">{title}</h3>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      </div>
    </Card>
  );
};