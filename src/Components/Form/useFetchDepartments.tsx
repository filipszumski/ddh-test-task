import { useEffect, useState } from "react";

import { Department, getDepartments } from "../../api/getDepartments";

export const useFetchDepartments = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const refetch = () => {
    if (!isLoading && (errorMessage || !departments.length)) {
      setIsLoading(true);
    }
  };

  useEffect(() => {
    if (isLoading) {
      (async () => {
        try {
          const data = await getDepartments();
          setDepartments(data);
          setErrorMessage("");
        } catch (e) {
          setErrorMessage("Wystąpił błąd podczas pobierania danych");
        }
        setIsLoading(false);
      })();
    }
  }, [isLoading]);

  return {
    departments,
    isLoading,
    errorMessage,
    refetch,
    setErrorMessage,
  };
};
