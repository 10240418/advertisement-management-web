import request from '.';

export const fetchDevices = (query: any) => {
    return request({
        url: `/client/device`,
        method: 'get',
        params: query,
    });
};

export const addDevice = (data: any) => {
    return request({
        url: `/client/device`,
        method: 'post',
        data,
    });
}

export const updateDevice = (data: any) => {
    return request({
        url: `/admin/device`,
        method: 'put',
        data,
    });
}

export const deleteDevice = (data: any) => {
    return request({
        url: `/admin/device`,
        method: 'delete',
        data
    });
}

export const getLogs = () => {
    return request({
        url: `/admin/log`,
        method: 'get',
    });
}