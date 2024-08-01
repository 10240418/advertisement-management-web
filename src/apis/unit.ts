import request from '@/apis/index'

//{pageSize,pageNum,desc}
export const fetchUnitList = (query: any) => {
    return request({
        url: `/admin/unit`,
        method: 'get',
        params: query.params,
    });
};

export const addUnit = (data: any) => {
    return request({
        url: `/admin/unit`,
        method: 'post',
        data,
    });
};
// {
//     "floor": "G",
//     "unit": "033"
//   }

export const updateUnit = (data: any) => {
    return request({
        url: `/admin/unit`,
        method: 'put',
        data,
    });
};
// {
//     "id": 2,
//     "floor": "G",
//     "unit": "03"
//   }
export const deleteUnit = (ids: any) => {
    return request({
        url: `/admin/unit`,
        method: 'delete',
        data: ids,
    });
};
// {
//     "ids": [3]
//   }