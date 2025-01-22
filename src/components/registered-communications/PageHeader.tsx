import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

export const PageHeader = () => {
  return (
    <header className="flex justify-between items-center">
      <div className="space-y-2">
        <h1 className="text-4xl font-display font-bold">Comunicações Cadastradas</h1>
        <p className="text-gray-500">Gerencie suas comunicações cadastradas</p>
      </div>
    </header>
  );
};