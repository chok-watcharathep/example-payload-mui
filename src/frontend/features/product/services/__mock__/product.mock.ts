import type { Product } from '@/payload-types'

export const mockProductList: Product[] = [
  {
    id: 5,
    name: 'Green T-Shirt',
    slug: 'green-t-shirt',
    price: 222,
    category: 1,
    image: 1,
    updatedAt: '2025-08-30T07:50:48.076Z',
    createdAt: '2025-08-29T07:44:52.071Z',
    _status: 'published',
    linkCurriculums: [],
  },
  {
    id: 2,
    name: 'Blue T-Shirt',
    slug: 'blue-t-shirt',
    price: 200,
    category: 1,
    image: 2,
    updatedAt: '2025-08-30T07:55:14.480Z',
    createdAt: '2025-08-29T05:40:09.795Z',
    _status: 'published',
    linkCurriculums: [],
  },
]

export const mockProductDetail: Product = {
  id: 2,
  name: 'Blue T-Shirt',
  slug: 'blue-t-shirt',
  price: 200,
  category: 1,
  image: 2,
  updatedAt: '2025-08-30T07:55:14.480Z',
  createdAt: '2025-08-29T05:40:09.795Z',
  _status: 'published',
  linkCurriculums: [],
}
