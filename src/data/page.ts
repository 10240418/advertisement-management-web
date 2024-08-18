export type Pagination = {
  pageNum: number
  pageSize: number
  total: number
}

export type Sorting = {
  sortBy: keyof any | undefined
  sortingOrder: 'asc' | ' desc' | null | string
}

export type Filters = {
  isActive: boolean
  search: string
}
