import request from '.';

export const fetchCubicles = (query: any) => {
    return request({
        url: `/client/cubicle`,
        method: 'get',
        params: query,
    });
};

export const addCubicle = (data: any) => {
    return request({
        url: `/client/cubicle`,
        method: 'post',
        data,
    });
}

export const updateCubicle = (data: any) => {
    return request({
        url: `/admin/cubicle`,
        method: 'put',
        data,
    });
}

export const deleteCubicle = (data: any) => {
    return request({
        url: `/admin/cubicle`,
        method: 'delete',
        data
    });
}
