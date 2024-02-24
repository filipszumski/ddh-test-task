import axios from "axios";

import { FormState } from "../Components/Form/useForm";

export const registerUser = async (userData: FormState) => {
  await axios.post(
    "https://ddh-front-default-rtdb.europe-west1.firebasedatabase.app/users.json",
    userData
  );
};
