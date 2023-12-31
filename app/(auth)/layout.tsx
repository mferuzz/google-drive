import Navbar from "@/components/shared/navbar";
import Sidebar from "@/components/shared/sidebar";
import { ChildProps } from "@/types/insex";
import React from "react";

const AuthLayout = ({ children }: ChildProps) => {
  return (
    <div className="relative">
      <Navbar />
      <Sidebar />
      <div className="flex justify-center items-center w-full h-[90vh] relative z-50 ">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
