import { admin_user_type } from "./admin_user"
import { eletric_energy_meter_type } from "./electric_energy_meter"
import { electric_energy_meter_data_type } from "./electric_energy_meter_data"



export type Pagination = {
    page: number
    perPage: number
    total: number
  }
  
  export type Sorting = {
    sortBy: keyof admin_user_type| electric_energy_meter_data_type| eletric_energy_meter_type | undefined
    sortingOrder: 'asc' | 'desc' | null
  }
  
  export type Filters = {
    isActive: boolean
    search: string
  }