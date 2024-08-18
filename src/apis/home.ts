import request from '@/apis/index'

export const fetchTotalStatus = () => {
  return request({
    url: `/admin/statistics/home`,
    method: 'get',
  })
}
