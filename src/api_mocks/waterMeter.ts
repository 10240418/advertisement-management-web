import { Pagination, Sorting, Filters } from "../data/page";
import { water_meter_type } from "../data/water_meter";


export const getWaterMeters = (pagination: Pagination)=>{
    return Promise.resolve({
        data:[
            {
                id: 1,
                created_at: '2023-07-01',
                gateway_id: 1,
                modbus_address: '01',
                name: 'water meter 1',
                remark: 'remark 1',
                unit_id: 1,
                updated_at: '2023-07-01'
            },
            {
                id: 2,
                created_at: '2023-07-02',
                gateway_id: 2,
                modbus_address: '02',
                name: 'water meter 2',
                remark: 'remark 2',
                unit_id: 2,
                updated_at: '2023-07-02'
            },
            {
                id: 3,
                created_at: '2023-07-03',
                gateway_id: 3,
                modbus_address: '03',
                name: 'water meter 3',
                remark: 'remark 3',
                unit_id: 3,
                updated_at: '2023-07-03'
            },
            {
                id: 4,
                created_at: '2023-07-04',
                gateway_id: 4,
                modbus_address: '04',
                name: 'water meter 4',
                remark: 'remark 4',
                unit_id: 4,
                updated_at: '2023-07-04'
            },
            {
                id: 5,
                created_at: '2023-07-05',
                gateway_id: 5,
                modbus_address: '05',
                name: 'water meter 5',
                remark: 'remark 5',
                unit_id: 5,
                updated_at: '2023-07-05'
            },
            {
                id: 6,
                created_at: '2023-07-06',
                gateway_id: 6,
                modbus_address: '06',
                name: 'water meter 6',
                remark: 'remark 6',
                unit_id: 6,
                updated_at: '2023-07-06'
            },
            {
                id: 7,
                created_at: '2023-07-07',
                gateway_id: 7,
                modbus_address: '07',
                name: 'water meter 7',
                remark: 'remark 7',
                unit_id: 7,
                updated_at: '2023-07-07'
            },
            {
                id: 8,
                created_at: '2023-07-08',
                gateway_id: 8,
                modbus_address: '08',
                name: 'water meter 8',
                remark: 'remark 8',
                unit_id: 8,
                updated_at: '2023-07-08'
            },
            {
                
                id: 9,
                created_at: '2023-07-09',
                gateway_id: 9,
                modbus_address: '09',
                name: 'water meter 9',
                remark: 'remark 9',
                unit_id: 9,
                updated_at: '2023-07-09'
            },
            {
                id: 10,
                created_at: '2023-07-10',
                gateway_id: 10,
                modbus_address: '10',
                name: 'water meter 10',
                remark: 'remark 10',
                unit_id: 10,
                updated_at: '2023-07-10'
            },
        ],
        message: 'success',
        success: true,
        pagination: {
            pageNum: 1,
            pageSize: 10,
            total: 50
        }
    })

}
export const getWaterMeterByID = (id: number) => {
    return Promise.resolve({
        data: {
            id: 1,
            created_at: '2023-07-01',
            gateway_id: 1,
            modbus_address: '01',
            name: 'water meter 1',
            remark: 'remark 1',
            unit_id: 1,
            updated_at: '2023-07-01'
        }
    })
}

export const createWaterMeter = (water_meter: water_meter_type) => {
    return Promise.resolve({
        data: {
            id: 1,
            created_at: '2023-07-01',
            gateway_id: 1,
            modbus_address: '01',
            name: 'water meter 1',
            remark: 'remark 1',
            unit_id: 1,
        }
    })
}

export const updateWaterMeter = (water_meter: water_meter_type) => {
    return Promise.resolve({
        data: {
            id: 1,
            created_at: '2023-07-01',
            gateway_id: 1,
            modbus_address: '01',
            name: 'water meter 1',
            remark: 'remark 1',
            unit_id: 1,
        }
    })
}

export const deleteWaterMeter = (meter: water_meter_type) => {
    return Promise.resolve({
        data: {
            id: 1,
            created_at: '2023-07-01',
            gateway_id: 1,
            modbus_address: '01',
            name: 'water meter 1',
            remark: 'remark 1',
            unit_id: 1,
        }
   })
}

export const addWaterMeter= (water_meter: water_meter_type) => {
    return Promise.resolve({
        data: water_meter,
        success: 'true',
        message: 'do it',
    })
}
