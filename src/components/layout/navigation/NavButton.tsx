import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface NavButtonProps {
  to: string;
  icon: LucideIcon;
  label: string;
  isActive: boolean;
}

export const NavButton = ({ to, icon: Icon, label, isActive }: NavButtonProps) => {
  return (
    <Link to={to}>
      <Button 
        variant={isActive ? "default" : "ghost"}
        className="gap-2"
      >
        <Icon className="h-4 w-4" />
        {label}
      </Button>
    </Link>
  );
};