import request from '.'

export const fetchStaffUsers = (query: any) => {
  return request({
    url: `/admin/staff_user`,
    method: 'get',
    params: query,
  })
}

export const addStaffUser = (data: any) => {
  return request({
    url: `/admin/staff_user`,
    method: 'post',
    data,
  })
}

export const activateStaffUser = (id: number | string) => {
  return request({
    url: `/admin/staff_user/${id}/activate`,
    method: 'put',
  })
}

export const deactivateStaffUser = (id: number | string) => {
  return request({
    url: `/admin/staff_user/${id}/deactivate`,
    method: 'put',
  })
}

export const addStaffAccountPermission = (data: any) => {
  return request({
    url: `/admin/staff_user/permission`,
    method: 'post',
    data,
  })
}

export const deleteStaffAccountPermission = (data: any) => {
  return request({
    url: `/admin/staff_user/permission`,
    method: 'delete',
    data,
  })
}

export const deleteStaffUser = (data: any) => {
  return request({
    url: `/admin/staff_user`,
    method: 'delete',
    data,
  })
}
