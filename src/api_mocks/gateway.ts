import request from '.';
// gateway.ts api_mocks

// 获取网关列表
// id: number 
// created_at: string
// name: string
// ip_address: string
// remark: string
// updated_at: string
export const fetchGateways = (query: any) => {
    return Promise.resolve({
        data: [
          {
            id: 1,
            created_at: '2023-04-01T09:00:00.000Z',
            name: '网关1',
            ip_address: '192.168.0.1',
            remark: '备注信息',
            updated_at: '2023-04-01T09:00:00.000Z',
          },
          {
            id: 2,
            created_at: '2023-04-01T09:00:00.000Z',
            name: '网关2',
            ip_address: '192.168.0.2',
            remark: '备注信息',
            updated_at: '2023-04-01T09:00:00.000Z',
          },
          {
            id: 3,
            created_at: '2023-04-01T09:00:00.000Z',
            name: '网关3',
            ip_address: '192.168.0.3',
            remark: '备注信息',
            updated_at: '2023-04-01T09:00:00.000Z',
          }
        ],
        pagination: {
          total: 3,
          page: 1,
          pageSize: 10,
          pageNum: 1,
        },
    });
};

// 添加网关
export const addGateway = (data: any) => {
    return Promise.resolve({
        data: [
          {
            id: 1,
            created_at: '2023-04-01T09:00:00.000Z',
            name: '网关1',
            ip_address: '192.168.0.1',
            remark: '备注信息',
            updated_at: '2023-04-01T09:00:00.000Z',
          },
          {
            id: 2,
            created_at: '2023-04-01T09:00:00.000Z',
            name: '网关2',
            ip_address: '192.168.0.2',
            remark: '备注信息',
            updated_at: '2023-04-01T09:00:00.000Z',
          },
          {
            id: 3,
            created_at: '2023-04-01T09:00:00.000Z',
            name: '网关3',
            ip_address: '192.168.0.3',
            remark: '备注信息',
            updated_at: '2023-04-01T09:00:00.000Z',
          }
        ],
        pagination: {
          total: 3,
          page: 1,
          pageSize: 10,
          pageNum: 1,
        },
      
    });
};

// 删除网关
export const deleteGateway = (id: any) => {
    return Promise.resolve({
        data: [
          {
            id: 1,
            created_at: '2023-04-01T09:00:00.000Z',
            name: '网关1',
            ip_address: '192.168.0.1',
            remark: '备注信息',
            updated_at: '2023-04-01T09:00:00.000Z',
          },
          {
            id: 2,
            created_at: '2023-04-01T09:00:00.000Z',
            name: '网关2',
            ip_address: '192.168.0.2',
            remark: '备注信息',
            updated_at: '2023-04-01T09:00:00.000Z',
          },
          {
            id: 3,
            created_at: '2023-04-01T09:00:00.000Z',
            name: '网关3',
            ip_address: '192.168.0.3',
            remark: '备注信息',
            updated_at: '2023-04-01T09:00:00.000Z',
          }
        ],
        pagination: {
          total: 3,
          page: 1,
          pageSize: 10,
          pageNum: 1,
        },
      
    });
};

// 更新网关信息
export const updateGateway = (data: any) => {
    return Promise.resolve({
        data: [
          {
            id: 1,
            created_at: '2023-04-01T09:00:00.000Z',
            name: '网关1',
            ip_address: '192.168.0.1',
            remark: '备注信息',
            updated_at: '2023-04-01T09:00:00.000Z',
          },
          {
            id: 2,
            created_at: '2023-04-01T09:00:00.000Z',
            name: '网关2',
            ip_address: '192.168.0.2',
            remark: '备注信息',
            updated_at: '2023-04-01T09:00:00.000Z',
          },
          {
            id: 3,
            created_at: '2023-04-01T09:00:00.000Z',
            name: '网关3',
            ip_address: '192.168.0.3',
            remark: '备注信息',
            updated_at: '2023-04-01T09:00:00.000Z',
          }
        ],
        pagination: {
          total: 3,
          page: 1,
          pageSize: 10,
          pageNum: 1,
        },
       
    });
};
