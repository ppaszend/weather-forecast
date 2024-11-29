import { ILocation } from "@/interfaces";

export default function getLocationFromIpAddress(): Promise<ILocation> {
  return new Promise((resolve, reject) => {
    fetch(
      `https://api.geoapify.com/v1/ipinfo?apiKey=773cec6838474a679f3543cc83cda5d9`,
    )
      .then((res) => res.json())
      .then((data) => {
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
