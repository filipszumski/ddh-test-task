import { useEffect, useState } from "react";

import { Department, getDepartments } from "../../api/getDepartments";

export const useFetchDepartments = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [shouldFetch, setShouldFetch] = useState(true);

  const refetch = () => {
    if (!isLoading && (errorMessage || !departments.length)) {
      setShouldFetch(true);
    }
  };

  useEffect(() => {
    if (shouldFetch) {
      (async () => {
        try {
          setIsLoading(true);
          const data = await getDepartments();
          setDepartments(data);
          setErrorMessage("");
        } catch (e) {
          setErrorMessage("An error occurred while fetching departments");
        }
        setIsLoading(false);
        setShouldFetch(false);
      })();
    }
  }, [shouldFetch]);

  return {
    departments,
    isLoading,
    errorMessage,
    refetch,
    setErrorMessage,
  };
};
