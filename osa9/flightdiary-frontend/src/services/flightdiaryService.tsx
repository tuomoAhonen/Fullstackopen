import axios from 'axios';
import {FlightDiary, FlightDiaryNew} from '../types';
const url = 'http://localhost:3001/api/diaries';

export const getFlightDiaries = async (): Promise<FlightDiary[]> => {
	const result = await axios.get<FlightDiary[]>(url);
	return result.data;
};

export const postNewFlightDiary = async (flightDiary: FlightDiaryNew): Promise<FlightDiary> => {
	const result = await axios.post<FlightDiary>(url, flightDiary);
	console.log(result);
	return result.data;
};
