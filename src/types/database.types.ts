export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

import { CommunicationSubmissionsTable } from './tables/communication-submissions.types'
import { CommunicationTypesTable } from './tables/communication-types.types'
import { NotaryOfficesTable } from './tables/notary-offices.types'
import { ProfilesTable } from './tables/profiles.types'

export type Database = {
  public: {
    Tables: {
      communication_submissions: CommunicationSubmissionsTable
      communication_types: CommunicationTypesTable
      notary_offices: NotaryOfficesTable
      profiles: ProfilesTable
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