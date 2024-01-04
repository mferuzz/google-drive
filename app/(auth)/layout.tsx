import Navbar from "@/components/shared/navbar";
import Sidebar from "@/components/shared/sidebar";
import { ChildProps } from "@/types";
import React from "react";

const AuthLayout = ({ children }: ChildProps) => {
  return (
    <div className="relative">
      <div className="absolute z-40 inset-0 w-screen h-screen bg-black/50" />
      <Navbar />
      <Sidebar />
      <div className="flex justify-center items-center w-full h-[90vh] relative z-50">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
