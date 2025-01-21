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
import { UserPlus, Loader2 } from "lucide-react";
import { UserRegistrationForm } from "@/components/notary-registration/UserRegistrationForm";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { toast } from "sonner";

export default function NotaryOfficeUsers() {
  const { id } = useParams();

  const { data: users, isLoading, error } = useQuery({
    queryKey: ["users", id],
    queryFn: async () => {
      if (!id) return [];
      
      console.log("Fetching users for notary office:", id);
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("notary_office_id", id);

      if (error) {
        console.error("Error fetching users:", error);
        toast.error("Erro ao carregar usuários");
        throw error;
      }

      console.log("Fetched users:", data);
      return data || [];
    },
    enabled: !!id,
    retry: 1,
    refetchOnWindowFocus: false
  });

  const handleAddUser = async (data: any) => {
    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
      });

      if (authError) throw authError;
      if (!authData.user) throw new Error("No user data returned");

      console.log("Created auth user:", authData.user);

      const { error: profileError } = await supabase
        .from("profiles")
        .insert({
          id: authData.user.id,
          full_name: data.fullName,
          notary_office_id: id,
          role: data.role
        });

      if (profileError) {
        console.error("Error creating profile:", profileError);
        throw profileError;
      }

      toast.success("Usuário cadastrado com sucesso!");
    } catch (error) {
      console.error("Error adding user:", error);
      toast.error("Erro ao cadastrar usuário");
    }
  };

  if (error) {
    console.error("Query error:", error);
  }

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
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={2} className="text-center py-8">
                  <div className="flex items-center justify-center">
                    <Loader2 className="h-6 w-6 animate-spin mr-2" />
                    Carregando usuários...
                  </div>
                </TableCell>
              </TableRow>
            ) : users && users.length > 0 ? (
              users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.full_name}</TableCell>
                  <TableCell className="capitalize">{user.role}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={2} className="text-center py-8 text-muted-foreground">
                  Nenhum usuário cadastrado
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}