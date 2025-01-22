export interface CommunicationTypesTable {
  Row: {
    id: string;
    name: string;
    custom_name: string | null;
    description: string;
    what_to_inform: string;
    deadlines: number[];
    selected_months: string[];
    created_at: string;
    updated_at: string;
  }
  Insert: {
    id?: string;
    name: string;
    custom_name?: string | null;
    description: string;
    what_to_inform: string;
    deadlines: number[];
    selected_months: string[];
    created_at?: string;
    updated_at?: string;
  }
  Update: {
    id?: string;
    name?: string;
    custom_name?: string | null;
    description?: string;
    what_to_inform?: string;
    deadlines?: number[];
    selected_months?: string[];
    created_at?: string;
    updated_at?: string;
  }
  Relationships: []
}