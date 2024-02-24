import React, { useId } from "react";
import { InputHTMLAttributes } from "react";

type Option = {
  id: number;
  name: string;
};

type SelectProps = InputHTMLAttributes<HTMLSelectElement> & {
  label: string;
  error?: string;
  options: Option[];
  defaultValue?: string;
  loading?: boolean;
};

export const Select = ({
  label,
  error,
  options,
  defaultValue,
  className,
  loading,
  ...props
}: SelectProps) => {
  const id = useId();

  return (
    <>
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <select
        className={`form-select ${error && "is-invalid"} ${className}`}
        id={id}
        {...props}
      >
        <option value={defaultValue} disabled hidden>
          {loading ? "Loading..." : "Wybierz oddział"}
        </option>
        {options.map(({ id, name }) => (
          <option key={id} value={id}>
            {name}
          </option>
        ))}
      </select>
      <div className="invalid-feedback">{error}</div>
    </>
  );
};
