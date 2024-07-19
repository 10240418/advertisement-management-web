import { adminUserType } from "../pages/adminUsers/type"


export type Pagination = {
    page: number
    perPage: number
    total: number
  }
  
  export type Sorting = {
    sortBy: keyof adminUserType | undefined
    sortingOrder: 'asc' | 'desc' | null
  }
  
  export type Filters = {
    isActive: boolean
    search: string
  }