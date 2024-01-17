'use client'
import { defineImageAndFile } from "@/lib/utils";
import { IFolderAndFile } from "@/types";
import { File, Paperclip, Save, X } from "lucide-react";
import Image from "next/image";
import React, { ElementRef, useRef, useState } from "react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { useUser } from "@clerk/nextjs";
import ListAction from "../shared/list-action";
import { useRouter } from "next/navigation";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface SuggestCardProps {
  item: IFolderAndFile;
}

const SuggestCard = ({ item }: SuggestCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(item.name);

  const inputRef = useRef<ElementRef<"input">>(null);
  const { refresh } = useRouter();
  const { user } = useUser();

  const isStartEditing = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsEditing(true);

    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.setSelectionRange(0, value.length);
    }, 0);
  };

  const onSave = () => {
    const type = item.size ? "files" : "folders";
    const ref = doc(db, type, item.id);

    const promise = setDoc(ref, {
      ...item,
      name: value.length ? value : "Untitled",
    }).then(() => {
      setIsEditing(false);
      refresh();
    });

    toast.promise(promise, {
      loading: "Loading...",
      success: "Saved!",
      error: "Failed to save",
    });
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSave();
    } else if (e.key === "Escape") {
      setIsEditing(false);
    }
  };
  return (
    <div className="max-w-[300px] max-h-[450px] h-[240px] flex flex-col rounded-md shadow-lg p-4 bg-secondary group">
      {isEditing ? (
        <div className="relative">
          <Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            ref={inputRef}
            onKeyDown={onKeyDown}
          />
          <div className="absolute right-0 top-0 h-full flex items-center space-x-1">
            <Button
              size={"sm"}
              variant={"outline"}
              className="h-full"
              onClick={onSave}>
              <Save className="h-4 w-4" onClick={onSave} />
            </Button>
            <Button
              size={"sm"}
              variant={"outline"}
              className="h-full"
              onClick={() => setIsEditing(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ) : (
        <div
          className="flex items-center space-x-2"
          role="button"
          onDoubleClick={isStartEditing}>
          <Paperclip className="w-4 h-4 text-blue-500" />
          <span className="text-sm opacity-75">{item.name}</span>
        </div>
      )}

      <div className="relative h-[75%] w-full bg-white dark:bg-black rounded-md mt-3 ">
        {defineImageAndFile(item.type) === "file" ? (
          <div className="h-full flex justify-center items-center">
            <File className="w-16 h-16" strokeWidth={1} />
          </div>
        ) : (
          <Image
            fill
            src={item.image}
            alt="image"
            className="object-cover rounded-md"
          />
        )}
      </div>

      <div className="flex justify-between items-center w-full space-x-2 mt-2">
        <div className="flex items-center space-x-2">
          <Avatar className="w-6 h-6">
            <AvatarImage src={user?.imageUrl} />
          </Avatar>
          <span className="opacity-75">me</span>
        </div>

        <div>
          <ListAction item={item} isStartEditing={isStartEditing} />
        </div>
      </div>
    </div>
  );
};

export default SuggestCard;
