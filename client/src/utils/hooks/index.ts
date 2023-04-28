import { useCallback, useState } from "react";

export const useApi = <T>(initState?: T) => {
  const [data, setData] = useState(initState || null);
  const [isError, setIsError] = useState(false);

  const updateData = useCallback(
    (newData: typeof data) => {
      setData(newData);
    },
    [setData]
  );

  return { data, updateData, isError, setIsError };
};
