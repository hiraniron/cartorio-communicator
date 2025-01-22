import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@/types/user";

type ProfileWithAuth = {
  id: string;
  full_name: string;
  role: "admin" | "staff";
  notary_office_id: string | null;
  created_at: string;
  updated_at: string;
  email?: string;
};

export function useFetchUsers(notaryOfficeId: string | undefined) {
  return useQuery({
    queryKey: ["users", notaryOfficeId],
    queryFn: async () => {
      if (!notaryOfficeId) return [];
      
      console.log("Fetching users for notary office:", notaryOfficeId);
      
      // First, get all profiles for the notary office
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('*')
        .eq('notary_office_id', notaryOfficeId);

      if (profilesError) {
        console.error("Error fetching profiles:", profilesError);
        toast.error("Erro ao carregar usuários");
        throw profilesError;
      }

      // Then, get the email addresses for these profiles
      const userEmails = await Promise.all(
        profiles.map(async (profile) => {
          const { data: userData, error: userError } = await supabase
            .from('users')
            .select('email')
            .eq('id', profile.id)
            .single();

          if (userError) {
            console.warn(`Could not fetch email for user ${profile.id}:`, userError);
            return null;
          }

          return {
            ...profile,
            email: userData?.email
          };
        })
      );

      // Filter out any profiles where we couldn't get the email
      const transformedData = userEmails
        .filter((profile): profile is ProfileWithAuth => {
          if (!profile?.email) {
            console.warn(`User ${profile?.id} has no email address`);
            return false;
          }
          return true;
        });

      console.log("Fetched users:", transformedData);
      return transformedData;
    },
    enabled: !!notaryOfficeId,
    retry: 1,
    refetchOnWindowFocus: false
  });
}