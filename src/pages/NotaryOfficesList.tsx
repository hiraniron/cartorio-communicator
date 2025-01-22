import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { NotaryOfficeForm } from "@/components/notary-registration/NotaryOfficeForm";
import { NotaryOfficesTable } from "@/components/notary-offices/NotaryOfficesTable";
import { toast } from "sonner";
import { NotaryOffice } from "@/types/notary";

export default function NotaryOfficesList() {
  const [selectedNotaryId, setSelectedNotaryId] = useState<string | null>(null);
  const [showEditForm, setShowEditForm] = useState(false);

  const { data: notaryOffices, refetch } = useQuery({
    queryKey: ["notaryOffices"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("notary_offices")
        .select("*");
      if (error) throw error;
      return data as NotaryOffice[];
    },
  });

  const handleEditNotary = async (data: any) => {
    try {
      const { error } = await supabase
        .from("notary_offices")
        .update(data)
        .eq("id", selectedNotaryId);
      
      if (error) throw error;
      
      toast.success("Cartório atualizado com sucesso!");
      setShowEditForm(false);
      refetch();
    } catch (error) {
      toast.error("Erro ao atualizar cartório");
      console.error(error);
    }
  };

  const handleEdit = (id: string) => {
    setSelectedNotaryId(id);
    setShowEditForm(true);
  };

  const selectedNotary = notaryOffices?.find(
    (office) => office.id === selectedNotaryId
  );

  return (
    <div className="container mx-auto py-6">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-6">Lista de Cartórios</h2>
        <NotaryOfficesTable 
          notaryOffices={notaryOffices || []} 
          onEdit={handleEdit}
        />
      </Card>

      <Sheet open={showEditForm} onOpenChange={setShowEditForm}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Editar Cartório</SheetTitle>
          </SheetHeader>
          {showEditForm && (
            <NotaryOfficeForm
              onSubmit={handleEditNotary}
              onBack={() => setShowEditForm(false)}
              initialData={selectedNotary}
            />
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}