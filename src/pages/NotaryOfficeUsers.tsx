import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UsersList } from "@/components/notary-users/UsersList";
import { UserManagementSheet } from "@/components/notary-users/UserManagementSheet";
import { useNotaryUsers } from "@/hooks/useNotaryUsers";
import { User } from "@/types/user";

export default function NotaryOfficeUsers() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    users,
    isLoading,
    editingUser,
    setEditingUser,
    isSheetOpen,
    setIsSheetOpen,
    handleAddUser,
    handleEditUser,
    handleDeleteUser,
  } = useNotaryUsers(id);

  return (
    <div className="container mx-auto py-6">
      <Button
        variant="ghost"
        className="mb-6"
        onClick={() => navigate("/notary-offices")}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Voltar para Lista de Cartórios
      </Button>

      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Usuários do Cartório</h2>
          <UserManagementSheet
            isOpen={isSheetOpen}
            onOpenChange={setIsSheetOpen}
            editingUser={editingUser}
            onSubmit={editingUser ? handleEditUser : handleAddUser}
            onBack={() => {
              setEditingUser(null);
              setIsSheetOpen(false);
            }}
          />
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Função</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <UsersList
              users={users}
              isLoading={isLoading}
              onEdit={(user: User) => {
                setEditingUser(user);
                setIsSheetOpen(true);
              }}
              onDelete={handleDeleteUser}
            />
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}