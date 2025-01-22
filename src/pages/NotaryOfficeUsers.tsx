import { useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
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

export default function NotaryOfficeUsers() {
  const { id } = useParams();
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

  const formattedUsers = users?.map(user => ({
    ...user,
    email: user.email || '', // Add email property
  }));

  return (
    <div className="container mx-auto py-6">
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
              users={formattedUsers}
              isLoading={isLoading}
              onEdit={(user) => {
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