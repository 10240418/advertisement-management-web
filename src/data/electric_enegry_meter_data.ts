export type electric_enegry_meter_data = {
    id: number 
    current:Float32Array
    frequency:Float32Array
    meter_id: number
    power:Float32Array
    total_power:Float32Array
    voltage:Float32Array
    created_at: string
    updated_at: string
    unit_id: number
  }