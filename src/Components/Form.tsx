import React, { FormEvent, useState } from "react";
import { z } from "zod";

import { formSchema } from "./formSchema";
import { Input } from "./Input";
import { Select } from "./Select";

type FormState = z.infer<typeof formSchema>;
type FormStateValue = FormState[keyof FormState];
type FormErrorsState = Partial<Record<keyof FormState, string>>;

const isKeyofFormErrors = (key: unknown): key is keyof FormErrorsState => {
  if (typeof key === "string" && key in formInitialValues) {
    return true;
  }

  throw new Error(
    `${key} in not valid field name! Check 'name' prop passed to input`
  );
};

export const formInitialValues = {
  fullName: "",
  birthDate: "",
  email: "",
  department: "",
  termsOfUse: false,
};

export const Form = () => {
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

  return (
    <form className="mt-5" onSubmit={handleSubmit}>
      <div className="mb-3">
        <Input
          value={formState.fullName}
          onChange={({ target: { name, value } }) => handleChange(name, value)}
          onBlur={({ target: { name, value } }) => handleBlur(name, value)}
          label="Imię i nazwisko"
          error={formErrors.fullName}
          name="fullName"
          placeholder="Imię i nazwisko"
        />
      </div>
      <div className="mb-3">
        <Input
          value={formState.birthDate}
          onChange={({ target: { name, value } }) => handleChange(name, value)}
          onBlur={({ target: { name, value } }) => handleBlur(name, value)}
          label="Data urodzenia"
          error={formErrors.birthDate}
          name="birthDate"
          placeholder="DD/MM/YYYY"
        />
      </div>
      <div className="mb-3">
        <Input
          value={formState.email}
          onChange={({ target: { name, value } }) => handleChange(name, value)}
          onBlur={({ target: { name, value } }) => handleBlur(name, value)}
          label="Email"
          error={formErrors.email}
          name="email"
          type="email"
          placeholder="user@example.com"
        />
      </div>
      <div className="mb-3">
        <Select
          value={formState.department}
          defaultValue={formInitialValues.department}
          onChange={({ target: { name, value } }) => handleChange(name, value)}
          onBlur={({ target: { name, value } }) => handleBlur(name, value)}
          options={[
            { id: "1", name: "Wydział1" },
            { id: "2", name: "Wydział2" },
          ]}
          error={formErrors.department}
          label="Wydział"
          name="department"
        />
      </div>
      <div className="form-check">
        <Input
          checked={formState.termsOfUse}
          onChange={({ target: { name, checked } }) =>
            handleChange(name, checked)
          }
          label="Akceptuję regulamin"
          error={formErrors.termsOfUse}
          name="termsOfUse"
          type="checkbox"
        />
      </div>
      <div className="d-grid gap-2 d-md-flex justify-content-md-end">
        <button type="submit" className="btn btn-primary">
          Zapisz
        </button>
      </div>
    </form>
  );
};
