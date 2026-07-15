import { getLocationsByQuery } from "@/api";
import { useQuery } from "@tanstack/react-query";

interface IProps {
  searchQuery: string;
}

export default function useCitySearch({ searchQuery }: IProps) {
  const query = useQuery({
    queryKey: ['search', searchQuery],
    queryFn: ({ signal }) => getLocationsByQuery(searchQuery, signal),
    enabled: searchQuery.length >= 2,
  });

  return { results: query.data ?? [] };
}
