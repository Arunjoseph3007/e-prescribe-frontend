export interface PrescriptionState {
  medicine: string;
  days: number;
  dosage: DosageState;
}

export interface DosageState {
  morning: number;
  afternoon: number;
  evening: number;
}
