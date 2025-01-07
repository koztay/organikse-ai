export interface Company {
  id: string
  name: string
  email: string
  phone: string
  location: string
  featured: boolean
  company_products: {
    product_tag: {
      id: string
      name: string
    }
  }[]
} 