import { Database } from "@/integrations/supabase/types";

export type ProfileType = Database['public']['Tables']['profiles']['Row'];

export interface User extends ProfileType {
  id: string;
  full_name: string;
  role: "admin" | "staff";
  email?: string;
}

export type UserFormData = {
  email: string;
  password?: string;
  fullName: string;
  role: "admin" | "staff";
};