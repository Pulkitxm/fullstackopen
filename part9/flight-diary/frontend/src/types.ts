export enum Visibility {
   Good= "good",
   Poor= "poor",
}
export enum Weather {
  Rainy="rainy",
  Sunny="sunny",
  Windy="windy",
  Cloudy="cloudy",
}
export interface DiaryType {
  id: string;
  date: string;
  comment: string;
  weather: Weather;
  visibility: Visibility;
}

export type NewDiaryType = Omit<DiaryType,'id'>