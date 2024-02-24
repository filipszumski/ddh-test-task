import axios from "axios";

export type Department = {
  id: number;
  name: string;
};

export const getDepartments = async () => {
  const response = await axios.get<Department[]>(
    "https://ddh-front-default-rtdb.europe-west1.firebasedatabase.app/departments.json"
  );
  return response.data;
};
