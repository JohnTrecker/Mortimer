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
      author: {
        Row: {
          first_name: string | null
          id: number
          img_url: string | null
          last_name: string | null
        }
        Insert: {
          first_name?: string | null
          id?: number
          img_url?: string | null
          last_name?: string | null
        }
        Update: {
          first_name?: string | null
          id?: number
          img_url?: string | null
          last_name?: string | null
        }
        Relationships: []
      }
      category: {
        Row: {
          category: string | null
          id: number
        }
        Insert: {
          category?: string | null
          id?: number
        }
        Update: {
          category?: string | null
          id?: number
        }
        Relationships: []
      }
      countries: {
        Row: {
          continent: Database["public"]["Enums"]["continents"] | null
          id: number
          iso2: string
          iso3: string | null
          local_name: string | null
          name: string | null
        }
        Insert: {
          continent?: Database["public"]["Enums"]["continents"] | null
          id?: number
          iso2: string
          iso3?: string | null
          local_name?: string | null
          name?: string | null
        }
        Update: {
          continent?: Database["public"]["Enums"]["continents"] | null
          id?: number
          iso2?: string
          iso3?: string | null
          local_name?: string | null
          name?: string | null
        }
        Relationships: []
      }
      excerpt: {
        Row: {
          id: number
          text: string | null
        }
        Insert: {
          id?: number
          text?: string | null
        }
        Update: {
          id?: number
          text?: string | null
        }
        Relationships: []
      }
      highlight: {
        Row: {
          char_end: number
          char_start: number
          excerpt_id: number
          id: string | null
          note: string | null
          referrer_id: string
          time_created: string
          time_updated: number | null
          type: string | null
        }
        Insert: {
          char_end: number
          char_start: number
          excerpt_id: number
          id?: string | null
          note?: string | null
          referrer_id: string
          time_created?: string
          time_updated?: number | null
          type?: string | null
        }
        Update: {
          char_end?: number
          char_start?: number
          excerpt_id?: number
          id?: string | null
          note?: string | null
          referrer_id?: string
          time_created?: string
          time_updated?: number | null
          type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "highlight_excerpt_id_fkey"
            columns: ["excerpt_id"]
            isOneToOne: false
            referencedRelation: "excerpt"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "highlight_referrer_id_fkey"
            columns: ["referrer_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
      reference: {
        Row: {
          author: string | null
          author_id: number
          downvotes: number
          excerpt_id: number
          id: number
          notes: string | null
          pages: string | null
          referrer_id: string | null
          subtopic_id: number
          summary_id: number | null
          topic_id: number
          upvotes: number
          volume: number | null
          work_id: number
        }
        Insert: {
          author?: string | null
          author_id: number
          downvotes?: number
          excerpt_id: number
          id?: number
          notes?: string | null
          pages?: string | null
          referrer_id?: string | null
          subtopic_id: number
          summary_id?: number | null
          topic_id: number
          upvotes?: number
          volume?: number | null
          work_id: number
        }
        Update: {
          author?: string | null
          author_id?: number
          downvotes?: number
          excerpt_id?: number
          id?: number
          notes?: string | null
          pages?: string | null
          referrer_id?: string | null
          subtopic_id?: number
          summary_id?: number | null
          topic_id?: number
          upvotes?: number
          volume?: number | null
          work_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "reference_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "author"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reference_excerpt_id_fkey"
            columns: ["excerpt_id"]
            isOneToOne: false
            referencedRelation: "excerpt"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reference_referrer_id_fkey"
            columns: ["referrer_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reference_subtopic_id_fkey"
            columns: ["subtopic_id"]
            isOneToOne: false
            referencedRelation: "subtopic"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reference_summary_id_fkey"
            columns: ["summary_id"]
            isOneToOne: false
            referencedRelation: "summary"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reference_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: false
            referencedRelation: "topic"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reference_work_id_fkey"
            columns: ["work_id"]
            isOneToOne: false
            referencedRelation: "work"
            referencedColumns: ["id"]
          },
        ]
      }
      subtopic: {
        Row: {
          alt_id: string | null
          description: string | null
          id: number
          is_referenced: boolean | null
          referrer_id: string | null
          topic_id: number
        }
        Insert: {
          alt_id?: string | null
          description?: string | null
          id?: number
          is_referenced?: boolean | null
          referrer_id?: string | null
          topic_id?: number
        }
        Update: {
          alt_id?: string | null
          description?: string | null
          id?: number
          is_referenced?: boolean | null
          referrer_id?: string | null
          topic_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "subtopic_referrer_id_fkey"
            columns: ["referrer_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subtopic_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: false
            referencedRelation: "topic"
            referencedColumns: ["id"]
          },
        ]
      }
      summary: {
        Row: {
          id: number
          referrer_id: string | null
          summary: string | null
        }
        Insert: {
          id?: number
          referrer_id?: string | null
          summary?: string | null
        }
        Update: {
          id?: number
          referrer_id?: string | null
          summary?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "summary_referrer_id_fkey"
            columns: ["referrer_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
      topic: {
        Row: {
          category_id: number | null
          contributors: number
          id: number
          image_url: string | null
          name: string | null
          referrer_id: string | null
          subtopics: Json | null
        }
        Insert: {
          category_id?: number | null
          contributors?: number
          id?: number
          image_url?: string | null
          name?: string | null
          referrer_id?: string | null
          subtopics?: Json | null
        }
        Update: {
          category_id?: number | null
          contributors?: number
          id?: number
          image_url?: string | null
          name?: string | null
          referrer_id?: string | null
          subtopics?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "topic_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "category"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "topic_referrer_id_fkey"
            columns: ["referrer_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
      translator: {
        Row: {
          id: number
          primary_trans: string | null
          secondary_trans: string | null
        }
        Insert: {
          id?: number
          primary_trans?: string | null
          secondary_trans?: string | null
        }
        Update: {
          id?: number
          primary_trans?: string | null
          secondary_trans?: string | null
        }
        Relationships: []
      }
      user: {
        Row: {
          email: string | null
          first_name: string | null
          id: string
          last_name: string | null
        }
        Insert: {
          email?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
        }
        Update: {
          email?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
        }
        Relationships: []
      }
      volume: {
        Row: {
          id: number
          path: string | null
        }
        Insert: {
          id?: number
          path?: string | null
        }
        Update: {
          id?: number
          path?: string | null
        }
        Relationships: []
      }
      work: {
        Row: {
          author: string | null
          author_id: number | null
          id: number
          title: string | null
          translator: string | null
          volume_id: number | null
        }
        Insert: {
          author?: string | null
          author_id?: number | null
          id?: number
          title?: string | null
          translator?: string | null
          volume_id?: number | null
        }
        Update: {
          author?: string | null
          author_id?: number | null
          id?: number
          title?: string | null
          translator?: string | null
          volume_id?: number | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      continents:
        | "Africa"
        | "Antarctica"
        | "Asia"
        | "Europe"
        | "Oceania"
        | "North America"
        | "South America"
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
