import request from '.';

// 获取电表列表
export const fetchMeters = (query: any) => {
  return request({
    url: '/meters',
    method: 'get',
    params: query,
  });
};

// 添加电表
export const addMeter = (data: any) => {
  return request({
    url: '/meters',
    method: 'post',
    data,
  });
};

// 删除电表
export const deleteMeter = (id: any) => {
  return request({
    url: `/meters/${id}`,
    method: 'delete',
  });
};

// 更新电表信息
export const updateMeter = ( data: any) => {
  return request({
    url: `/meters/${data.ids}`,
    method: 'put',
    data,
  });
};
