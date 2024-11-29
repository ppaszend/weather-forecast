import { ICoordinates, ILocation } from "@/interfaces";

export default function getLocationFromCoordinates(
  coordinates: ICoordinates,
): Promise<ILocation> {
  return new Promise((resolve, reject) => {
    fetch(
      `https://api.geoapify.com/v1/geocode/reverse?lat=${coordinates.latitude}&lon=${coordinates.longitude}&apiKey=773cec6838474a679f3543cc83cda5d9`,
    )
      .then((res) => res.json())
      .then((data) => {
        resolve({
          id: data.features[0]?.properties.place_id,
          city: data.features[0]?.properties.city,
          country: data.features[0]?.properties.country,
          longitude: data.features[0]?.properties.lon,
          latitude: data.features[0]?.properties.lat,
          label: `${data.features[0]?.properties.city}, ${data.features[0]?.properties.country}`,
        });
      })
      .catch(reject);
  });
}
