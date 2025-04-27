export interface Product {
  id: string
  createdAt: string
  updatedAt: string
  deletedAt: string | null
  title: string
  slug: string
  description: string
  inStock: boolean
  stock: number
  status: string
  price: number
  minPrice: number
  maxPrice: number
  salePrice: number | null
  creator: string
  categories: { id: string }[]
  attachments: { id: string }[]
  tags: any[] // Adjust type if tags have a specific structure
  user: {
    id: string
    email: string
    firstName: string
    lastName: string
    avatar: string
    role: string
  }
}

export interface ProductResult {
  totalItems: number
  totalPages: number
  currentPage: number
  pageSize: number
  data: Product[]
}

export interface ProductsResponse {
  message: string
  statusCode: number
  result: ProductResult
}

export interface ProductsData {
  data: {
    products: ProductsResponse
  }
}

export interface ProductData {
  product: Product
}

// Types for Server Response
export type ProductsFromServerResponse = {
  products: Product[]
  metadata: Omit<ProductResult, 'data'>
  status: Omit<ProductsResponse, 'result'>
}

// Types for Server Response
export type ProductFromServerResponse = {
  product: Product
}

