import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@/types/user";
import { Database } from "@/integrations/supabase/types";

type ProfileWithAuth = {
  id: string;
  full_name: string;
  role: "admin" | "staff";
  notary_office_id: string | null;
  created_at: string;
  updated_at: string;
  auth_user: {
    email: string;
  };
};

export function useFetchUsers(notaryOfficeId: string | undefined) {
  return useQuery({
    queryKey: ["users", notaryOfficeId],
    queryFn: async () => {
      if (!notaryOfficeId) return [];
      
      console.log("Fetching users for notary office:", notaryOfficeId);
      const { data, error } = await supabase
        .from('profiles')
        .select(`
          *,
          auth_user:users!profiles_id_fkey(email)
        `)
        .eq("notary_office_id", notaryOfficeId);

      if (error) {
        console.error("Error fetching users:", error);
        toast.error("Erro ao carregar usuários");
        throw error;
      }

      // Transform the data to include email at the top level
      const transformedData = (data as unknown as ProfileWithAuth[])
        .filter(profile => {
          if (!profile.auth_user?.email) {
            console.warn(`User ${profile.id} has no email address`);
            return false;
          }
          return true;
        })
        .map(profile => ({
          ...profile,
          email: profile.auth_user.email
        }));

      console.log("Fetched users:", transformedData);
      return transformedData;
    },
    enabled: !!notaryOfficeId,
    retry: 1,
    refetchOnWindowFocus: false
  });
}