import { FormEvent, useState } from "react";
import { z } from "zod";

import { formSchema } from "./formSchema";

const isKeyofFormErrors = (key: unknown): key is keyof FormErrorsState => {
  if (typeof key === "string" && key in formInitialValues) {
    return true;
  }

  throw new Error(
    `${key} in not valid field name! Check 'name' prop passed to input`
  );
};

type FormState = z.infer<typeof formSchema>;
type FormStateValue = FormState[keyof FormState];
type FormErrorsState = Partial<Record<keyof FormState, string>>;

export const formInitialValues = {
  fullName: "",
  birthDate: "",
  email: "",
  department: "",
  termsOfUse: false,
};

export const useForm = () => {
  const [formState, setFormState] = useState<FormState>(formInitialValues);
  const [formErrors, setFormErrors] = useState<FormErrorsState>({});

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: Wyślij dane
  };

  const validateField = (key: string, value: FormStateValue) => {
    if (!isKeyofFormErrors(key)) {
      return;
    }

    const parsedValue = formSchema.shape[key].safeParse(value);

    setFormErrors((prev) => ({
      ...prev,
      [key]: !parsedValue.success
        ? parsedValue.error.issues[0].message
        : undefined,
    }));
  };

  const handleChange = (name: string, value: FormStateValue) => {
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBlur = (name: string, value: FormStateValue) => {
    validateField(name, value);
  };

  return {
    formState,
    formErrors,
    handleSubmit,
    handleChange,
    handleBlur,
  };
};
