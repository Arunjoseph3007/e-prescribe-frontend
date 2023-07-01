import { Session } from "@/interfaces/sessions";
import axios from "@/libs/axios";

export const getSessions = async (id: string) => {
  const res = await axios.get(`/main/session/${id}/`);
  const sessions: Session[] = (res.data as any[]).map((session) => ({
    id: session.session_id,
    title: session.session_name,
    lastVisit: session.last_vist,
    noOfVisits: session.num_visit,
    startDate: session.start_date,
  }));

  return sessions;
};

export const getSessionForPatient = async (doctorId: number) => {
  const { data } = await axios.get(`/main/patientgetsession/${doctorId}/`);

  const sessions: Session[] = (data as any[]).map((session) => ({
    id: session.session_id,
    title: session.session_name,
    lastVisit: session.last_vist,
    noOfVisits: session.num_visit,
    startDate: session.start_date,
  }));

  return sessions;
};

export const getRecentSessions = async () => {
  const sessions: Session[] = [1, 2, 3, 4, 5].map((s) => ({
    id: s,
    title: "Cough and cold",
    lastVisit: new Date().toString(),
    startDate: new Date().toString(),
    noOfVisits: Math.floor(Math.random() * 10),
  }));

  return sessions;
};

export const postSession = async (title: string, patientId: number) => {
  const res = await axios.post("/main/session/", {
    patient_id: patientId,
    session_name: title,
  });
  return res.data;
};
