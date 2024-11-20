import request from '../index'

export const getUploadPolicy = (data: any) => {
  return request({
    url: '/upload/policy',
    method: 'post',
    data,
  })
}
