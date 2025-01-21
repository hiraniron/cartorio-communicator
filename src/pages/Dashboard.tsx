import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Calendar, Clock, Paperclip, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

interface CommunicationType {
  id: number;
  name: string;
  custom_name: string | null;
  description: string;
  what_to_inform: string;
  deadlines: string[];
  selected_months: Date[];
  year: string;
}

const Dashboard = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const { data: communications = [], isLoading } = useQuery({
    queryKey: ['communication-types'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('communication_types')
        .select('*');
      
      if (error) throw error;
      return data as CommunicationType[];
    },
  });

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      toast.success("Arquivo selecionado com sucesso!");
    }
  };

  const handleSubmit = (id: number) => {
    if (selectedFile) {
      toast.success("Comprovante enviado com sucesso!");
      setSelectedFile(null);
    } else {
      toast.error("Por favor, selecione um arquivo");
    }
  };

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  const pendingCount = communications.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto space-y-8 animate-in">
        <header className="space-y-2">
          <h1 className="text-4xl font-display font-bold">COMUNICAÇÕES OBRIGATÓRIAS</h1>
          <p className="text-gray-500">Gerencie suas comunicações legais</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="glass-card p-6 hover-scale">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <AlertCircle className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Pendentes</h3>
                <p className="text-2xl font-bold">{pendingCount}</p>
              </div>
            </div>
          </Card>

          <Card className="glass-card p-6 hover-scale">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-green-100 rounded-full">
                <Clock className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-medium">No Prazo</h3>
                <p className="text-2xl font-bold">{pendingCount}</p>
              </div>
            </div>
          </Card>

          <Card className="glass-card p-6 hover-scale">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-100 rounded-full">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium">Total</h3>
                <p className="text-2xl font-bold">{pendingCount}</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-display font-semibold">Comunicações</h2>
          
          <div className="grid gap-6">
            {communications.map((comm) => (
              <Card key={comm.id} className="glass-card p-6 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-sm font-medium text-gray-500">
                      <span className="text-yellow-600 bg-yellow-100 px-2 py-1 rounded-full">
                        Pendente
                      </span>
                    </span>
                    <h3 className="text-xl font-semibold mt-2">
                      {comm.name === 'outros' ? comm.custom_name : comm.name}
                    </h3>
                    <p className="text-gray-500 mt-1">{comm.description}</p>
                    <p className="text-gray-500 mt-1">O que informar: {comm.what_to_inform}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Prazo</p>
                    <p className="font-medium">
                      {comm.deadlines.join(', ')} de cada mês
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <Input
                    type="file"
                    onChange={handleFileUpload}
                    className="flex-1"
                    accept=".pdf,.doc,.docx"
                  />
                  <Button
                    onClick={() => handleSubmit(comm.id)}
                    className="hover-scale"
                  >
                    <Paperclip className="w-4 h-4 mr-2" />
                    Anexar
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;