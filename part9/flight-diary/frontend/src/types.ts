type Weather = "rainy" | "sunny" | "windy" | "cloudy";
type Visibility = "good" | "ppor";

export interface DiaryType {
  id: string;
  date: string;
  weather: Weather;
  visibility: Visibility;
}