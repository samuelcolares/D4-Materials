"use client";
import BossCards from "@/components/boss_cards";
import Materials from "@/components/boss_materials_table";
import { Navbar } from "@/components/navbar";
import { LoginForm } from "@/features/auth/components/login";
import { useAuth } from "@/features/auth/context";
import React from "react";

const HomePage = () => {
  return (
    <main className="flex flex-col flex-1 min-h-screen relative pb-10">
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#0f0606_60%,#490000_100%)]" />
      <Navbar />
      <div className="flex-1 flex items-center flex-col">
        <Materials />
        <BossCards />
      </div>
    </main>
  );
};

export default HomePage;
