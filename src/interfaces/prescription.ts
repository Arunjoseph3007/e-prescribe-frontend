import { Medicine } from "./medicine";

export interface PrescriptionState {
  id?: number;
  medicine: Medicine;
  days: number;
  dosage: DosageState;
}

export interface DosageState {
  morning: number;
  afternoon: number;
  evening: number;
}
