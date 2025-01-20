import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const PageHeader = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold">Cadastro de Tipos de Comunicações</h1>
      <Button variant="outline" onClick={() => navigate("/dashboard")}>
        Voltar
      </Button>
    </div>
  );
};