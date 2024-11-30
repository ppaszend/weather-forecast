import { ILocation } from "@/interfaces";

interface IResponse {
  results: {
    datasource: {
      sourcename: string;
      attribution: string;
      license: string;
      url: string;
    };
    country: string;
    country_code: string;
    state: string;
    city: string;
    village: string;
    postcode: string;
    district: string;
    suburb: string;
    street: string;
    housenumber: string;
    lon: number;
    lat: number;
    state_code: string;
    result_type: string;
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
    plus_code_short: string;
    rank: {
      importance: number;
      confidence: number;
      confidence_city_level: number;
      confidence_street_level: number;
      confidence_building_level: number;
      match_type: string;
    };
    place_id: string;
    bbox: {
      lon1: number;
      lat1: number;
      lon2: number;
      lat2: number;
    };
  }[];
  query: {
    text: string;
    parsed: {
      housenumber: string;
      street: string;
      city: string;
      expected_type: string;
    };
  };
}

export default function getLocationsByQuery(
  query: string,
): Promise<ILocation[]> {
  return new Promise((resolve, reject) => {
    if (query.length < 3) {
      resolve([]);
      return;
    }

    const searchParams = new URLSearchParams({
      text: query,
      type: "city",
      format: "json",
      apiKey: import.meta.env.VITE_GEOAPIFY_API_KEY,
    });

    const url = new URL(
      "https://api.geoapify.com/v1/geocode/autocomplete?" + searchParams,
    );

    fetch(url)
      .then((res) => res.json())
      .then((data: IResponse) => {
        resolve(
          data.results.map((result) => ({
            id: result.place_id,
            city: result.city,
            country: result.country,
            longitude: result.lon,
            latitude: result.lat,
            label: `${result.city}, ${result.country}`,
          })),
        );
      })
      .catch(reject);
  });
}
