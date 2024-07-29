import request from '.'



export const fetchResidents = (query: any) => {
  return request({
    url: `/admin/resident_user`,
    method: 'get',
    params: query,
  })
}
// pageNum pageSize

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

export const deleteResident = (data: any) => {
  return request({
    url: `/admin/resident_user/reset_password`,
    method: 'delete',
    data,
  })
}
// {
//   "id": 1,
//   "password": "123456"
// }

export const updateResident = (data: any) => {
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