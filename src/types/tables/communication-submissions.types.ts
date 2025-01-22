export interface CommunicationSubmissionsTable {
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
    }
  ]
}