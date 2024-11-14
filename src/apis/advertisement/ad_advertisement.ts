import request from '../index'


export const addAdvertisement = (data: any) => {
  return request({
    url: '/api/ads',
    method: 'post',
    data,
  })
}

export const deleteAdvertisement = (data: any) => {
  return request({
    url: '/api/ads',
    method: 'delete',
    data,
  })
}

export const changeAdvertisement = (data: any) => {
  return request({
    url: `/api/ads/${data.id}`,
    method: 'put',
    data: data,
  })
}

export const fetchAdvertisements = (query: any) => {
  return request({
    url: '/api/ads',
    method: 'get',
    params: query,
  })
}
