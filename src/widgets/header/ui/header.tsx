import { Breadcrumbs } from "@/features/breadcrumbs";
import { auth } from "@/shared/lib/firebaseConfig";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Button } from "@/shared/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { useNavigate, useLocation } from "@tanstack/react-router";
import { signOut } from "firebase/auth";
import { ChevronLeft } from "lucide-react";

export const Header = () => {
  const navigator = useNavigate();
  const location = useLocation();

  const onLogout = () => {
    localStorage.removeItem("token");
    signOut(auth);
    navigator({ to: "../" });
  };

  return (
    <header
      className={`sticky w-full top-0 z-30 flex sm:py-4 h-14
        items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 lg:px-8
        ${location.pathname !== "/" ? "justify-between" : "justify-end"}
        `}
    >
      <Breadcrumbs />
      {location.pathname !== "/" && (
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
      )}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar>
            {auth.currentUser?.photoURL && (
              <AvatarImage alt="avatar" src={auth.currentUser.photoURL} />
            )}
            <AvatarFallback>
              {auth.currentUser?.displayName
                ?.split(" ")
                .map((chunk) => chunk[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Settings</DropdownMenuItem>
          {/* <DropdownMenuItem>Support</DropdownMenuItem> */}
          {/* <DropdownMenuItem onClick={onLogout}>Logout</DropdownMenuItem> */}
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};

export default Header;
