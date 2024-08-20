"use client";

import React from "react";
import { AuthProvider } from "@/features/auth/context";

import { getAuth } from "firebase/auth";
// import { QueryClient, QueryClientProvider } from 'react-query';

export default function GlobalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AllProviders>{children}</AllProviders>;
}

export function AllProviders({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}
