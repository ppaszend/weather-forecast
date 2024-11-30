import { ICoordinates, ILocation } from "@/interfaces";

interface IResult {
  country_code: string;
  name: string;
  country: string;
  county: string;
  datasource: string;
  state: string;
  district: string;
  city: string;
  lon: number;
  lat: number;
  distance: number;
  result_type: string;
  postcode: string;
  formatted: string;
  address_line1: string;
  address_line2: string;
  timezone: {
    name: string;
    offset_STD: string;
    offset_STD_seconds: number;
    offset_DST: string;
    offset_DST_seconds: number;
    abbreviation_STD: string;
    abbreviation_DST: string;
  };
  plus_code: string;
  rank: {
    popularity: number;
  };
  place_id: string;
}

interface IResponse {
  results: IResult[];
  query: {
    lat: number;
    lon: number;
    plus_code: string;
  };
}

export default function getLocationFromCoordinates(
  coordinates: ICoordinates,
): Promise<ILocation> {
  const searchParams = new URLSearchParams({
    lat: coordinates.latitude.toString(),
    lon: coordinates.longitude.toString(),
    format: "json",
    apiKey: import.meta.env.VITE_GEOAPIFY_API_KEY,
  });

  const url = new URL(
    "https://api.geoapify.com/v1/geocode/reverse?" + searchParams,
  );

  return new Promise((resolve, reject) => {
    fetch(url)
      .then((res) => res.json())
      .then((data: IResponse) => {
        const result = data.results[0];

        resolve({
          id: result?.place_id,
          city: result?.city,
          country: result?.country,
          longitude: result?.lon,
          latitude: result?.lat,
          label: `${result?.city}, ${data.results[0]?.country}`,
        });
      })
      .catch(reject);
  });
}
