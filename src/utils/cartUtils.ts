import { CartItem } from "@/stores/cart-store";
import { Product } from "@/types/api";

export function getTotalPrice(items: (CartItem & Product)[]) {
  return (
    items?.reduce((total, item) => {
      return item.checked ? item.price * item.quantity + total : total;
    }, 0) || 0
  );
}

export function getTotalItems(items: (CartItem & Product)[]) {
  return items.reduce((total, item) => {
    return item.checked ? item.quantity + total : total;
  }, 0);
}
