import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { useCartProducts } from "@/features/cart/api/get-cart-products";
import { ProductImage } from "@/features/products/components/product-image";
import { api } from "@/lib/api-client";
import { useAuth } from "@/stores/auth-store";
import { useCart } from "@/stores/cart-store";
import { getTotalPrice } from "@/utils/cartUtils";
import { formatPrice } from "@/utils/format-price";
import { zodResolver } from "@hookform/resolvers/zod";
import { isAxiosError } from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

const deliveryAddressForm = z.object({
  houseNoAndStreet: z
    .string()
    .min(1, { message: "House no and street is required" }),
  brgy: z.string().min(1, { message: "Brgy is required" }),
  municipalityOrCity: z
    .string()
    .min(1, { message: "Municipality or city is required" }),
  province: z.string().min(1, { message: "Province is required" }),
});

export function CheckoutRoute() {
  const [isDeliveryAddressUpdating, setIsDeliveryAddressUpdating] =
    useState(false);
  const [orderNoCancellation, setOrderNoCancellation] = useState(false);

  const { user } = useAuth();
  const { data: items, isLoading } = useCartProducts();
  const { deleteSelected } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<z.infer<typeof deliveryAddressForm>>({
    resolver: zodResolver(deliveryAddressForm),
    values: JSON.parse(localStorage.getItem("deliveryAddress") || "{}"),
  });

  const deliveryAddress = getValues();
  const isDeliveryAddressEmpty = Object.values(deliveryAddress).every(
    (value) => value === ""
  );
  const filteredItems = items?.filter((item) => item.checked);

  function handleDeliveryFormSubmit(
    values: z.infer<typeof deliveryAddressForm>
  ) {
    localStorage.setItem("deliveryAddress", JSON.stringify(values));
    setIsDeliveryAddressUpdating(false);
  }

  async function placeOrder() {
    if (isDeliveryAddressEmpty) {
      return toast({
        variant: "destructive",
        description: "Delivery address is required",
      });
    }

    if (!orderNoCancellation) {
      return toast({
        variant: "destructive",
        description:
          "Please check the box to confirm that you understand orders cannot be canceled once placed.",
      });
    }

    try {
      await api.post(
        "/orders",
        {
          deliveryAddress: Object.values(deliveryAddress).join(", "),
          additionalContactNumber: "09",
          orderItems: filteredItems?.map(({ id, quantity }) => ({
            product: id,
            quantity,
          })),
        },
        { headers: { Authorization: `Token ${user?.token}` } }
      );

      deleteSelected();

      toast({
        description: "Order placed",
      });

      navigate("/");
    } catch (error) {
      if (isAxiosError(error)) {
        toast({
          variant: "destructive",
          description: error.response?.data.message,
        });
      } else {
        toast({ variant: "destructive", description: "Something went wrong" });
      }
    }
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <h2 className="font-semibold text-lg">Checkout</h2>
      <Separator className="mt-4 mb-8" />
      <div className="flex flex-col gap-4">
        {filteredItems?.map((item) => {
          return (
            <div key={item.id} className="flex gap-3 h-24">
              <div className="flex-1 space-y-2">
                <h3 className="font-bold">{item.name}</h3>
                <span className="text-sm">
                  PHP {formatPrice(item.price * item.quantity)} &bull;{" "}
                  {item.quantity} {item.quantity > 1 ? "items" : "item"}
                </span>
              </div>
              <ProductImage imageId={item.image} width="w-20" height="h-20" />
            </div>
          );
        })}
      </div>
      <div className="space-y-4 border rounded-lg px-4 py-8 my-4">
        <h3 className="font-bold text-lg">Delivery Address</h3>

        {!isDeliveryAddressUpdating ? (
          <>
            <address>
              {isDeliveryAddressEmpty ? (
                <span>No delivery address</span>
              ) : (
                <span>
                  {deliveryAddress.houseNoAndStreet}, {deliveryAddress.brgy}{" "}
                  <br />
                  {deliveryAddress.municipalityOrCity},{" "}
                  {deliveryAddress.province}
                </span>
              )}
            </address>

            <Button
              variant="link"
              className="p-0"
              onClick={() => setIsDeliveryAddressUpdating(true)}
            >
              Change
            </Button>
          </>
        ) : (
          <form onSubmit={handleSubmit(handleDeliveryFormSubmit)}>
            <div className="mb-8 space-y-4">
              <div className="space-y-1">
                <Label htmlFor="house-no-and-street">House no., Street</Label>
                <Input
                  type="text"
                  id="house-no-and-street"
                  placeholder="House no., Street"
                  {...register("houseNoAndStreet")}
                />
                <span className="text-sm text-red-600">
                  {errors.houseNoAndStreet?.message}
                </span>
              </div>
              <div className="space-y-1">
                <Label htmlFor="brgy">Brgy</Label>
                <Input
                  type="text"
                  id="brgy"
                  placeholder="Brgy"
                  {...register("brgy")}
                />
                <span className="text-sm text-red-600">
                  {errors.brgy?.message}
                </span>
              </div>
              <div className="space-y-1">
                <Label htmlFor="municipality-or-city">Municipality/City</Label>
                <Input
                  type="text"
                  id="municipality-or-city"
                  placeholder="Municipality/City"
                  {...register("municipalityOrCity")}
                />
                <span className="text-sm text-red-600">
                  {errors.municipalityOrCity?.message}
                </span>
              </div>
              <div className="space-y-1">
                <Label htmlFor="province">Province</Label>
                <Input
                  type="text"
                  id="province"
                  placeholder="Province"
                  {...register("province")}
                />
                <span className="text-sm text-red-600">
                  {errors.province?.message}
                </span>
              </div>
            </div>

            <Button type="submit" fullWidth>
              Update delivery address
            </Button>
          </form>
        )}
      </div>
      {/* <div className="space-y-1 my-8">
        <Label htmlFor="contact-number">Contact number</Label>
        <Input type="text" id="contact-number" placeholder="Contact number" />
        <div className="text-sm text-gray-700">
          Contact number must begin with 09
        </div>
        <span className="text-sm text-red-600">
          {errors.contactNumber?.message}
        </span>
      </div> */}
      <div className="flex items-center gap-2 mb-8">
        <Checkbox
          id="user-agree"
          checked={orderNoCancellation}
          onCheckedChange={(value) => {
            setOrderNoCancellation(value as boolean);
          }}
        />
        <Label htmlFor="user-agree" className="text-sm text-gray-700">
          I understand that once I place my order, it cannot be canceled.
        </Label>
      </div>
      <Button
        onClick={placeOrder}
        fullWidth
        className="flex items-center justify-between"
      >
        <span>Place order</span>
        <span>PHP {items && formatPrice(getTotalPrice(items))}</span>
      </Button>
    </>
  );
}
