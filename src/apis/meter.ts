import request from '.'

// 获取电表列表
export const fetchMeters = (query: any) => {
  return request({
    url: '/admin/meter',
    method: 'get',
    params: {
      pageSize: query.pageSize,
      pageNum: query.pageNum,
      desc: query.desc ? query.desc : false,
    },
  })
}

// 添加电表
export const addMeter = (data: any) => {
  return request({
    url: '/admin/meter',
    method: 'post',
    data: {
      name: data.name,
      type: data.type as number,
      model: data.model as number,
      modbusAddr: data.modbusAddr as number,
      gatewayId: data.gatewayId as number,
      remark: data.remark,
      unitId: data.unitId as number,
    },
  })
}
// {
//   "name": "Test2Mete2r 02201223",
//   "type": 1,
//   "modbusAddr": 1,
//   "remark": "測試水表",
//   "unitId": 1,
//   "gatewayId": 6
//  }

export const fetchMeter = (data: any) => {
  return request({
    url: `/admin/meter/${data.id}`,
    method: 'get',
  })
}
// 删除电表
export const deleteMeter = (ids: number[]) => {
  return request({
    url: `/admin/meter`,
    method: 'delete',
    data: {
      ids: ids,
    },
  })
}
// {
//   ids:[]
// }

// 更新电表信息
export const updateMeter = (data: any) => {
  return request({
    url: `/admin/meter`,
    method: 'put',
    data: {
      id: data.id,
      name: data.name,
      type: data.type,
      model: data.model,
      modbusAddr: data.modbusAddr,
      remark: data.remark,
      unitId: data.unitId,
      gatewayId: data.gatewayId,
    },
  })
}
// {
//   "id": 7,
//   "name": "TestMeter 003",
//   "type": "water",
//   "modbusAddr": 23,
//   "remark": "測試水表",
//   "unitId": 1,
//   "gatewayId": 6
// }

export const operateMeter = (query: any) => {
  return request({
    url: `/admin/meter/${query.id}/operate`,
    method: 'post',
    data: query.body,
  })
}

export const readMeter = (query: any) => {
  return request({
    url: `/admin/meter/${query.id}/realtime`,
    method: 'get',
  })
}
// {
//   "data": {
//     "voltage": 235.2000035047531,
//     "current": 0,
//     "frequency": 49.99999888241291,
//     "power": 0,
//     "powerFactor": 1.0000000474974513,
//     "powerEnergy": 0,
//     "switch": true
//   },
//   "message": "operate meter success"
// }

export const fetchReadMeterLogsData = (query: any) => {
  return request({
    url: `/admin/meter/${query.id}/data`,
    method: 'get',
    params: {
      pageSize: query.pageSize,
      pageNum: query.pageNum,
    },
  })
}
export const fetchOperateMeterLogsData = (query: any) => {
  return request({
    url: `/admin/meter/${query.id}/operating_log`,
    method: 'get',
    params: {
      pageSize: query.pageSize,
      pageNum: query.pageNum,
    },
  })
}

export const fetchMeterStatus = () => {
  return request({
    url: `/admin/meter/status`,
    method: 'get',
  })
}

export const fetchMeterStatusByType = (query: any) => {
  return request({
    url: `/admin/meter/status`,
    method: `get`,
    params: {
      type: query,
    },
  })
}
