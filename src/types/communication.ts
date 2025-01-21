export interface CommunicationType {
  id: number;
  name: string;
  custom_name: string | null;
  description: string;
  what_to_inform: string;
  deadlines: string[];
  selected_months: Date[];
  year: string;
}