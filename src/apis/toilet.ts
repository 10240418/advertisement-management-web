import request from '.'

export const fetchToilets = (query: any) => {
  return request({
    url: `/client/toilet`,
    method: 'get',
    params: query,
  })
}

export const addToilet = (data: any) => {
  return request({
    url: `/client/toilet`,
    method: 'post',
    data,
  })
}

export const updateToilet = (data: any) => {
  return request({
    url: `/admin/toilet`,
    method: 'put',
    data,
  })
}

export const deleteToilet = (data: any) => {
  return request({
    url: `/admin/toilet`,
    method: 'delete',
    data,
  })
}
