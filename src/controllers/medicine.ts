import { Medicine } from "@/interfaces/medicine";
import axios from "@/libs/axios";

const searchMedicine = async (query: string) => {
  const res = await axios.get("/prescription/medicinesearch/", {
    params: { med_name: query },
  });

  const results: Medicine[] = (res.data as any[]).map((med) => ({
    id: med.med_id,
    name: med.med_name,
  }));

  return results;
};

const suggestMedicine = async (med_name: string) => {
  const { data } = await axios.post("/prescription/medicinesuggest/", {
    med_name,
  });

  return data;
};

export const MedicineController = {
  searchMedicine,
  suggestMedicine,
};
