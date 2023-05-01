import { useCallback, useState } from "react";

export const useApi = <T>(initState?: T) => {
  const [data, setData] = useState(initState || null);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(1);

  const updateData = useCallback(
    (newData: typeof data) => {
      setData(newData);
    },
    [setData]
  );

  const updateLoading = useCallback(
    (value: boolean) => {
      setIsLoading(value);
    },
    [setIsLoading]
  );

  const updatePage = useCallback(
    (value: number) => {
      setPage(value);
    },
    [setPage]
  );

  const updateCount = useCallback(
    (value: number) => {
      setCount(value);
    },
    [setCount]
  );

  return {
    data,
    updateData,
    isError,
    setIsError,
    isLoading,
    updateLoading,
    page,
    updatePage,
    count,
    updateCount,
  };
};
