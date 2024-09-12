import { api } from "@/lib/api-client";
import { useCart } from "@/stores/cart-store";
import { useQuery } from "@tanstack/react-query";

export async function getCartProductsById(id: string) {
  const response = await api.get(`products/${id}`);
  return response.data;
}

export function useCartProducts() {
  const { items } = useCart();

  return useQuery({
    queryKey: ["cartProducts", items.map((item) => item.id)],
    queryFn: () => {
      const promises = items.map((item) => getCartProductsById(item.id));
      return Promise.all(promises);
    },
    select: (products) => {
      return products.map((product) => ({
        ...product,
        quantity: items.find((item) => product.id === item.id)?.quantity,
        checked: items.find((item) => product.id === item.id)?.checked,
      }));
    },
    initialData: [],
  });
}
