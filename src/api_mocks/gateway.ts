import { Pagination } from "../data/page";
import { gateway_type } from "../data/gateway";

export const getGateways = (pagination: Pagination) => {
  return Promise.resolve({
    data: [
      {
        "id": 1,
        "created_at": "2024-07-22T10:00:00Z",
        "name": "Gateway 1",
        "ip_address": "192.168.1.1",
        "remark": "Main building gateway",
        "updated_at": "2024-07-22T10:00:00Z",
      },
      {
        "id": 2,
        "created_at": "2024-07-22T10:05:00Z",
        "name": "Gateway 2",
        "ip_address": "192.168.1.2",
        "remark": "Warehouse gateway",
        "updated_at": "2024-07-22T10:05:00Z",
      },
      {
        "id": 3,
        "created_at": "2024-07-22T10:10:00Z",
        "name": "Gateway 3",
        "ip_address": "192.168.1.3",
        "remark": "Office gateway",
        "updated_at": "2024-07-22T10:10:00Z",
      },
      // 其他网关数据...
    ],
    success: 'true',
    message: 'get gateways success',
    pagination: {
      pageNum: 1,
      pageSize: 10,
      total: 30
    }
  });
}

export const addGateway = (gateway: gateway_type) => {
  return Promise.resolve({
    data: gateway,
    success: 'true',
    message: 'add gateway success',
  });
}

export const deleteGateway = (gateway: gateway_type) => {
  return Promise.resolve({
    data: gateway,
    success: 'true',
    message: 'delete gateway success',
  });
}

export const getGatewayData = () => {
  return Promise.resolve({
    data: [
      {
        "id": 1,
        "created_at": "2024-07-22T11:00:00Z",
        "name": "Gateway 1",
        "ip_address": "192.168.1.1",
        "remark": "Main building gateway",
        "updated_at": "2024-07-22T11:00:00Z",
      }
    ],
    success: 'true',
    message: 'get gateway data success',
  });
}

export const getGatewayDataByID = (id: number) => {
  return Promise.resolve({
    data: {
      "id": id,
      "created_at": "2024-07-22T11:00:00Z",
      "name": "Gateway " + id,
      "ip_address": `192.168.1.${id}`,
      "remark": "Specific gateway",
      "updated_at": "2024-07-22T11:00:00Z",
    },
    success: 'true',
    message: 'get gateway data by ID success',
  });
}

export const updateGateway = (gateway: gateway_type) => {
  return Promise.resolve({
    data: gateway,
    success: 'true',
    message: 'update gateway success',
  });
}
