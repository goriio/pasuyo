import { useCartProducts } from "../api/get-cart-products";
import { formatPrice } from "@/utils/format-price";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import { useCart } from "@/stores/cart-store";
import { useNavigate } from "react-router-dom";
import { ProductImage } from "@/features/products/components/product-image";
import { getTotalItems, getTotalPrice } from "@/utils/cartUtils";
import { Skeleton } from "@/components/ui/skeleton";

export function Cart() {
  const { data: items, isLoading } = useCartProducts();
  const {
    incrementQuantity,
    decrementQuantity,
    toggleCheck,
    toggleSelectAll,
    isAllSelected,
    deleteSelected,
  } = useCart();

  const navigate = useNavigate();

  if (!items || isLoading) {
    return (
      <>
        <div className="flex items-center justify-between mt-3 mb-4">
          <Skeleton className="h-4 w-10" />
          <div className="flex gap-6">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          {Array.from({ length: 2 }).map((_, index) => {
            return (
              <div key={index} className="flex gap-3 h-24">
                <Skeleton className="w-6 h-6" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="w-32 h-6" />
                  <Skeleton className="w-28 h-6" />
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Skeleton className="w-8 h-8 rounded-full" />
                      <Skeleton className="w-4 h-6" />
                      <Skeleton className="w-8 h-8 rounded-full" />
                    </div>
                    <Skeleton className="w-12 h-6" />
                  </div>
                </div>
                <Skeleton className="w-20 h-20" />
              </div>
            );
          })}
        </div>
      </>
    );
  }

  if (items?.length === 0) {
    return (
      <div className="mt-12 flex flex-col items-center">
        <p className="mb-4">No items. Try adding products to cart.</p>
        <Button onClick={() => navigate("/")}>Go back to homepage</Button>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center justify-between mb-4 text-gray-700 text-sm">
        <span>
          {getTotalItems(items)} {getTotalItems(items) > 1 ? "items" : "item"}
        </span>
        <div className="flex">
          <Button onClick={() => toggleSelectAll()} variant="ghost" size="sm">
            {isAllSelected() ? "Deselect All" : "Select All"}
          </Button>
          <Button onClick={() => deleteSelected()} variant="ghost" size="sm">
            Delete Selected
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        {items?.map((item) => {
          return (
            <div key={item.id} className="flex gap-3 h-24">
              <Checkbox
                checked={item.checked}
                onCheckedChange={() => toggleCheck(item.id)}
              />
              <div className="flex-1 space-y-2">
                <h3 className="font-bold">{item.name}</h3>
                <span className="text-sm">
                  PHP {formatPrice(item.price)} &bull; {item.stocks}{" "}
                  {item.stocks > 1 ? "stocks" : "stock"}
                </span>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Button
                      size="icon"
                      variant="secondary"
                      className="rounded-full w-8 h-8"
                      onClick={() => decrementQuantity(item.id)}
                      disabled={item.quantity <= 1}
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="font-bold text-sm">{item.quantity}</span>
                    <Button
                      size="icon"
                      variant="secondary"
                      className="rounded-full w-8 h-8"
                      onClick={() => incrementQuantity(item.id)}
                      disabled={item.quantity >= item.stocks}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <span className="text-sm">
                    PHP {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              </div>
              <ProductImage imageId={item.image} width="w-20" height="h-20" />
            </div>
          );
        })}
      </div>

      <Button
        onClick={() => navigate("/checkout")}
        fullWidth
        className="flex items-center justify-between my-8"
        disabled={getTotalItems(items) === 0}
      >
        <span>Place order</span>
        <span>PHP {formatPrice(getTotalPrice(items))}</span>
      </Button>
    </>
  );
}
