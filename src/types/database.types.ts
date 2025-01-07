export type Company = {
  id: string
  name: string
  address: string
  phone: string
  email: string
  description?: string
  social_links?: {
    website?: string
    instagram?: string
    twitter?: string
    facebook?: string
  }
  company_products: {
    product_tag: {
      id: string
      name: string
    }
  }[]
  reviews: {
    id: string
    rating: number
    text?: string
    created_at: string
    users: {
      id: string
      email: string
      user_metadata: {
        name?: string
      }
    }
  }[]
}

export type Product = {
  id: string
  name: string
  created_at: string
}

export type Review = {
  id: string
  company_id: string
  user_id: string
  rating: number
  text?: string
  created_at: string
}

export type CompanyProduct = {
  company_id: string
  product_id: string
} 