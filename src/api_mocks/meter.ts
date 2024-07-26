import request from '.';

// 获取电表列表
// id: number 
// created_at: string
// name: string
// gateway_id: string
// remark: string
// unit_id: number
// updated_at: string
// modbus_address:string
// type:string
export const fetchMeters = (query: any) => {
    return Promise.resolve({
        data: [
          {
            id: 1,
            created_at: '2023-04-01T09:00:00.000Z',
            name: '电表1',
            gateway_id: 'GW001',
            remark: '备注信息',
            unit_id: 1,
            updated_at: '2023-04-01T09:00:00.000Z',
            modbus_address: '01',
          },
          {
            id: 2,
            created_at: '2023-04-01T09:00:00.000Z',
            name: '电表2',
            gateway_id: 'GW002',
            remark: '备注信息',
            unit_id: 2,
            updated_at: '2023-04-01T09:00:00.000Z',
            modbus_address: '02',
          },
          {
            id: 3,
            created_at: '2023-04-01T09:00:00.000Z',
            name: '电表3',
            gateway_id: 'GW003',
            remark: '备注信息',
            unit_id: 3,
            updated_at: '2023-04-01T09:00:00.000Z',
            modbus_address: '03',
          }
         ],
         pagination: {
          total: 3,
          page: 1,
          pageSize: 10,
          pageNum: 1,
        },
       
      });
    }
//   return request({
//     url: '/meters',
//     method: 'get',
//     params: query,
//   });

// 添加电表
export const addMeter = (data: any) => {
    return Promise.resolve({
        data: [
          {
            id: 1,
            created_at: '2023-04-01T09:00:00.000Z',
            name: '电表1',
            gateway_id: 'GW001',
            remark: '备注信息',
            unit_id: 1,
            updated_at: '2023-04-01T09:00:00.000Z',
            modbus_address: '01',
          },
          {
            id: 2,
            created_at: '2023-04-01T09:00:00.000Z',
            name: '电表2',
            gateway_id: 'GW002',
            remark: '备注信息',
            unit_id: 2,
            updated_at: '2023-04-01T09:00:00.000Z',
            modbus_address: '02',
          },
          {
            id: 3,
            created_at: '2023-04-01T09:00:00.000Z',
            name: '电表3',
            gateway_id: 'GW003',
            remark: '备注信息',
            unit_id: 3,
            updated_at: '2023-04-01T09:00:00.000Z',
            modbus_address: '03',
          }
         ],
         pagithion: {
          total: 3,
          page: 1,
          pageSize: 10,
          pageCount: 1,
        },
        sorting:{
            sortBy: 'id',
            sortOrder: 'asc',
          },
      });
    
};

// 删除电表
export const deleteMeter = (id: any) => {
    return Promise.resolve({
        data: [
          {
            id: 1,
            created_at: '2023-04-01T09:00:00.000Z',
            name: '电表1',
            gateway_id: 'GW001',
            remark: '备注信息',
            unit_id: 1,
            updated_at: '2023-04-01T09:00:00.000Z',
            modbus_address: '01',
          },
          {
            id: 2,
            created_at: '2023-04-01T09:00:00.000Z',
            name: '电表2',
            gateway_id: 'GW002',
            remark: '备注信息',
            unit_id: 2,
            updated_at: '2023-04-01T09:00:00.000Z',
            modbus_address: '02',
          },
          {
            id: 3,
            created_at: '2023-04-01T09:00:00.000Z',
            name: '电表3',
            gateway_id: 'GW003',
            remark: '备注信息',
            unit_id: 3,
            updated_at: '2023-04-01T09:00:00.000Z',
            modbus_address: '03',
          }
         ],
         pagithion: {
          total: 3,
          page: 1,
          pageSize: 10,
          pageCount: 1,
        },
        sorting:{
            sortBy: 'id',
            sortOrder: 'asc',
          },
      });
    
};

// 更新电表信息
export const updateMeter = ( data: any) => {
    return Promise.resolve({
        data: [
          {
            id: 1,
            created_at: '2023-04-01T09:00:00.000Z',
            name: '电表1',
            gateway_id: 'GW001',
            remark: '备注信息',
            unit_id: 1,
            updated_at: '2023-04-01T09:00:00.000Z',
            modbus_address: '01',
          },
          {
            id: 2,
            created_at: '2023-04-01T09:00:00.000Z',
            name: '电表2',
            gateway_id: 'GW002',
            remark: '备注信息',
            unit_id: 2,
            updated_at: '2023-04-01T09:00:00.000Z',
            modbus_address: '02',
          },
          {
            id: 3,
            created_at: '2023-04-01T09:00:00.000Z',
            name: '电表3',
            gateway_id: 'GW003',
            remark: '备注信息',
            unit_id: 3,
            updated_at: '2023-04-01T09:00:00.000Z',
            modbus_address: '03',
          }
         ],
         pagithion: {
          total: 3,
          page: 1,
          pageSize: 10,
          pageCount: 1,
        },
        sorting:{
            sortBy: 'id',
            sortOrder: 'asc',
          },
      });
    
};
