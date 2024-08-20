import { LoginForm } from "@/features/auth/components/login";
import Image from "next/image";
import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="min-h-screen flex items-end justify-center p-10 relative bg-black w-full overflow-hidden">
      <video width="3600" loop autoPlay muted className="absolute z-0 ">
        <source src="/video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {children}
    </main>
  );
};

export default AuthLayout;
