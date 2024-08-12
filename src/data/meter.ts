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
  export interface read_meter_log_type {
    voltage: number,
    current: number,
    frequency: number,
    power: number,
    powerFactor: number,

    powerEnergy: number,
    switch: boolean,
    meterId: string,
    meterName: string,
    createdAt: string
    }
    // {
    //   "voltage": 235.60000351071358,
    //   "current": 0,
    //   "frequency": 49.99999888241291,
    //   "power": 0,
    //   "powerFactor": 1.0000000474974513,
    //   "powerEnergy": 0,
    //   "switch": false,
    //   "meterId": "10",
    //   "meterName": "TestElectricMeter",
    //   "createdAt": "2024-08-11T14:49:35.863625Z"
    // },
    export interface operate_meter_log_type {
      meterId: string,
      meterName: string,
      operation: number,
      from: number,
      createdAt: string
      }
      // "meterId": "10",
      // "meterName": "TestElectricMeter",
      // "operation": 1,
      // "from": 0,
      // "createdAt": "2024-08-11T14:38:31.634468Z"