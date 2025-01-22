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
      <div className="p-2 rounded-full bg-[#E5DEFF]">
        <AlertCircle className="h-5 w-5 text-[#6E59A5]" />
      </div>
      
      <div className="p-2 rounded-full bg-[#F2FCE2]">
        <Clock className="h-5 w-5 text-green-600" />
      </div>
      
      <div className="p-2 rounded-full bg-[#FEC6A1]">
        <AlertCircle className="h-5 w-5 text-red-600" />
      </div>

      <div className="p-2 rounded-full bg-[#FEF7CD]">
        <Calendar className="h-5 w-5 text-[#7E69AB]" />
      </div>
    </div>
  );
};