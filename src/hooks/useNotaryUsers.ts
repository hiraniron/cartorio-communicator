import { useState } from "react";
import { User } from "@/types/user";
import { useFetchUsers } from "./user-management/useFetchUsers";
import { useUserMutations } from "./user-management/useUserMutations";

export function useNotaryUsers(notaryOfficeId: string | undefined) {
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const { 
    data: users, 
    isLoading, 
    error, 
    refetch 
  } = useFetchUsers(notaryOfficeId);

  const { 
    handleAddUser, 
    handleEditUser, 
    handleDeleteUser 
  } = useUserMutations(notaryOfficeId, () => {
    setEditingUser(null);
    setIsSheetOpen(false);
    refetch();
  });

  return {
    users,
    isLoading,
    error,
    editingUser,
    setEditingUser,
    isSheetOpen,
    setIsSheetOpen,
    handleAddUser,
    handleEditUser: (data: any) => handleEditUser(editingUser?.id || '', data),
    handleDeleteUser,
  };
}