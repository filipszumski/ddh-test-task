import { FormEvent, useState } from "react";
import { z } from "zod";

import { formSchema } from "./formSchema";
import { registerUser } from "../../api/registerUser";

const isKeyofFormErrors = (key: unknown): key is keyof FormErrorsState => {
  if (typeof key === "string" && key in formInitialValues) {
    return true;
  }

  throw new Error(
    `${key} in not valid field name! Check 'name' prop passed to input`
  );
};

export type FormState = z.infer<typeof formSchema>;
type FormStateValue = FormState[keyof FormState];
type FormErrorsState = Partial<Record<keyof FormState, string>>;
type SubmissionMessage = {
  type: "danger" | "success";
  message: string;
} | null;

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
  const [validated, setValidated] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionMessage, setSubmissionMessage] =
    useState<SubmissionMessage>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const parsedFormValues = formSchema.safeParse(formState);
    if (parsedFormValues.success) {
      try {
        setIsSubmitting(true);
        await registerUser(parsedFormValues.data);
        setSubmissionMessage({
          type: "success",
          message: "Dane zostały poprawnie zapisane",
        });
        setFormState(formInitialValues);
        setValidated(false);
      } catch (e) {
        setSubmissionMessage({
          type: "danger",
          message: "Wystąpił błąd podczas zapisywania danych",
        });
      }
      setIsSubmitting(false);
    } else {
      const newErrorsMap = new Map<keyof FormState, string>();
      const issues = parsedFormValues.error.issues;
      issues.forEach((issue) => {
        const key = issue.path[0];
        if (isKeyofFormErrors(key) && !newErrorsMap.has(key)) {
          newErrorsMap.set(key, issue.message);
        }
      });
      setFormErrors(Object.fromEntries(newErrorsMap));
      setValidated(true);
    }
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
    if (validated) {
      validateField(name, value);
    }

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
    submissionMessage,
    setSubmissionMessage,
    isSubmitting,
  };
};
