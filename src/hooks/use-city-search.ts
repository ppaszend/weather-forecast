import { useEffect, useState } from "react";
import { ICity, IGeoResponse } from "@/interfaces";

export default function useCitySearch({ query }: { query: string }) {
  const [results, setResults] = useState<ICity[]>([]);

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }

    fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${query}&count=10&language=en&format=json`,
    )
      .then((res) => res.json())
      .then((data: IGeoResponse) => {
        setResults(
          data.results?.map((city) => ({
            id: city.id,
            name: city.name,
            latitude: city.latitude,
            longitude: city.longitude,
            country: city.country,
            admin1: city.admin1,
          })) || [],
        );
      });
  }, [query]);

  return { results };
}
