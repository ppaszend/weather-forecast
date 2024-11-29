import { ILocation } from "@/interfaces";

export default function getLocationsByQuery(
  query: string,
): Promise<ILocation[]> {
  return new Promise((resolve, reject) => {
    if (query.length < 3) {
      resolve([]);
      return;
    }

    fetch(
      `https://api.geoapify.com/v1/geocode/autocomplete?text=${query}&type=city&format=json&apiKey=773cec6838474a679f3543cc83cda5d9`,
    )
      .then((res) => res.json())
      .then((data) => {
        resolve(
          data.results.map((result: any) => ({
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
