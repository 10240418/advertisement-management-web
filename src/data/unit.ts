export type unit_type = {
  id: number
  createdAt: string
  floor: string
  unit: string
  remark: string
}
// {
//   "id": 1,
//   "createdAt": "",
//   "floor": "",
//   "unit": "",
//   "remark": ""
// }

export type unit_detail_type = {
  id: number
  createdAt: string
  floor: string
  unit: string
  remark: string
  meters: object[]
  residents: object[]
}
