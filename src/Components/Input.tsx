import React, { useId } from "react";
import { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

export const Input = ({ label, error, className, ...props }: InputProps) => {
  const id = useId();

  if (props.type === "checkbox") {
    return (
      <>
        <input
          id={id}
          className={`form-check-input ${error && "is-invalid"} ${className}`}
          {...props}
        />
        <label htmlFor={id} className="form-check-label">
          {label}
        </label>
        <div role="alert" className="invalid-feedback">
          {error}
        </div>
      </>
    );
  }

  return (
    <>
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <input
        id={id}
        className={`form-control ${error && "is-invalid"} ${className}`}
        {...props}
      />
      <div role="alert" className="invalid-feedback">
        {error}
      </div>
    </>
  );
};
