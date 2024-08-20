"use client";
import React, { useEffect, useMemo } from "react";
import { User } from "firebase/auth";
import { usePathname, useRouter } from "next/navigation";
import { TypeUser } from "@/types/index.type";

export default function useProtectedRoute(
  user: User | null,
  userLoggedIn: boolean,
  profile: TypeUser | null,
) {
  const router = useRouter();
  const pathname = usePathname();

  const replaceProtectedRoute = (route?: string) => {
    if (route) router.push(route);
  };

  const route = useMemo(() => {
    const authRoutes = [
      "/entrar",
      // '/esqueceu-a-senha',
      "/criar-conta",
    ];

    const isLoggedIn = !!user;
    const isLoggedOut = user === null;
    const inAuthGroup = authRoutes.some((route) => pathname === route);

    // if (isLoggedIn) {
    //   // return `/criar-perfil/${UTM}`;
    //   return `/criar-perfil/`;
    // } else
    if (isLoggedIn && inAuthGroup) {
      return "/";
    }
  }, [pathname, user]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | undefined;

    if (userLoggedIn) {
      timeoutId = setTimeout(() => {
        replaceProtectedRoute(route);
      }, 2000);
    }

    return () => {
      clearTimeout(timeoutId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userLoggedIn, route, profile]);
}
