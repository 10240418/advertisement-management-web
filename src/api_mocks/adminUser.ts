import request from '.'

export const fetchAdminUsers = () => {
  return request({
    url: '/admin/account',
    method: 'get',
  })
}

export const addAdminUser = (data: any) => {
  return request({
    url: '/admin/account',
    method: 'post',
    data,
  })
}

export const deleteAdminUser = (data: any) => {
  return request({
    url: '/admin/account',
    method: 'delete',
    data,
  })
}
