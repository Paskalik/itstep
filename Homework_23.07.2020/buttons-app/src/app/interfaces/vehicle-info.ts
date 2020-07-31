export interface VehicleInfo {
  name: string;
  manufacturer: string;
  class: string;
  year: string;
  dimensions?: {
    length: number,
    width: number,
    height: number
  }
  description: string;
}
