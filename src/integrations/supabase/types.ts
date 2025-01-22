export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      communication_submissions: {
        Row: {
          communication_type_id: string
          created_at: string
          id: string
          notary_office_id: string
          original_deadline: string
          profile_id: string
          status: string
          submission_date: string
          updated_at: string
        }
        Insert: {
          communication_type_id: string
          created_at?: string
          id?: string
          notary_office_id: string
          original_deadline: string
          profile_id: string
          status: string
          submission_date?: string
          updated_at?: string
        }
        Update: {
          communication_type_id?: string
          created_at?: string
          id?: string
          notary_office_id?: string
          original_deadline?: string
          profile_id?: string
          status?: string
          submission_date?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "communication_submissions_communication_type_id_fkey"
            columns: ["communication_type_id"]
            isOneToOne: false
            referencedRelation: "communication_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "communication_submissions_notary_office_id_fkey"
            columns: ["notary_office_id"]
            isOneToOne: false
            referencedRelation: "notary_offices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "communication_submissions_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      communication_types: {
        Row: {
          created_at: string
          custom_name: string | null
          deadlines: number[]
          description: string
          id: string
          name: string
          requires_pdf: boolean | null
          selected_months: string[]
          updated_at: string
          what_to_inform: string
        }
        Insert: {
          created_at?: string
          custom_name?: string | null
          deadlines: number[]
          description: string
          id?: string
          name: string
          requires_pdf?: boolean | null
          selected_months: string[]
          updated_at?: string
          what_to_inform: string
        }
        Update: {
          created_at?: string
          custom_name?: string | null
          deadlines?: number[]
          description?: string
          id?: string
          name?: string
          requires_pdf?: boolean | null
          selected_months?: string[]
          updated_at?: string
          what_to_inform?: string
        }
        Relationships: []
      }
      notary_offices: {
        Row: {
          address: string
          city: string
          created_at: string
          id: string
          institutional_email: string
          name: string
          updated_at: string
        }
        Insert: {
          address: string
          city: string
          created_at?: string
          id?: string
          institutional_email?: string
          name: string
          updated_at?: string
        }
        Update: {
          address?: string
          city?: string
          created_at?: string
          id?: string
          institutional_email?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          email: string
          full_name: string
          id: string
          notary_office_id: string | null
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          full_name: string
          id: string
          notary_office_id?: string | null
          role: Database["public"]["Enums"]["user_role"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          full_name?: string
          id?: string
          notary_office_id?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_notary_office_id_fkey"
            columns: ["notary_office_id"]
            isOneToOne: false
            referencedRelation: "notary_offices"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      user_role: "admin" | "staff"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
