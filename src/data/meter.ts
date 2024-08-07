import { gateway_type } from "./gateway"
import { unit_type } from "./unit"

export  type meter_type = {
  id: number,
  createdAt: string,
  name: string,
  type: number,
  model: number,
  modbusAddr: number,
  remark: string,
  unitId: number,
  unit: unit_type,
  gatewayId: number,
  gateway: gateway_type
  } 
  // {
  //   "data": {
  //     "id": 19,
  //     "createdAt": "2024-07-31T06:51:32.006Z",
  //     "name": "Test2Mete2r 0220123",
  //     "type": 1,
  //     "modbusAddr": 1,
  //     "remark": "",
  //     "unitId": null,
  //     "unit": null,
  //     "gatewayId": 1,
  //     "gateway": {
  //       "id": 1,
  //       "createdAt": "2024-07-29T13:25:21.977Z",
  //       "name": "test3",
  //       "ipAddr": "192.168.1.2",
  //       "remark": ""
  //     },
  //     "tasks": []
  //   },
  //   "message": "get meter success"
  // }