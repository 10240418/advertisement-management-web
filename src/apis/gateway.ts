import request from '.';

export const fetchGateways = (query: any) => {
    return request({
        url: `/admin/gateway`,
        method: 'get',
        params: query.params,
        data: query.data
    });
}
//    {
//     pageSize: 10,
//     pageNum: 1
//    }
//   {
//     "email": "admin@admin.admin",
//     "password": "admin"
//   }

export const getGateway = (query:any) => {
    return request({
        url: `/admin/gateway/${query.params}`,
        method: 'get',
        data:query.data
    });
}

// {
//     "email": "admin@admin.admin",
//     "password": "admin"
//   }
export const addGateway = (data: any) => {
    return request({
        url: `/admin/gateway`,
        method: 'post',
        data
    });
}
// {
//     "name": "test1",
//     "ipAddr": "192.168.1.2"
//   }


export const updateGateway = (data: any) => {
    return request({
        url: `/admin/gateway`,
        method: 'put',
        data
    });
}
// {
//     "id": 1,
//     "name": "test3",
//     "ipAddr": "192.168.1.2"
//   }

export const deleteGateway = (data: any) => {
    return request({
        url: `/admin/gateway`,
        method: 'delete',
        data
    });
}
// {
//     "ids": [1]
//   }

export const pingGateway = (data: any) => {
    return request({
        url: `/admin/gateway/${data.id}/ping`,
        method: 'post',
        
    });
}

export const fetchLogs = (query:any) => {
    return request({
        url: `/admin/gateway/${query.id}/logs`,
        method: 'get',
    });
}
// gateway.ts