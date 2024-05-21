import request from '.'

export const fetchToilets = (query: any) => {
  return Promise.resolve({
    data: [
      {
        id: 1,
        name: 'Toilet 1',
        description: 'This is toilet 1',
        location: 'Location 1',
        status: 'active',
        creation_date: '2021-07-01',
        last_update: '2021-07-01',
      },
      {
        id: 2,
        name: 'Toilet 2',
        description: 'This is toilet 2',
        location: 'Location 2',
        status: 'in use',
        creation_date: '2021-07-01',
        last_update: '2021-07-01',
      },
    ],
  })
}

export const addToilet = (data: any) => {
  return Promise.resolve({ data: { id: 1 } })
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
