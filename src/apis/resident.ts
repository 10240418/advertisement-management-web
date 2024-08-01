import request from '.'



export const fetchResidents = (query: any) => {
  return request({
    url: `/admin/resident_user`,
    method: 'get',
    params: query,
  })
}
// pageNum pageSize sortingOrder
export const fetchResident = (query: any) => {
  return request({
    url: `/admin/resident_user/${query.id}`,
    method: 'get',
  })
}
// {
//   "data": {
//     "id": 1,
//     "createdAt": "2024-07-31T01:57:59.379Z",
//     "name": "Leo",
//     "email": "dreamskyll@foxmail.com",
//     "active": true,
//     "units": [
//       {
//         "id": 1,
//         "createdAt": "2024-07-31T01:59:56.168Z",
//         "floor": "G",
//         "unit": "033",
//         "remark": ""
//       }
//     ]
//   },
//   "message": "success"
// }

export const addResident = (data: any) => {
  return request({
    url: `/admin/resident_user`,
    method: 'post',
    data,
  })
}
// {
//   "name": "Leo",
//   "email": "dreamskyll@foxmail.com"
// }

export const updateResidentActive = (data: any) => {
  return request({
    url: `/admin/resident_user`,
    method: 'put',
    data,
  })
}
// {
//   "id": 1,
//   "active": false
// }

export const resetResidentPassword = (data: any) => {
  return request({
    url: `/admin/resident_user/reset_password`,
    method: 'put',
    data,
  })
}
// {
//   "id": 1,
//   "password": "123456"
// }