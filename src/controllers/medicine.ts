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

export const MedicineController = {
  searchMedicine,
};
