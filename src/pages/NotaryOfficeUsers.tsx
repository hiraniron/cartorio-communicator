import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UserPlus } from "lucide-react";
import { UserRegistrationForm } from "@/components/notary-registration/UserRegistrationForm";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { toast } from "sonner";

export default function NotaryOfficeUsers() {
  const { id } = useParams();

  const { data: users } = useQuery({
    queryKey: ["users", id],
    queryFn: async () => {
      if (!id) return [];
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("notary_office_id", id);
      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });

  const handleAddUser = async (data: any) => {
    try {
      const { error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
      });
      if (authError) throw authError;

      toast.success("Usuário cadastrado com sucesso!");
    } catch (error) {
      toast.error("Erro ao cadastrar usuário");
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto py-6">
      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Usuários do Cartório</h2>
          <Sheet>
            <SheetTrigger asChild>
              <Button>
                <UserPlus className="h-4 w-4 mr-2" />
                Adicionar Usuário
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Adicionar Novo Usuário</SheetTitle>
              </SheetHeader>
              <UserRegistrationForm onSubmit={handleAddUser} onBack={() => {}} />
            </SheetContent>
          </Sheet>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Função</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users?.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.full_name}</TableCell>
                <TableCell>{user.role}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}