import request from '../index'
// Existing Admin Interfaces

/**
 * 获取建筑列表
 */
export const getBuildings = (params: any) => {
  return request({
    url: '/api/buildings',
    method: 'get',
    params,
  })
}

/**
 * 获取建筑详情
 * @param buildingId 建筑ID
 */
export const getBuildingDetail = (buildingId: number) => {
  return request({
    url: `/api/buildings/${buildingId}`,
    method: 'get',
  })
}
/**
 * 添加建筑
 * @param data 建筑数据
 */
export const addBuilding = (data: any) => {
  return request({
    url: '/api/buildings',
    method: 'post',
    data: data,
  })
}

/**
 * 更新建筑
 * @param buildingId 建筑ID
 * @param data 建筑数据
 */
export const updateBuilding = (buildingId: number, data: any) => {
  return request({
    url: `/api/buildings/${buildingId}`,
    method: 'put',
    data: data,
  })
}

/**
 * 删除建筑
 * @param buildingId 建筑ID
 */
export const deleteBuilding = (buildingId: number) => {
  return request({
    url: `/api/buildings/${buildingId}`,
    method: 'delete',
  })
}

/**
 * 添加广告到建筑
 * @param buildingId 建筑ID
 * @param advertisementIds 广告ID数组
 */
export const addAdsToBuilding = (buildingId: number, advertisementIds: number[]) => {
  return request({
    url: `/api/buildings/${buildingId}/ads`,
    method: 'post',
    data: { advertisement_ids: advertisementIds },
  })
}

/**
 * 删除建筑与广告的关联
 * @param buildingId 建筑ID
 * @param advertisementIds 广告ID数组
 */
export const removeAdsFromBuilding = (buildingId: number, advertisementIds: number[]) => {
  return request({
    url: `/api/buildings/${buildingId}/ads`,
    method: 'delete',
    data: { advertisement_ids: advertisementIds },
  })
}

/**
 * 获取建筑关联的广告 IDs
 * @param buildingId 建筑ID
 */
export const getAdvertisementsByBuilding = (buildingId: number) => {
  return request({
    url: `/api/buildings/${buildingId}/ads`,
    method: 'get',
  })
}
