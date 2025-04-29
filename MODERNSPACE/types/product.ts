export interface Product {
  id: string
  name: string
  description: string
  price: number
  oldPrice?: number
  category: string
  image: string
  featured: boolean
  dimensions?: {
    width: string
    height: string
    depth: string
    weight: string
  }
  materials?: string
  details?: string
}
