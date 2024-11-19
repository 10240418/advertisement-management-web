import { Advertisement_type } from '@/data/advertisement/advertisement_type'
import request from '../index'

// ------------------------
// 广告相关接口 (Advertisements)
// ------------------------

/**
 * 获取所有广告
 * @param params 分页和排序参数
 */
export const getAds = (params: any) => {
  return request({
    url: `/api/ads`,
    method: 'get',
    params,
  })
}

/**
 * 获取单个广告
 * @param adId 广告ID
 */
export const getAd = (adId: number) => {
  return request({
    url: `/api/ads/${adId}`,
    method: 'get',
  })
}

/**
 * 创建新广告
 * @param adData 广告数据
 */
export const createAd = (adData: Advertisement_type) => {
  return request({
    url: `/api/ads`,
    method: 'post',
    data: adData,
  })
}

/**
 * 更新广告
 * @param adId 广告ID
 * @param adData 更新的数据
 */
export const updateAd = (
  adId: number,
  adData: {
    title?: string
    description?: string
    image_url?: string
    video_url?: string
    status?: string
    video_duration?: number
  },
) => {
  return request({
    url: `/api/ads/${adId}`,
    method: 'put',
    data: adData,
  })
}

/**
 * 删除广告
 * @param adId 广告ID
 */
export const deleteAd = (adId: number) => {
  return request({
    url: `/api/ads/${adId}`,
    method: 'delete',
  })
}

// ------------------------
// 广告与建筑关联接口 (Advertisements-Buildings Associations)
// ------------------------

/**
 * 添加多个建筑到广告
 * @param adId 广告ID
 * @param buildingIds 建筑ID数组
 */
export const addBuildingsToAd = (adId: number, buildingIds: number[]) => {
  return request({
    url: `/api/ads/${adId}/buildings`,
    method: 'post',
    data: { building_ids: buildingIds },
  })
}

/**
 * 删除广告与多个建筑的关联
 * @param adId 广告ID
 * @param buildingIds 建筑ID数组
 */
export const removeBuildingsFromAd = (adId: number, buildingIds: number[]) => {
  return request({
    url: `/api/ads/${adId}/buildings`,
    method: 'delete',
    data: { building_ids: buildingIds },
  })
}

/**
 * 获取广告关联的所有建筑IDs
 * @param adId 广告ID
 */
export const getBuildingsByAdvertisement = (adId: number) => {
  return request({
    url: `/api/ads/${adId}/buildings`,
    method: 'get',
  })
}

/**
 * 更新广告与建筑之间的播放时长
 * @param data 更新数据
 */
export const updatePlayDuration = (data: { advertisement_id: number; building_id: number; play_duration: number }) => {
  return request({
    url: `/api/ads/update_play_duration`,
    method: 'put',
    data,
  })
}
