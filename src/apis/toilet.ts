import request from '.'

export const fetchToilets = (query: any) => {
  return request({
    url: `/admin/toilet`,
    method: 'get',
    params: query,
  })
}

export const fetchToilet = (id: number) => {
  return request({
    url: `/admin/toilet/${id}`,
    method: 'get',
  })
}

export const addToilet = (data: any) => {
  return request({
    url: `/admin/toilet`,
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

export const deleteToilet = (id: number) => {
  return request({
    url: `/admin/toilet/${id}`,
    method: 'delete',
  })
}

export const fetchCubicles = (query: any) => {
    return request({
        url: `/admin/cubicle`,
        method: 'get',
        params: query,
    });
};

export const addCubicle = (data: any) => {
    return request({
        url: `/admin/cubicle`,
        method: 'post',
        data,
    });
}

export const deleteCubicle = (id: number) => {
    return request({
        url: `/admin/cubicle/${id}`,
        method: 'delete',
    });
}
