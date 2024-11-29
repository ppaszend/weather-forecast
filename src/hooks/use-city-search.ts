import { useEffect, useState } from "react";
import { ILocation } from "@/interfaces";
import { getLocationsByQuery } from "@/api";

interface IProps {
  searchQuery: string;
}

export default function useCitySearch({ searchQuery }: IProps) {
  const [results, setResults] = useState<ILocation[]>([]);

  useEffect(() => {
    getLocationsByQuery(searchQuery).then(setResults);
  }, [searchQuery]);

  return { results };
}
