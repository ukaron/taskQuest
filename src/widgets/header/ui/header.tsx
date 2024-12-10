import { Breadcrumbs } from "@/features/breadcrumbs";
import { auth } from "@/shared/lib/firebaseConfig";
import { Button } from "@/shared/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { useNavigate } from "@tanstack/react-router";
import { signOut } from "firebase/auth";
import { ChevronLeft } from "lucide-react";

export const Header = () => {
  const navigator = useNavigate();

  const onLogout = () => {
    localStorage.removeItem("token");
    signOut(auth);
    navigator({ to: "../" });
  };

  return (
    <header className="sticky w-full top-0 z-30 flex sm:py-4 h-14 justify-between items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 lg:px-8">
      <Breadcrumbs />
      <Button
        variant="outline"
        size="icon"
        className="h-7 w-7 md:hidden flex"
        onClick={() => {
          navigator({ to: "../" });
        }}
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="sr-only">Back</span>
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="overflow-hidden rounded-full"
          >
            N H
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>Support</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={onLogout}>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};

export default Header;
