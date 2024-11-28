interface IGeoResponse {
  results:
    | {
        id: number;
        name: string;
        latitude: number;
        longitude: number;
        country: string;
        admin1?: string;
      }[]
    | undefined;
}

export default IGeoResponse;
