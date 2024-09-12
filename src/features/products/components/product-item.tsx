import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { useToast } from "@/components/ui/use-toast";
import { ProductImage } from "@/features/products/components/product-image";
import { formatPrice } from "@/utils/format-price";
import { useCart } from "@/stores/cart-store";
import { Product } from "@/types/api";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";

export function ProductItem({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);

  const { addItem } = useCart();
  const { toast } = useToast();

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <div className="flex items-start gap-3 h-24">
        <ProductImage imageId={product.image} width="w-20" height="h-20" />
        <div className="flex flex-1 flex-col">
          <span className="font-semibold">{product.name}</span>
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-sm">PHP {formatPrice(product.price)}</span>
              <span className="text-sm">
                {product.stocks} {product.stocks > 1 ? "stocks" : "stock"}
              </span>
            </div>
          </div>
        </div>
        <DrawerTrigger asChild className="self-center">
          <Button size="sm" variant="outline">
            Add to cart
          </Button>
        </DrawerTrigger>
      </div>

      <DrawerContent>
        <div className="max-w-xl w-full mx-auto p-4 space-y-4">
          <ProductImage imageId={product.image} width="w-full" height="h-52" />
          <div>
            <h3 className="font-bold">{product.name}</h3>
            <span className="font-medium">
              PHP {formatPrice(product.price)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                size="icon"
                variant="secondary"
                className="rounded-full"
                onClick={() => setQuantity(quantity - 1)}
                disabled={quantity <= 1}
              >
                <Minus className="w-4 h-4" />
              </Button>
              <span className="font-bold">{quantity}</span>
              <Button
                size="icon"
                variant="secondary"
                className="rounded-full"
                onClick={() => setQuantity(quantity + 1)}
                disabled={quantity >= product.stocks}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <span className="font-bold">
              PHP {formatPrice(product.price * quantity)}
            </span>
          </div>
          <Button
            fullWidth
            onClick={() => {
              addItem({ id: product.id, quantity, checked: true });
              setOpen(false);
              setQuantity(1);
              toast({ description: `${product.name} was added to cart` });
            }}
          >
            Add to cart
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
