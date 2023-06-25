import { Session } from "@/interfaces/sessions";
import axios from "@/libs/axios";

export const getSessions = async (id: string) => {
  const res = await axios.get(`/main/session/${id}/`);
  const sessions: Session[] = (res.data as any[]).map((session) => ({
    id: session.session_id,
    title: session.session_name,
    lastVisit: session.last_visit,
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
