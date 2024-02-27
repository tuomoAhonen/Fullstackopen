export enum Gender {
	Male = `male`,
	Female = `female`,
	Other = `other`,
}

export enum EntryType {
	HealthCheck = `HealthCheck`,
	Hospital = `Hospital`,
	OccupationalHealthcare = `OccupationalHealthcare`,
}

export interface Diagnose {
	code: string;
	name: string;
	latin?: string;
}

export interface EntryBase {
	id: string;
	date: string;
	description: string;
	specialist: string;
	diagnosisCodes?: Array<Diagnose[`code`]>;
}

export enum HealthCheckRating {
	Healthy = 0,
	LowRisk = 1,
	HighRisk = 2,
	CriticalRisk = 3,
}

export interface HealthCheckEntry extends EntryBase {
	type: `HealthCheck`;
	healthCheckRating: HealthCheckRating;
}

export interface HealthCheckEntryWithoutBase {
	type: `HealthCheck`;
	healthCheckRating: HealthCheckRating;
}

export interface Discharge {
	date: string;
	criteria: string;
}

export interface HospitalEntry extends EntryBase {
	type: `Hospital`;
	discharge?: Discharge;
}

export interface HospitalEntryWithoutBase {
	type: `Hospital`;
	discharge?: Discharge;
}

export interface SickLeave {
	startDate: string;
	endDate: string;
}

export interface OccupationalHealthCareEntry extends EntryBase {
	type: `OccupationalHealthcare`;
	employerName: string;
	sickLeave?: SickLeave;
}

export interface OccupationalHealthCareEntryWithoutBase {
	type: `OccupationalHealthcare`;
	employerName: string;
	sickLeave?: SickLeave;
}

export type HealthCheckEntryWithoutId = Omit<HealthCheckEntry, `id`>;
export type HospitalEntryWithoutId = Omit<HospitalEntry, `id`>;
export type OccupationalHealthCareEntryWithoutId = Omit<OccupationalHealthCareEntry, `id`>;

export type Entry = HealthCheckEntry | HospitalEntry | OccupationalHealthCareEntry;

export type EntryWithoutId =
	| Omit<HealthCheckEntry, `id`>
	| Omit<HospitalEntry, `id`>
	| Omit<OccupationalHealthCareEntry, `id`>;

export type EntryWithoutBase =
	| HealthCheckEntryWithoutBase
	| HospitalEntryWithoutBase
	| OccupationalHealthCareEntryWithoutBase;

export interface Patient {
	id: string;
	name: string;
	occupation: string;
	gender: Gender;
	ssn?: string;
	dateOfBirth?: string;
	entries: Entry[];
}

export type PatientFormValues = Omit<Patient, `id` | `entries`>;

