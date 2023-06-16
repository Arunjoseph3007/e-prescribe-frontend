import { Session } from "@/interfaces/sessions";

export const getSessions = async (id: string) => {
  const sessions: Session[] = [
    {
      id: 1,
      title: "Mild fever",
      lastVisit: new Date().toString(),
      noOfVisits: 6,
      startDate: new Date().toString(),
    },
    {
      id: 2,
      title: "Mild fever",
      lastVisit: new Date().toString(),
      noOfVisits: 6,
      startDate: new Date().toString(),
    },
    {
      id: 3,
      title: "Mild fever",
      lastVisit: new Date().toString(),
      noOfVisits: 6,
      startDate: new Date().toString(),
    },
    {
      id: 4,
      title: "Mild fever",
      lastVisit: new Date().toString(),
      noOfVisits: 6,
      startDate: new Date().toString(),
    },
    {
      id: 5,
      title: "Mild fever",
      lastVisit: new Date().toString(),
      noOfVisits: 6,
      startDate: new Date().toString(),
    },
    {
      id: 6,
      title: "Mild fever",
      lastVisit: new Date().toString(),
      noOfVisits: 6,
      startDate: new Date().toString(),
    },
    {
      id: 7,
      title: "Mild fever",
      lastVisit: new Date().toString(),
      noOfVisits: 6,
      startDate: new Date().toString(),
    },
    {
      id: 8,
      title: "Mild fever",
      lastVisit: new Date().toString(),
      noOfVisits: 6,
      startDate: new Date().toString(),
    },
  ];

  return sessions;
};
