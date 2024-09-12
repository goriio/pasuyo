import { api } from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";

export async function getImage(imageId: string) {
  const response = await api.get(`/images/${imageId}`);
  return response.data;
}

export function useImage(imageId: string) {
  return useQuery({
    queryKey: ["image", imageId],
    queryFn: () => getImage(imageId),
  });
}
