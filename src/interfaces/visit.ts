import { PrescriptionState } from "./prescription";

export interface Visit {
  id: number;
  date: string;
  symptoms: string[];
  note: string;
  temperature?: number;
  sugar?: number;
  bloodPressure?: string;
  prescriptions: PrescriptionState[];
  token: string;
}
