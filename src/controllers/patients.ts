import { Patient } from "@/interfaces/patient";
import axios from "@/libs/axios";

const searchPatient = async (patient: string) => {
  const { data } = await axios.get("/main/patientsearch/", {
    params: { patient },
  });

  const patients: Patient[] = (data as any[]).map((patient) => ({
    id: patient.user_id,
    firstName: patient.first_name,
    lastName: patient.last_name,
    userName: patient.username,
    age: patient.age,
  }));

  return patients;
};

const getPatients = async () => {
  const { data } = await axios.get("/main/patientdetails/");

  const patients: Patient[] = (data.patient_details as any[]).map(
    (patient) => ({
      id: patient.user_id,
      firstName: patient.first_name,
      lastName: patient.last_name,
      userName: patient.username,
      age: patient.age,
    })
  );

  return patients;
};

export const PatientController = {
  searchPatient,
  getPatients,
};
