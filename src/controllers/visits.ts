import { Visit } from "@/interfaces/visit";
import axios from "@/libs/axios";

export const getVisits = async (id: string) => {
  const res = await axios.get(`/main/sessionvisit/?session=${id}`);

  const visits: Visit[] = (res.data as any[]).map((visit: any) => ({
    id: visit.visit_id,
    date: visit.visit_date,
    symptoms: visit.symptoms.split(","),
    note: visit.note,
    temperature: visit.temperature,
    sugar: visit.sugar,
    bloodPressure: visit.bp,
    prescriptions: (visit.prescription as any[]).map((pres) => ({
      id: pres.pres_id,
      days: pres.num_days,
      medicine: {
        id: 0,
        name: pres.medicine,
      },
      dosage: {
        morning: pres.morning,
        afternoon: pres.afternoon,
        evening: pres.night,
      },
    })),
  }));

  return visits;
};

export const postVisit = async (
  visit: Omit<Visit, "id" | "date">,
  sessionId: number
) => {
  const res = await axios.post("/main/visit/", {
    visitDetails: {
      session: sessionId,
      note: visit.note,
      symptoms: visit.symptoms.join(","),
      temperature: visit.temperature,
      sugar: visit.sugar,
      bp: visit.bloodPressure,
    },
    prescription: visit.prescriptions.map((pres) => ({
      medicine: pres.medicine.id,
      num_days: pres.days,
      morning: pres.dosage.morning,
      afternoon: pres.dosage.afternoon,
      night: pres.dosage.evening,
    })),
  });

  return res.data;
};

export const getRecentVisits = async () => {
  const { data } = await axios.get("/main/patientgetrecentvisit/");
  const visits: Visit[] = (data as any[]).map((visit) => ({
    id: visit.visit_id,
    date: visit.visit_date,
    symptoms: visit.symptoms.split(","),
    note: visit.note,
    temperature: visit.temperature,
    sugar: visit.sugar,
    bloodPressure: visit.bp,
    prescriptions: (visit.prescription as any[]).map((pres) => ({
      id: pres.pres_id,
      days: pres.num_days,
      medicine: {
        id: 0,
        name: pres.medicine,
      },
      dosage: {
        morning: pres.morning,
        afternoon: pres.afternoon,
        evening: pres.night,
      },
    })),
  }));

  return visits;
};
