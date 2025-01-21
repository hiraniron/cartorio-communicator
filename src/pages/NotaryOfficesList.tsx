import { useState } from "react";
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
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Edit, UserPlus, Users } from "lucide-react";
import { UserRegistrationForm } from "@/components/notary-registration/UserRegistrationForm";
import { NotaryOfficeForm } from "@/components/notary-registration/NotaryOfficeForm";
import { toast } from "sonner";

export default function NotaryOfficesList() {
  const [selectedNotaryId, setSelectedNotaryId] = useState<string | null>(null);
  const [showUserForm, setShowUserForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showUsersList, setShowUsersList] = useState(false);

  const { data: notaryOffices, refetch } = useQuery({
    queryKey: ["notaryOffices"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("notary_offices")
        .select("*");
      if (error) throw error;
      return data;
    },
  });

  const { data: users } = useQuery({
    queryKey: ["users", selectedNotaryId],
    queryFn: async () => {
      if (!selectedNotaryId) return [];
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("notary_office_id", selectedNotaryId);
      if (error) throw error;
      return data;
    },
    enabled: !!selectedNotaryId && showUsersList,
  });

  const handleAddUser = async (data: any) => {
    try {
      const { error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
      });
      if (authError) throw authError;

      toast.success("Usuário cadastrado com sucesso!");
      setShowUserForm(false);
    } catch (error) {
      toast.error("Erro ao cadastrar usuário");
      console.error(error);
    }
  };

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

  return (
    <div className="container mx-auto py-6">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-6">Lista de Cartórios</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Cidade</TableHead>
              <TableHead>Telefone</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {notaryOffices?.map((notary) => (
              <TableRow key={notary.id}>
                <TableCell>{notary.name}</TableCell>
                <TableCell>{notary.city}</TableCell>
                <TableCell>{notary.phone}</TableCell>
                <TableCell className="space-x-2">
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => {
                          setSelectedNotaryId(notary.id);
                          setShowEditForm(true);
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </SheetTrigger>
                    <SheetContent>
                      <SheetHeader>
                        <SheetTitle>Editar Cartório</SheetTitle>
                      </SheetHeader>
                      {showEditForm && (
                        <NotaryOfficeForm
                          onSubmit={handleEditNotary}
                          onBack={() => setShowEditForm(false)}
                        />
                      )}
                    </SheetContent>
                  </Sheet>

                  <Sheet>
                    <SheetTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => {
                          setSelectedNotaryId(notary.id);
                          setShowUsersList(true);
                        }}
                      >
                        <Users className="h-4 w-4" />
                      </Button>
                    </SheetTrigger>
                    <SheetContent>
                      <SheetHeader>
                        <SheetTitle>Usuários do Cartório</SheetTitle>
                      </SheetHeader>
                      <div className="mt-4">
                        <Button
                          onClick={() => setShowUserForm(true)}
                          className="mb-4"
                        >
                          <UserPlus className="h-4 w-4 mr-2" />
                          Adicionar Usuário
                        </Button>
                        {showUserForm ? (
                          <UserRegistrationForm
                            onSubmit={handleAddUser}
                            onBack={() => setShowUserForm(false)}
                          />
                        ) : (
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
                        )}
                      </div>
                    </SheetContent>
                  </Sheet>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}