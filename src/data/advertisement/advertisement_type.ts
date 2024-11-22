export type Advertisement_type = {
  ID?: number
  title: string
  description?: string
  image_url?: string
  video_url?: string
  video_duration?: number
  status: string
  advertisements_buildings?: any[]
}
// type Advertisement struct {
// 	gorm.Model
// 	Title                  string                  `json:"title" binding:"required"`
// 	Description            string                  `json:"description"`
// 	ImageURL               string                  `json:"image_url"`
// 	VideoURL               string                  `json:"video_url"`
// 	VideoDuration          int64                   `json:"video_duration"`            // 以秒为单位
// 	Status                 string                  `json:"status" binding:"required"` // active, inactive
// 	AdvertisementBuildings []AdvertisementBuilding `gorm:"foreignKey:AdvertisementID;constraint:OnDelete:CASCADE;" json:"advertisements_buildings"`
// }
