import request from '../index'

export const fetchAdminUsers = (query: any) => {
  return request({
    url: '/admin/users',
    method: 'get',
    params: query,
  })
}

export const registerAdminUser = (data: any) => {
  return request({
    url: '/admin/register',
    method: 'post',
    data: data,
  })
}
export const loginAdminUser = (data: any) => {
  return request({
    url: '/admin/login',
    method: 'post',
    data: data,
  })
}

export const deleteAdminUser = (data: any) => {
  return request({
    url: '/admin/users',
    method: 'delete',
    params: data,
  })
}

export const changeAdminUser = (data: any) => {
  return request({
    url: '/admin/user',
    method: 'put',
    data: data,
  })
}
