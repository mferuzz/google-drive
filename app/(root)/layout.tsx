import React from "react";
import HomePage from "./(home)/page";
import Navbar from "@/components/shared/navbar";
import Sidebar from "@/components/shared/sidebar";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />
      <Sidebar />
      {children}
    </div>
  );
};

export default RootLayout;
