import request from '.'

export const login = (data: any) => {
  return request({
    url: '/admin/login',
    method: 'post',
    data,
  })
}

export const fetchPreferences = () => {
  return request({
    url: '/admin/preferences',
    method: 'get',
  })
}