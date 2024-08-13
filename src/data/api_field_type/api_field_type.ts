// meters.ts

// Meter types (Water/Electric)
export enum MeterType {
    Water = 0,
    Electric = 1
  }
  
  // Meter models
  export enum MeterModel {
    MeterModelWaterHDSB  = 0,
    MeterModelWaterHDSW = 1,
    ElectricMeterModelTEST = 0
  }
  
  // Meter operation types (Water Meter Valve Off/On, Electric Meter Off/On)
  export enum MeterOperationType {
    WaterMeterValveOff = 0,
    WaterMeterValveOn = 1,
    ElectricMeterOff = 0,
    ElectricMeterOn = 1
  }
  
  // Resident types (Owner/Tenant)
  export enum ResidentType {
    Owner = "owner",
    Tenant = "tenant"
  }
  
  // Task operations (Read/Switch)
  export enum TaskOperation {
    Read = "read",
    SwitchOn = "switchOn",
    SwitchOff = "switchOff"
  }
  