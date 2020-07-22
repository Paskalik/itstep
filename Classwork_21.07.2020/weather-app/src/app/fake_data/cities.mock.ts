import {Cities} from "../core/interfaces/cities";

export const CITIES: Array<Cities> = [
  {
    name: 'Dnepr',
    forecast: {
      conditions: 'облачно',
      temperature: {
        day: {
          min: 26,
          max: 30
        },
        night: {
          min: 14,
          max: 21
        }
      },
      wind: {
        direction: 'западный',
        speed: 2
      }
    }
  },
  {
    name: 'Kiev',
    forecast: {
      conditions: 'ясно',
      temperature: {
        day: {
          min: 25,
          max: 35
        },
        night: {
          min: 17,
          max: 22
        }
      },
      wind: {
        direction: 'южный',
        speed: 5
      }
    }
  }
]
