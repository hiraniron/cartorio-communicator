import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate("/auth");
      }
    };

    checkSession();
  }, [navigate]);

  const handleStartCommunications = () => {
    navigate("/dashboard");
  };

  return (
    <div className="max-w-4xl mx-auto mt-12">
      <Card className="p-8 space-y-6">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-display font-bold text-gray-900">
            Bem-vindo ao Sistema de Comunicações
          </h1>
          <p className="text-xl text-gray-600">
            Gerencie todas as suas comunicações legais em um só lugar
          </p>
        </div>

        <div className="flex justify-center">
          <Button
            onClick={handleStartCommunications}
            className="text-xl px-8 py-6 hover-scale bg-[#1EAEDB] hover:bg-[#0FA0CE] shadow-lg"
            size="lg"
          >
            Iniciar Comunicações
            <ArrowRight className="ml-3 h-6 w-6" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <Card className="p-6 space-y-3 hover-scale">
            <h3 className="text-lg font-semibold">Gestão Simplificada</h3>
            <p className="text-gray-600">
              Acompanhe todas as suas comunicações de forma organizada
            </p>
          </Card>
          
          <Card className="p-6 space-y-3 hover-scale">
            <h3 className="text-lg font-semibold">Prazos em Dia</h3>
            <p className="text-gray-600">
              Receba lembretes e nunca perca um prazo importante
            </p>
          </Card>
          
          <Card className="p-6 space-y-3 hover-scale">
            <h3 className="text-lg font-semibold">Documentação Segura</h3>
            <p className="text-gray-600">
              Armazene seus documentos de forma segura e organizada
            </p>
          </Card>
        </div>
      </Card>
    </div>
  );
};

export default Index;