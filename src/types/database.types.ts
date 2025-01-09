export interface Database {
  public: {
    Tables: {
      companies: {
        Row: {
          id: string
          name: string
          email?: string
          phone?: string
          location: string
          featured: boolean
        }
      }
      company_products: {
        Row: {
          id: string
          company_id: string
          product_tag_id: string
        }
      }
      product_tags: {
        Row: {
          id: string
          name: string
        }
      }
    }
  }
} 