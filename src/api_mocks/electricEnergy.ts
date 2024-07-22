
import { Pagination, Sorting, Filters } from "../data/page";
import { eletric_energy_meter_type } from "../data/electric_energy_meter";
export const getElectricMeters = (pagination: Pagination) => {
  return Promise.resolve({
    data: [
      {
        "id": 1,
        "created_at": "2024-07-22T10:00:00Z",
        "name": "Meter 1",
        "gateway_id": "GW001",
        "remark": "Main building",
        "unit_id": 101,
        "updated_at": "2024-07-22T10:00:00Z",
        "modbus_address": "001"
      },
      {
        "id": 2,
        "created_at": "2024-07-22T10:05:00Z",
        "name": "Meter 2",
        "gateway_id": "GW002",
        "remark": "Warehouse",
        "unit_id": 102,
        "updated_at": "2024-07-22T10:05:00Z",
        "modbus_address": "002"
      },
      {
        "id": 3,
        "created_at": "2024-07-22T10:10:00Z",
        "name": "Meter 3",
        "gateway_id": "GW003",
        "remark": "Office",
        "unit_id": 103,
        "updated_at": "2024-07-22T10:10:00Z",
        "modbus_address": "003"
      },
      {
        "id": 4,
        "created_at": "2024-07-22T10:15:00Z",
        "name": "Meter 4",
        "gateway_id": "GW004",
        "remark": "Factory",
        "unit_id": 104,
        "updated_at": "2024-07-22T10:15:00Z",
        "modbus_address": "004"
      },
      {
        "id": 5,
        "created_at": "2024-07-22T10:20:00Z",
        "name": "Meter 5",
        "gateway_id": "GW005",
        "remark": "Laboratory",
        "unit_id": 105,
        "updated_at": "2024-07-22T10:20:00Z",
        "modbus_address": "005"
      },
      {
        "id": 6,
        "created_at": "2024-07-22T10:25:00Z",
        "name": "Meter 6",
        "gateway_id": "GW006",
        "remark": "Server Room",
        "unit_id": 106,
        "updated_at": "2024-07-22T10:25:00Z",
        "modbus_address": "006"
      },
      {
        "id": 7,
        "created_at": "2024-07-22T10:30:00Z",
        "name": "Meter 7",
        "gateway_id": "GW007",
        "remark": "Reception",
        "unit_id": 107,
        "updated_at": "2024-07-22T10:30:00Z",
        "modbus_address": "007"
      },
      {
        "id": 8,
        "created_at": "2024-07-22T10:35:00Z",
        "name": "Meter 8",
        "gateway_id": "GW008",
        "remark": "Library",
        "unit_id": 108,
        "updated_at": "2024-07-22T10:35:00Z",
        "modbus_address": "008"
      },
      {
        "id": 9,
        "created_at": "2024-07-22T10:40:00Z",
        "name": "Meter 9",
        "gateway_id": "GW009",
        "remark": "Storage",
        "unit_id": 109,
        "updated_at": "2024-07-22T10:40:00Z",
        "modbus_address": "009"
      },
      {
        "id": 10,
        "created_at": "2024-07-22T10:45:00Z",
        "name": "Meter 10",
        "gateway_id": "GW010",
        "remark": "Security",
        "unit_id": 110,
        "updated_at": "2024-07-22T10:45:00Z",
        "modbus_address": "010"
      },
      {
        "id": 11,
        "created_at": "2024-07-22T10:50:00Z",
        "name": "Meter 11",
        "gateway_id": "GW011",
        "remark": "Cafeteria",
        "unit_id": 111,
        "updated_at": "2024-07-22T10:50:00Z",
        "modbus_address": "011"
      },
      {
        "id": 12,
        "created_at": "2024-07-22T10:55:00Z",
        "name": "Meter 12",
        "gateway_id": "GW012",
        "remark": "Parking Lot",
        "unit_id": 112,
        "updated_at": "2024-07-22T10:55:00Z",
        "modbus_address": "012"
      },
      {
        "id": 13,
        "created_at": "2024-07-22T11:00:00Z",
        "name": "Meter 13",
        "gateway_id": "GW013",
        "remark": "Maintenance",
        "unit_id": 113,
        "updated_at": "2024-07-22T11:00:00Z",
        "modbus_address": "013"
      },
      {
        "id": 14,
        "created_at": "2024-07-22T11:05:00Z",
        "name": "Meter 14",
        "gateway_id": "GW014",
        "remark": "Gym",
        "unit_id": 114,
        "updated_at": "2024-07-22T11:05:00Z",
        "modbus_address": "014"
      },
      {
        "id": 15,
        "created_at": "2024-07-22T11:10:00Z",
        "name": "Meter 15",
        "gateway_id": "GW015",
        "remark": "Auditorium",
        "unit_id": 115,
        "updated_at": "2024-07-22T11:10:00Z",
        "modbus_address": "015"
      },
      {
        "id": 16,
        "created_at": "2024-07-22T11:15:00Z",
        "name": "Meter 16",
        "gateway_id": "GW016",
        "remark": "Bathroom",
        "unit_id": 116,
        "updated_at": "2024-07-22T11:15:00Z",
        "modbus_address": "016"
      },
      {
        "id": 17,
        "created_at": "2024-07-22T11:20:00Z",
        "name": "Meter 17",
        "gateway_id": "GW017",
        "remark": "Kitchen",
        "unit_id": 117,
        "updated_at": "2024-07-22T11:20:00Z",
        "modbus_address": "017"
      },
      {
        "id": 18,
        "created_at": "2024-07-22T11:25:00Z",
        "name": "Meter 18",
        "gateway_id": "GW018",
        "remark": "Roof",
        "unit_id": 118,
        "updated_at": "2024-07-22T11:25:00Z",
        "modbus_address": "018"
      },
      {
        "id": 19,
        "created_at": "2024-07-22T11:30:00Z",
        "name": "Meter 19",
        "gateway_id": "GW019",
        "remark": "Basement",
        "unit_id": 119,
        "updated_at": "2024-07-22T11:30:00Z",
        "modbus_address": "019"
      },
      {
        "id": 20,
        "created_at": "2024-07-22T11:35:00Z",
        "name": "Meter 20",
        "gateway_id": "GW020",
        "remark": "Garden",
        "unit_id": 120,
        "updated_at": "2024-07-22T11:35:00Z",
        "modbus_address": "020"
      },
      {
        "id": 21,
        "created_at": "2024-07-22T11:40:00Z",
        "name": "Meter 21",
        "gateway_id": "GW021",
        "remark": "Elevator",
        "unit_id": 121,
        "updated_at": "2024-07-22T11:40:00Z",
        "modbus_address": "021"
      },
      {
        "id": 22,
        "created_at": "2024-07-22T11:45:00Z",
        "name": "Meter 22",
        "gateway_id": "GW022",
        "remark": "Staircase",
        "unit_id": 122,
        "updated_at": "2024-07-22T11:45:00Z",
        "modbus_address": "022"
      },
      {
        "id": 23,
        "created_at": "2024-07-22T11:50:00Z",
        "name": "Meter 23",
        "gateway_id": "GW023",
        "remark": "Corridor",
        "unit_id": 123,
        "updated_at": "2024-07-22T11:50:00Z",
        "modbus_address": "023"
      },
      {
        "id": 24,
        "created_at": "2024-07-22T11:55:00Z",
        "name": "Meter 24",
        "gateway_id": "GW024",
        "remark": "Entrance",
        "unit_id": 124,
        "updated_at": "2024-07-22T11:55:00Z",
        "modbus_address": "024"
      },
      {
        "id": 25,
        "created_at": "2024-07-22T12:00:00Z",
        "name": "Meter 25",
        "gateway_id": "GW025",
        "remark": "Exit",
        "unit_id": 125,
        "updated_at": "2024-07-22T12:00:00Z",
        "modbus_address": "025"
      },
      {
        "id": 26,
        "created_at": "2024-07-22T12:05:00Z",
        "name": "Meter 26",
        "gateway_id": "GW026",
        "remark": "Power Room",
        "unit_id": 126,
        "updated_at": "2024-07-22T12:05:00Z",
        "modbus_address": "026"
      },
      {
        "id": 27,
        "created_at": "2024-07-22T12:10:00Z",
        "name": "Meter 27",
        "gateway_id": "GW027",
        "remark": "Control Room",
        "unit_id": 127,
        "updated_at": "2024-07-22T12:10:00Z",
        "modbus_address": "027"
      },
      {
        "id": 28,
        "created_at": "2024-07-22T12:15:00Z",
        "name": "Meter 28",
        "gateway_id": "GW028",
        "remark": "Backup Power",
        "unit_id": 128,
        "updated_at": "2024-07-22T12:15:00Z",
        "modbus_address": "028"
      },
      {
        "id": 29,
        "created_at": "2024-07-22T12:20:00Z",
        "name": "Meter 29",
        "gateway_id": "GW029",
        "remark": "Generator",
        "unit_id": 129,
        "updated_at": "2024-07-22T12:20:00Z",
        "modbus_address": "029"
      },
      {
        "id": 30,
        "created_at": "2024-07-22T12:25:00Z",
        "name": "Meter 30",
        "gateway_id": "GW030",
        "remark": "Transformer",
        "unit_id": 130,
        "updated_at": "2024-07-22T12:25:00Z",
        "modbus_address": "030"
      }
    ], 
    success: 'true',
    message: 'get users success',
    pagination: {
      pageNum: 1,
      pageSize: 10,
      total: 50
    }

  })
}

export const addElectricMeter = (meter: eletric_energy_meter_type) =>{
  return Promise.resolve({
    data: meter,
    success: 'true',
    message: 'do it',
  })
}

export const deleteElectricMeter = (meter: eletric_energy_meter_type) =>{
  return Promise.resolve({
    data: meter,
    success: 'true',
    message: 'do it',
  })
}

export const getElectricMeterData = () => {
  return Promise.resolve({
    data: [
      {
        "id": 1,
        "created_at": "2024-07-22T11:00:00Z",
        "name": "Meter 1",
        "gateway_id": "GW001",
        "remark": "Living Room",
        "unit_id": 111,
      }
    ]
  })
}

export const getElectricMeterDataByID = () => {
  return Promise.resolve({
    data: [
      {
        "id": 1,
        "created_at": "2024-07-22T11:00:00Z",
        "name": "Meter 1",
        "gateway_id": "GW001",
        "remark": "Living Room",
        "unit_id":111,
      }
    ]
  })
}

export const updateElectricMeter = (meter: eletric_energy_meter_type) => {
  return Promise.resolve({
    data: meter,
    success: 'true',
    message: 'do it',
  })
}