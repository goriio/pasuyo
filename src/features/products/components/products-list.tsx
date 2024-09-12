import { Button } from "@/components/ui/button";
import { useProducts } from "../api/get-products";
import { Product } from "@/types/api";
import { Skeleton } from "@/components/ui/skeleton";
import { ProductItem } from "./product-item";

function ProductLoading() {
  return (
    <div className="flex items-start gap-3 h-24">
      <Skeleton className="w-20 h-20 rounded-lg" />
      <div className="flex flex-1 flex-col gap-2">
        <Skeleton className="w-24 h-4 rounded-lg" />
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <Skeleton className="w-28 h-4 rounded-lg" />
            <Skeleton className="w-20 h-4 rounded-lg" />
          </div>
          <Skeleton className="w-24 h-9 rounded-lg" />
        </div>
      </div>
    </div>
  );
}

export function ProductsList({ search }: { search?: string }) {
  const {
    data: products,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isError,
    isFetchingNextPage,
  } = useProducts({ search });

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 mb-4">
        {Array.from({ length: 5 }).map((_, index) => {
          return <ProductLoading key={index} />;
        })}
      </div>
    );
  }

  if (isError) {
    return <div>Error</div>;
  }

  if (products?.pages[0].products.length === 0) {
    return <div>No products</div>;
  }

  return (
    <>
      <div className="flex flex-col gap-4 mb-4">
        {products?.pages
          .flatMap((page) => page.products)
          .map((product: Product) => {
            return <ProductItem key={product.id} product={product} />;
          })}
      </div>
      {hasNextPage &&
        (isFetchingNextPage ? (
          <div className="flex flex-col gap-4 mb-4">
            {Array.from({ length: 5 }).map((_, index) => {
              return <ProductLoading key={index} />;
            })}
          </div>
        ) : (
          <Button fullWidth onClick={() => fetchNextPage()}>
            Load more
          </Button>
        ))}
    </>
  );
}
