import React from "react";

import { Input } from "../Input";
import { Select } from "../Select";
import { useForm, formInitialValues } from "./useForm";

export const Form = () => {
  const { formErrors, formState, handleBlur, handleChange, handleSubmit } =
    useForm();

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
