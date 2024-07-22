import { admin_user_type } from "./admin_user"



export type Pagination = {
    page: number
    perPage: number
    total: number
  }
  
  export type Sorting = {
    sortBy: keyof admin_user_type| undefined
    sortingOrder: 'asc' | 'desc' | null
  }
  
  export type Filters = {
    isActive: boolean
    search: string
  }