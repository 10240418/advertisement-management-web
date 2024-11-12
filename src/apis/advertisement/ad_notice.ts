import request from '../index'

export const fetchNotices = (query: any) => {
  return request({
    url: '/admin/notice',
    method: 'get',
    params: query,
  })
}

export const addNotice = (data: any) => {
  return request({
    url: '/admin/notice',
    method: 'post',
    data,
  })
}

export const deleteNotice = (data: any) => {
  return request({
    url: '/admin/notice',
    method: 'delete',
    data,
  })
}

export const changeNotice = (data: any) => {
  return request({
    url: '/admin/notice',
    method: 'put',
    data,
  })
}
