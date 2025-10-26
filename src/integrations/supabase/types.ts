export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      businesses: {
        Row: {
          id: string
          user_id: string
          name: string
          description: string | null
          phone: string
          whatsapp_number: string
          email: string | null
          website: string | null
          address: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          description?: string | null
          phone: string
          whatsapp_number: string
          email?: string | null
          website?: string | null
          address?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          description?: string | null
          phone?: string
          whatsapp_number?: string
          email?: string | null
          website?: string | null
          address?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      products: {
        Row: {
          id: string
          business_id: string
          name: string
          description: string | null
          price: number
          currency: string
          category: string | null
          stock_quantity: number
          is_available: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          business_id: string
          name: string
          description?: string | null
          price: number
          currency?: string
          category?: string | null
          stock_quantity?: number
          is_available?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          business_id?: string
          name?: string
          description?: string | null
          price?: number
          currency?: string
          category?: string | null
          stock_quantity?: number
          is_available?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      customers: {
        Row: {
          id: string
          business_id: string
          whatsapp_number: string
          name: string | null
          email: string | null
          tags: string[] | null
          last_interaction: string | null
          total_orders: number
          total_spent: number
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          business_id: string
          whatsapp_number: string
          name?: string | null
          email?: string | null
          tags?: string[] | null
          last_interaction?: string | null
          total_orders?: number
          total_spent?: number
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          business_id?: string
          whatsapp_number?: string
          name?: string | null
          email?: string | null
          tags?: string[] | null
          last_interaction?: string | null
          total_orders?: number
          total_spent?: number
          status?: string
          created_at?: string
          updated_at?: string
        }
      }
      orders: {
        Row: {
          id: string
          business_id: string
          customer_id: string
          status: string
          total_amount: number
          currency: string
          items: Json
          payment_method: string | null
          payment_status: string
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          business_id: string
          customer_id: string
          status?: string
          total_amount: number
          currency?: string
          items: Json
          payment_method?: string | null
          payment_status?: string
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          business_id?: string
          customer_id?: string
          status?: string
          total_amount?: number
          currency?: string
          items?: Json
          payment_method?: string | null
          payment_status?: string
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      campaigns: {
        Row: {
          id: string
          business_id: string
          name: string
          type: string
          status: string
          target_audience: Json
          message_template: string
          schedule: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          business_id: string
          name: string
          type: string
          status?: string
          target_audience: Json
          message_template: string
          schedule?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          business_id?: string
          name?: string
          type?: string
          status?: string
          target_audience?: Json
          message_template?: string
          schedule?: Json | null
          created_at?: string
          updated_at?: string
        }
      }
      message_templates: {
        Row: {
          id: string
          business_id: string
          name: string
          content: string
          type: string
          variables: string[] | null
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          business_id: string
          name: string
          content: string
          type: string
          variables?: string[] | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          business_id?: string
          name?: string
          content?: string
          type?: string
          variables?: string[] | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      automations: {
        Row: {
          id: string
          business_id: string
          name: string
          trigger_type: string
          trigger_conditions: Json
          actions: Json
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          business_id: string
          name: string
          trigger_type: string
          trigger_conditions: Json
          actions: Json
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          business_id?: string
          name?: string
          trigger_type?: string
          trigger_conditions?: Json
          actions?: Json
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      analytics: {
        Row: {
          id: string
          business_id: string
          date: string
          metric_type: string
          metric_value: number
          metadata: Json | null
          created_at: string
        }
        Insert: {
          id?: string
          business_id: string
          date: string
          metric_type: string
          metric_value: number
          metadata?: Json | null
          created_at?: string
        }
        Update: {
          id?: string
          business_id?: string
          date?: string
          metric_type?: string
          metric_value?: number
          metadata?: Json | null
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
