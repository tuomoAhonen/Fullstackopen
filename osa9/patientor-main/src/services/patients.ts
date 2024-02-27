import axios from 'axios';
import {Entry, EntryWithoutId, Patient, PatientFormValues} from '../types';
import {apiBaseUrl} from '../constants';

const getAll = async (): Promise<Patient[]> => {
	const {data} = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);
	return data;
};

const getPatientById = async (id: string): Promise<Patient | any> => {
	try {
		const patient = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
		return patient.data as Patient;
	} catch (error: unknown) {
		if (error instanceof Error) return error.message;
		return error;
	}
};

const create = async (object: PatientFormValues) => {
	const {data} = await axios.post<Patient>(`${apiBaseUrl}/patients`, object);
	return data;
};

const postNewEntry = async (object: EntryWithoutId, patientId: String): Promise<Entry> => {
	const {data} = await axios.post<Entry>(`${apiBaseUrl}/patients/${patientId}/entries`, object);
	return data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
	getAll,
	getPatientById,
	create,
	postNewEntry,
};

