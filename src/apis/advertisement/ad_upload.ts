import request from '../index'

export const getUploadPolicy = (data: any) => {
  return request({
    url: '/api/upload/policy',
    method: 'post',
    data,
  })
}
