import request from '../index'

export const fetchAdvertisements = (query: any) => {
  return request({
    url: '/admin/advertisement',
    method: 'get',
    params: query,
  })
}

export const addAdvertisement = (data: any) => {
  return request({
    url: '/admin/advertisement',
    method: 'post',
    data,
  })
}

export const deleteAdvertisement = (data: any) => {
  return request({
    url: '/admin/advertisement',
    method: 'delete',
    data,
  })
}

export const changeAdvertisement = (data: any) => {
  return request({
    url: '/admin/advertisement/change_password',
    method: 'post',
    data: data,
  })
}
