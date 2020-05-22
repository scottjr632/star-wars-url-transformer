import { useState, useCallback, useEffect, useRef } from 'react'
import axios from 'axios'
import useBoolean from './useBoolean'


type Query<T, V> = (vars?: V) => Promise<T>
export function useQuery<TData, V>(query: Query<TData, V>, vars?: V) {
  const [error, setError] = useState(undefined);
  const [data, setData] = useState<TData | null>(null);

  const {
    bool: loading,
    setFalse: setLoadingFalse,
    setTrue: setLoadingTrue
  } = useBoolean(true)

  const queryRef = useRef(query);
  const queryVarsRef = useRef(vars);

  useEffect(() => {
    queryRef.current = query
  })

  useEffect(() => {
    queryVarsRef.current = vars
  })

  const fetchData = useCallback(async () => {
    setLoadingTrue()
    try {
      const data = await queryRef.current(queryVarsRef.current)
      setData(data)
    } catch (error) {
      setError(error)
    } finally {
      setLoadingFalse()
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [])

  return { data, error, loading, refetch: fetchData }
}

export default useQuery