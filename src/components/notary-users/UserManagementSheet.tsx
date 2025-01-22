import { UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from "@/components/ui/sheet";
import { UserRegistrationForm } from "@/components/notary-registration/UserRegistrationForm";

interface User {
  id: string;
  full_name: string;
  role: "admin" | "staff";
  email: string;
}

interface UserManagementSheetProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  editingUser: User | null;
  onSubmit: (data: any) => void;
  onBack: () => void;
}

export function UserManagementSheet({
  isOpen,
  onOpenChange,
  editingUser,
  onSubmit,
  onBack,
}: UserManagementSheetProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <Button>
          <UserPlus className="h-4 w-4 mr-2" />
          Adicionar Usuário
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            {editingUser ? "Editar Usuário" : "Adicionar Novo Usuário"}
          </SheetTitle>
          <SheetDescription>
            {editingUser 
              ? "Faça as alterações necessárias nos dados do usuário."
              : "Preencha os dados para adicionar um novo usuário ao cartório."
            }
          </SheetDescription>
        </SheetHeader>
        <UserRegistrationForm 
          onSubmit={onSubmit}
          onBack={onBack}
          initialData={editingUser ? {
            email: editingUser.email,
            fullName: editingUser.full_name,
            role: editingUser.role as "admin" | "staff"
          } : undefined}
        />
      </SheetContent>
    </Sheet>
  );
}