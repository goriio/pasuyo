import { ProductsList } from "@/features/products/components/products-list";
import { useSearchParams } from "react-router-dom";

export function ProductsRoute() {
  const [searchParams] = useSearchParams();

  const search = searchParams.get("search") || "";

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">
        Search results for: {search}
      </h2>
      <ProductsList search={search} />
    </div>
  );
}
