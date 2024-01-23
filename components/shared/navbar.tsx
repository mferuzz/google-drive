import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ModeToggle } from "./mode-toggle";
import UserBox from "./user-box";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { auth } from "@clerk/nextjs/server";
import { HelpCircle, Settings } from "lucide-react";

const Navbar = () => {
  const { userId } = auth();
  return (
    <div className="h-[10vh] fixed top-0 left-0 right-0 z-30 bg-[#F6F9FC] dark:bg-[#1F1F1F]">
      <div className="flex justify-between items-center my-4 mx-6">
        <Link href={"/"}>
          <div className="flex items-center">
            <Image src={"/logo.svg"} alt="Logo" width={40} height={40} />
            <span className="pl-2 text-[22px] opacity-75">Drive</span>
          </div>
        </Link>

        <div className="flex items-center space-x-2">
          <ModeToggle />
          <Link href="/settings">
            <div
              className="p-2 transition rounded-full hover:bg-secondary"
              role="button">
              <Settings className="w-5 h-5" />
            </div>
          </Link>

          {userId ? (
            <UserBox />
          ) : (
            <Avatar>
              <AvatarFallback>MF</AvatarFallback>
            </Avatar>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
