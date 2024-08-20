"use client";
import Link from "next/link";
import Image from "next/image";
import { CircleUser, Menu, Package2 } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/features/auth/context";

export function Navbar() {
  const { profile, logOut } = useAuth();
  return (
    <header className="sticky z-50 top-0 flex justify-between h-16 items-center gap-4 bg-primary text-white px-4 md:px-6">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold md:text-base relative"
        >
          <Image
            src={"https://i.imgur.com/haTKhpf.png"}
            alt="logo"
            width={512}
            height={512}
            className="object-cover w-12 h-12 opacity-80"
          />
          <span className="sr-only">Logo</span>
          <span className="absolute text-base text-white bottom-0 left-0 text-quinary ">
            33cm
          </span>
        </Link>
        <Link
          href="#"
          className="text-white transition-colors hover:text-white/70"
        >
          Materials
        </Link>
      </nav>
      <div className="flex items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        {profile && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="secondary"
                size="icon"
                className="rounded-full relative overflow-hidden"
              >
                <Image
                  src={profile.profilePictureUrl}
                  alt="logo"
                  fill
                  className="object-cover"
                />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{profile.username}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Button
                  onClick={logOut}
                  variant={"ghost"}
                  className="cursor-pointer w-full"
                >
                  Logout
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
        {!profile && (
          <Button asChild>
            <Link href={"/login"}>Login</Link>
          </Button>
        )}
      </div>
    </header>
  );
}

{
  /* <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="#"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <Package2 className="h-6 w-6" />
              <span className="sr-only">Acme Inc</span>
            </Link>
            <Link href="#" className="text-white hover:text-white/70">
              Home
            </Link>
            <Link href="#" className="text-white hover:text-white/70">
              Orders
            </Link>
            <Link href="#" className="text-white hover:text-white/70">
              Products
            </Link>
            <Link href="#" className="text-white hover:text-white/70">
              Customers
            </Link>
            <Link href="#" className="hover:text-white/70">
              Settings
            </Link>
          </nav>
        </SheetContent>
      </Sheet> */
}
