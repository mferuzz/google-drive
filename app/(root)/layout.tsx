import React from "react";
import HomePage from "./(home)/page";
import Navbar from "@/components/shared/navbar";
import Sidebar from "@/components/shared/sidebar";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />
      <Sidebar />
      <main className="w-full min-h-full relative  top-[10vh] pl-72 bg-[#F6F9FC] dark:bg-[#1F1F1F] p-4">
        <div className="min-h-[87vh] rounded-xl bg-white dark:bg-black ml-4 p-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default RootLayout;
