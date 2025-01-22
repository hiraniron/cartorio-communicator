export interface CommunicationSubmissionsTable {
  Row: {
    id: string;
    communication_type_id: string;
    profile_id: string;
    notary_office_id: string;
    submission_date: string;
    original_deadline: string;
    status: string;
    created_at: string;
    updated_at: string;
  }
  Insert: {
    id?: string;
    communication_type_id: string;
    profile_id: string;
    notary_office_id: string;
    submission_date?: string;
    original_deadline: string;
    status: string;
    created_at?: string;
    updated_at?: string;
  }
  Update: {
    id?: string;
    communication_type_id?: string;
    profile_id?: string;
    notary_office_id?: string;
    submission_date?: string;
    original_deadline?: string;
    status?: string;
    created_at?: string;
    updated_at?: string;
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
    }
  ]
}