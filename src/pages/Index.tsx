import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface CommunicationType {
  id: string;
  name: string;
  custom_name: string | null;
  description: string;
  what_to_inform: string;
  deadlines: number[];
  selected_months: string[];
  year: number;
}

const Index = () => {
  const [communications, setCommunications] = useState<CommunicationType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCommunications = async () => {
      try {
        const { data, error } = await supabase
          .from("communication_types")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;
        setCommunications(data || []);
      } catch (error) {
        console.error("Error fetching communications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCommunications();

    // Subscribe to changes
    const channel = supabase
      .channel("schema-db-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "communication_types",
        },
        () => {
          fetchCommunications();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Carregando comunicações...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">COMUNICAÇÕES OBRIGATÓRIAS</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {communications.map((comm) => (
          <Card key={comm.id} className="p-6 space-y-4">
            <h2 className="text-xl font-semibold">
              {comm.name === "outros" ? comm.custom_name : comm.name}
            </h2>
            <p className="text-gray-600">{comm.description}</p>
            <div>
              <h3 className="font-medium mb-2">O que informar:</h3>
              <p className="text-gray-600">{comm.what_to_inform}</p>
            </div>
            <div>
              <h3 className="font-medium mb-2">Prazos:</h3>
              <p className="text-gray-600">
                Dias: {comm.deadlines.join(", ")}
              </p>
              <p className="text-gray-600">
                Meses:{" "}
                {comm.selected_months
                  .map((month) => {
                    try {
                      return format(new Date(month), "MMMM", { locale: ptBR });
                    } catch (error) {
                      console.error("Error formatting month:", month);
                      return month;
                    }
                  })
                  .join(", ")}
              </p>
              <p className="text-gray-600">Ano: {comm.year}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Index;