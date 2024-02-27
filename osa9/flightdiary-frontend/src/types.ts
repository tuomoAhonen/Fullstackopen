export enum Weather {
	sunny = 'sunny',
	rainy = 'rainy',
	windy = 'windy',
	cloudy = 'cloudy',
}

export enum Visibility {
	good = 'good',
	poor = 'poor',
}

export type WeatherType = 'sunny' | 'rainy' | 'windy' | 'cloudy';
export type VisibilityType = 'good' | 'poor';

export interface FlightDiaryNew {
	date: string;
	weather: Weather;
	visibility: Visibility;
	comment?: string;
}

export interface FlightDiaryUnSensitive {
	id: number;
	date: string;
	weather: Weather;
	visibility: Visibility;
}

export interface FlightDiarySensitive extends FlightDiaryUnSensitive {
	comment: string;
}

export type FlightDiary = FlightDiarySensitive | FlightDiaryUnSensitive;
