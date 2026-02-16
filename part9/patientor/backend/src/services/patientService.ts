import { NonSensitivePatient } from "../types";
import patients from "../../data/patients";

const getAll = (): NonSensitivePatient[] => {
    return patients.map(({ id, name, occupation, gender, dateOfBirth }) => ({
        id,
        name,
        occupation,
        gender,
        dateOfBirth
    }));
};

export default {
    getAll
};

