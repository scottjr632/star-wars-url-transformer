import { useState, useCallback, useEffect, useRef } from 'react';

import useBoolean from './useBoolean';

interface Options<V> {
  vars?: V
  automaticFetch?: boolean
}

type Query<T, V = {}> = (vars?: V) => Promise<T>
export function useQuery<TData, V = {}>(query: Query<TData, V>, options?: Options<V>) {
  const [error, setError] = useState(undefined);
  const [data, setData] = useState<TData | null>(null);

  const {
    bool: loading,
    setFalse: setLoadingFalse,
    setTrue: setLoadingTrue,
  } = useBoolean(true);

  const queryRef = useRef(query);
  const queryVarsRef = useRef(options?.vars);

  useEffect(() => {
    queryRef.current = query;
  });

  useEffect(() => {
    queryVarsRef.current = options?.vars;
  });

  const fetchData = useCallback(async () => {
    setLoadingTrue();
    try {
      const data = await queryRef.current(queryVarsRef.current);
      setData(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoadingFalse();
    }
  }, [setLoadingTrue, setData, setError]);

  useEffect(() => {
    if (options?.automaticFetch) {
      fetchData();
    }
  }, [fetchData]);

  return { data, error, loading, refetch: fetchData };
}

export default useQuery;