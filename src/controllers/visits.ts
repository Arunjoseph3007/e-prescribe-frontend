import { Visit } from "@/interfaces/visit";
import axios from "@/libs/axios";

export const getVisits = async (id: string) => {
  const res = await axios.get(`/main/sessionvisit/?session=${id}`);

  const visits: Visit[] = res.data.map((visit: any) => ({
    id: visit.visit_id,
    date: visit.visit_date,
    symptoms: visit.symptoms.split(","),
    note: visit.note,
    temperature: visit.temperature,
    sugar: visit.sugar,
    bloodPressure: visit.bp,
  }));

  return visits
};
