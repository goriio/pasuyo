import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Products } from "@/features/products/components/products";
import { SearchIcon } from "lucide-react";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

export function Home() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!search) return;
    navigate(`/products?search=${encodeURIComponent(search)}`);
  }

  return (
    <>
      <main className="space-y-4 mb-8">
        <form className="flex items-center gap-2" onSubmit={handleSubmit}>
          <Input
            placeholder="Search for products"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          <Button type="submit" size="icon" variant="outline">
            <SearchIcon />
          </Button>
        </form>

        <div className="relative rounded-lg overflow-hidden">
          <img
            src="https://eatlikepinoy.com/wp-content/uploads/2020/05/18252927032_bb8a54b8c3_c.jpg"
            className="w-full h-52 bg-slate-200 object-cover"
          ></img>
          <div className="absolute inset-0 bg-gradient-to-t from-black from-0%  to-transparent to-50%" />
          <div className="absolute bottom-0 p-4">
            <p className="text-white font-semibold text-lg">
              Your Go-To Solution for Quick and Reliable Deliveries
            </p>
          </div>
        </div>

        <Products />
      </main>
    </>
  );
}
