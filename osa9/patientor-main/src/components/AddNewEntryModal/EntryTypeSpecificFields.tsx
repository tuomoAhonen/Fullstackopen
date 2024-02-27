import {EntryType} from '../../types';
import HealthCheckFields from './EntryTypeSpecificFields/HealthCheckFields';
import HospitalFields from './EntryTypeSpecificFields/HospitalFields';
import OccupationalHealthcareFields from './EntryTypeSpecificFields/OccupationalHealthcareFields';

const EntryTypeSpecificFields = ({type}: {type: EntryType}) => {
	switch (type) {
	case EntryType.HealthCheck:
		return <HealthCheckFields />;
	case EntryType.Hospital:
		return <HospitalFields />;
	case EntryType.OccupationalHealthcare:
		return <OccupationalHealthcareFields />;
	default:
		return null;
	}
};

export default EntryTypeSpecificFields;
