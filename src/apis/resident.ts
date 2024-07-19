import request from '.'

export const fetchResidents = (query: any) => {
  return request({
    url: `/admin/resident`,
    method: 'get',
    params: query,
  })
}

export const addResident = (data: any) => {
  return request({
    url: `/admin/resident`,
    method: 'post',
    data,
  })
}

export const activateResident = (id: number | string) => {
  return request({
    url: `/admin/resident/${id}/activate`,
    method: 'put',
  })
}

export const deactivateResident = (id: number | string) => {
  return request({
    url: `/admin/resident/${id}/deactivate`,
    method: 'put',
  })
}

export const addStaffAccountPermission = (data: any) => {
  return request({
    url: `/admin/resident/permission`,
    method: 'post',
    data,
  })
}

export const deleteStaffAccountPermission = (data: any) => {
  return request({
    url: `/admin/resident/permission`,
    method: 'delete',
    data,
  })
}

export const deleteResident = (data: any) => {
  return request({
    url: `/admin/resident`,
    method: 'delete',
    data,
  })
}
