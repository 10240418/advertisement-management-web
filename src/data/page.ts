import { admin_user_type } from "./admin_user"
import { eletric_energy_meter_type } from "./electric_energy_meter"
import { electric_energy_meter_data_type } from "./electric_energy_meter_data"
import { resident_user_type } from "./resident_user"



export type Pagination = {
    pageNum: number
    pageSize: number
    total: number
  }
  
  export type Sorting = {
    sortBy: keyof admin_user_type| electric_energy_meter_data_type| eletric_energy_meter_type | resident_user_type|undefined
    sortingOrder: 'asc' | 'desc' | null
  }
  
  export type Filters = {
    isActive: boolean
    search: string
  }
  // 业务流程就是说,先我这边设定好