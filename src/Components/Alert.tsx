import React from "react";
import { useEffect, useState } from "react";
import {
  Alert as BootstrapAlert,
  AlertProps as BootstrapAlertProps,
} from "react-bootstrap";

type AlertProps = Omit<BootstrapAlertProps, "onClose"> & {
  onClose?: () => void;
  duration?: number;
};

export const Alert = ({
  children,
  onClose,
  duration,
  className,
  ...props
}: AlertProps) => {
  const [show, setShow] = useState(true);

  const handleClose = () => {
    setShow(false);
    if (onClose) {
      onClose();
    }
  };

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    if (duration) {
      timeoutId = setTimeout(() => {
        handleClose();
      }, duration);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [duration]);

  return (
    <BootstrapAlert
      dismissible
      variant="primary"
      show={show}
      onClose={() => handleClose()}
      className={`mt-3 ${className}`}
      {...props}
    >
      {children}
    </BootstrapAlert>
  );
};
