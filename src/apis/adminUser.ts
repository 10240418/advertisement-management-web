import request from '.'

export const fetchAdminUsers = (query: any) => {
  return request({
    url: '/admin/admin_user',
    method: 'get',
    params: query,
  })
}

export const addAdminUser = (data: any) => {
  return request({
    url: '/admin/admin_user',
    method: 'post',
    data,
  })
}

export const deleteAdminUser = (data: any) => {
  return request({
    url: '/admin/admin_user',
    method: 'delete',
    data,
  })
}
