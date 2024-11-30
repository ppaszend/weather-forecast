import { ILocation } from "@/interfaces";
interface INames {
  de?: string;
  en: string;
  es?: string;
  fa?: string;
  fr?: string;
  ja?: string;
  ko?: string;
  "pt-BR"?: string;
  ru?: string;
  "zh-CN"?: string;
}

interface IResponse {
  city: {
    name: string;
    names: INames;
  };
  continent: {
    code: string;
    geoname_id: number;
    names: INames;
    name: string;
  };
  country: {
    geoname_id: number;
    is_in_european_union: boolean;
    iso_code: string;
    names: INames;
    name: string;
    name_native: string;
    phone_code: string;
    capital: string;
    currency: string;
    flag: string;
    languages: {
      iso_code: string;
      name: string;
      name_native: string;
    }[];
  };
  location: {
    latitude: number;
    longitude: number;
  };
  subdivisions: {
    names: INames;
  }[];
  state: {
    name: string;
  };
  datasource: {
    name: string;
    attribution: string;
    license: string;
  }[];
  ip: string;
}

export default function getLocationFromIpAddress(): Promise<ILocation> {
  return new Promise((resolve, reject) => {
    const searchParams = new URLSearchParams({
      apiKey: import.meta.env.VITE_GEOAPIFY_API_KEY,
    });

    const url = new URL("https://api.geoapify.com/v1/ipinfo?" + searchParams);

    fetch(url)
      .then((res) => res.json())
      .then((data: IResponse) => {
        resolve({
          id: "my-location",
          city: data.city.name,
          country: data.country.name,
          longitude: data.location.longitude,
          latitude: data.location.latitude,
          label: `${data.city.name}, ${data.country.name}`,
        });
      })
      .catch(reject);
  });
}
