import { Loader2, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { User } from "@/types/user";

interface UsersListProps {
  users: User[] | null;
  isLoading: boolean;
  onEdit: (user: User) => void;
  onDelete: (userId: string) => void;
}

export function UsersList({ users, isLoading, onEdit, onDelete }: UsersListProps) {
  if (isLoading) {
    return (
      <TableRow>
        <TableCell colSpan={3} className="text-center py-8">
          <div className="flex items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin mr-2" />
            Carregando usuários...
          </div>
        </TableCell>
      </TableRow>
    );
  }

  if (!users || users.length === 0) {
    return (
      <TableRow>
        <TableCell colSpan={3} className="text-center py-8 text-muted-foreground">
          Nenhum usuário cadastrado
        </TableCell>
      </TableRow>
    );
  }

  return (
    <>
      {users.map((user) => (
        <TableRow key={user.id}>
          <TableCell>{user.full_name}</TableCell>
          <TableCell className="capitalize">{user.role}</TableCell>
          <TableCell className="text-right">
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => onEdit(user)}
              >
                <Pencil className="h-4 w-4" />
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
                    <AlertDialogDescription>
                      Tem certeza que deseja excluir o usuário {user.full_name}? Esta ação não pode ser desfeita.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => onDelete(user.id)}
                    >
                      Excluir
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}