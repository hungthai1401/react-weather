import { FETCH_WEATHER } from "../constants";

const fetchWeather = location => ({
  type: FETCH_WEATHER,
  location: location
})

export default fetchWeather;