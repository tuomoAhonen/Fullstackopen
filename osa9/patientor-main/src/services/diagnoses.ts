import axios from 'axios';
import {Diagnose} from '../types';

import {apiBaseUrl} from '../constants';

const getDiagnoses = async (): Promise<Diagnose[]> => {
	const diagnoses = await axios.get<Diagnose[]>(`${apiBaseUrl}/diagnoses`);
	return diagnoses.data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {getDiagnoses};
