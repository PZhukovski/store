export type ProductPreviewType = {
  id: number,
  preview: string,
  title: string,
  price: number,
  availability: boolean
}
export type SectionType = {
  id: number,
  title: string,
  description: string,
  products: ProductPreviewType[]
}
export type ProductType = {
  id: number,
  preview: string,
  images?: string[],
  title: string,
  subtitle?: string,
  price: number,
  description?: string,
  colors?: string[],
  sizes?: string[],
  stickerNumbers?: number[],
  availability?: boolean
}
export type OrderType = {
  id: number,
  title: string,
  preview: string,
  price: number,
  color: string | null,
  size: string | null,
  stickerNumber: number | null,
  quantity: number,
  sum: number
  removeId: number
}
