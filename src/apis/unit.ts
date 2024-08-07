import request from '@/apis/index'

//{pageSize,pageNum,desc}
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

export const bindUnitResident = (data: any) => {
    return request({
        url: `/admin/unit/resident/bind`,
        method: 'post',
        data,
    });
};
// {
//     "type": "owner",
//     "residentUserId": 1,
//     "unitId": 10
//   }

export const unbindUnitResident = (data: any) => {
    return request({
        url: `/admin/unit/resident/unbind`,
        method: 'post',
        data,
    });
};
// {
//     "residentUserId": 1,
//     "unitId": 1
//   }