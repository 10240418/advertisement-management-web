import request from '.';

// 获取电表列表
export const fetchMeters = (query: any) => {
  return request({
    url: '/admin/meter',
    method: 'get',
    params: {
      pageSize: query.pageSize, 
      pageNum: query.pageNum,
      desc:query.desc?query.desc:false,},
  });
};

// 添加电表
export const addMeter = (data: any) => {
  return request({
    url: '/admin/meter',
    method: 'post',
    data:{
      name:data.name,
      type:data.type,
      modbusAddr:data.modbusAddr,
      gatewayId:data.gatewayId,},
  });
};
// {
//   "name": "TestMeter 003",
//   "type": "water",
//   "modbusAddr": 213,
//   "gatewayId": 1
// }

export const fetchMeter = (data: any) => {
  return request({
    url: `/admin/meter/${data.id}`,
    method: 'get',
  })
};
// 删除电表
export const deleteMeter = (ids: any) => {
  return request({
    url: `/admin/meters`,
    method: 'delete',
    data:{
      ids:ids
    }
  });
};
// {
//   ids:[]
// }

// 更新电表信息
export const updateMeter = ( data: any) => {
  return request({
    url: `/admin/meters`,
    method: 'put',
    data:{
      id:data.id,
      name:data.name,
      type:data.type,
      modbusAddr:data.modbusAddr,
      remark:data.remark,
      unitId:data.unitId,
      gatewayId:data.gatewayId,
    },
  });
};
// {
//   "id": 7,
//   "name": "TestMeter 003",
//   "type": "water",
//   "modbusAddr": 23,
//   "remark": "測試水表",
//   "unitId": 1,
//   "gatewayId": 6
// }

export const operateMeter = (data: any) => {
  return request({
    url: `/admin/meter/${data.id}/operate`,
    method: 'post',
    data:{
     type:data.type,
    }
  });
};

export const fetchMeterData = (query: any) => {
  return request({
    url: `/admin/meter/${query.id}/data`,
    method: 'get',
    params: {
      pageSize: query.pageSize, 
      pageNum: query.pageNum,
      desc:query.desc?query.desc:false,
      asc:query.asc?query.asc:false,
    },
  });
};

