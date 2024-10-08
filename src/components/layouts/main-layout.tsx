import { useLogout } from "@/hooks/use-logout";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useAuth } from "@/stores/auth-store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { LogOut, Menu, ShoppingCart, User } from "lucide-react";
import { Separator } from "../ui/separator";
import { useEffect } from "react";

export function MainLayout() {
  const { user, isTokenExpired, logout } = useAuth();
  const { mutate: logoutMutate } = useLogout();
  const navigate = useNavigate();

  useEffect(() => {
    if (isTokenExpired()) {
      logout();
    }
  }, [isTokenExpired, logout]);

  return (
    <>
      <div className="sticky top-0 z-10">
        <header className="flex items-center justify-between py-4 max-w-xl mx-auto px-4 bg-white">
          <NavLink to="/">
            <h1 className="text-xl font-extrabold uppercase">Pasuyo</h1>
          </NavLink>
          {user ? (
            <nav className="flex items-center">
              <Button
                onClick={() => navigate("/cart")}
                size="icon"
                variant="ghost"
              >
                <ShoppingCart className="w-5 h-5" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 mx-4">
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => {
                      logoutMutate();
                      navigate("/");
                    }}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </nav>
          ) : (
            <div className="flex items-center gap-2">
              <Button onClick={() => navigate("/login")} variant="ghost">
                Login
              </Button>
              <Button onClick={() => navigate("/signup")}>Sign up</Button>
            </div>
          )}
        </header>
        <Separator />
      </div>
      <div className="max-w-xl mx-auto p-4">
        <Outlet />
      </div>
    </>
  );
}
