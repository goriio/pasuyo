import { cn } from "@/utils/cn";
import { useImage } from "../api/get-product-image";
import { ImgHTMLAttributes } from "react";
import { Skeleton } from "@/components/ui/skeleton";

type ProductImageProps = {
  imageId: string;
  width?: string;
  height?: string;
} & ImgHTMLAttributes<HTMLImageElement>;

export function ProductImage({
  imageId,
  width,
  height,
  ...props
}: ProductImageProps) {
  const { data: image, isLoading } = useImage(imageId);

  if (isLoading) {
    return <Skeleton className={cn(width, height)} />;
  }

  return (
    <img
      src={image.url}
      alt={image.placeholder}
      className={cn(
        width,
        height,
        "object-cover bg-slate-200 overflow-hidden rounded-lg"
      )}
      {...props}
    />
  );
}
