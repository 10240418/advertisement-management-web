import request from '../index'
// Existing Admin Interfaces

export const registerAdminUser = (data: any) => {
  return request({
    url: '/api/admin/register',
    method: 'post',
    data: data,
  })
}

export const loginAdminUser = (data: any) => {
  return request({
    url: '/api/admin/login',
    method: 'post',
    data: data,
  })
}
export const fetchAdminUsers = (query: any) => {
  return request({
    url: '/api/admins/users',
    method: 'get',
    params: query,
  })
}

export const deleteAdminUser = (data: any) => {
  return request({
    url: '/api/admins/users',
    method: 'delete',
    data: data,
  })
}

export const changeAdminUser = (data: any) => {
  return request({
    url: '/api/admins/user',
    method: 'put',
    data: data,
  })
}
