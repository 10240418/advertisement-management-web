import request from '@/apis/index'

//{pageSize,pageNum}
export const fetchUnitList = (query: any) => {
    return request({
        url: `/admin/unit`,
        method: 'get',
        params: query,
    });
};

export const addUnit = (data: any) => {
    return request({
        url: `/admin/unit`,
        method: 'post',
        data,
    });
};

export const updateUnit = (data: any) => {
    return request({
        url: `/admin/unit`,
        method: 'put',
        data,
    });
};

export const deleteUnit = (ids: any) => {
    return request({
        url: `/admin/unit`,
        method: 'delete',
        data: ids,
    });
};