export interface CommunicationTypesTable {
  Row: {
    created_at: string
    custom_name: string | null
    deadlines: number[]
    description: string
    id: string
    name: string
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
    selected_months?: string[]
    updated_at?: string
    what_to_inform?: string
  }
  Relationships: []
}