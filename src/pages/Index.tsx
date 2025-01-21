import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-display font-bold text-gray-900">
            Sistema de Comunicações do Cartório
          </h1>
          <p className="text-gray-600">
            Gerencie todas as comunicações obrigatórias do seu cartório
          </p>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Cartório Info Card */}
          <Card className="p-6 space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Informações do Cartório
            </h2>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">
                <span className="font-medium">Nome:</span> 2º Tabelionato de Notas
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Endereço:</span> Rua Principal, 123
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Cidade:</span> São Paulo
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Telefone:</span> (11) 1234-5678
              </p>
            </div>
          </Card>

          {/* Quick Actions Card */}
          <Card className="p-6 space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">Ações Rápidas</h2>
            <div className="space-y-4">
              <Button
                onClick={() => navigate("/dashboard")}
                className="w-full flex items-center justify-center gap-2 hover:scale-105 transition-transform"
              >
                <CalendarDays className="w-5 h-5" />
                Selecionar Período
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate("/communication-types")}
                className="w-full hover:scale-105 transition-transform"
              >
                Tipos de Comunicação
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate("/registered-communications")}
                className="w-full hover:scale-105 transition-transform"
              >
                Comunicações Registradas
              </Button>
            </div>
          </Card>
        </div>

        {/* Additional Info */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Sobre o Sistema
          </h2>
          <p className="text-gray-600">
            Este sistema foi desenvolvido para auxiliar cartórios no gerenciamento e
            controle de suas comunicações obrigatórias, garantindo o cumprimento de
            prazos e mantendo um histórico organizado de todas as comunicações
            realizadas.
          </p>
        </Card>
      </div>
    </div>
  );
};

export default Index;