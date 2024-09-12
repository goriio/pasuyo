import { api } from "@/lib/api-client";
import { useInfiniteQuery } from "@tanstack/react-query";

export async function getProducts({
  page,
  search,
}: {
  page: number;
  search?: string;
}) {
  const response = await api.get("/products", {
    params: {
      page,
      search,
    },
  });

  return {
    products: response.data.results,
    nextPage: response.data.next && page + 1,
  };
}

export function useProducts({ search }: { search?: string } = {}) {
  return useInfiniteQuery({
    queryKey: ["products", search],
    initialPageParam: 1,
    queryFn: ({ pageParam }) => getProducts({ page: pageParam, search }),
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });
}
