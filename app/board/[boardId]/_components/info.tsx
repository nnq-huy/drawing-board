"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";
import { useQuery } from "convex/react";

import { cn } from "@/lib/utils";
import { Hint } from "@/components/hint";
import { api } from "@/convex/_generated/api";
import { Actions } from "@/components/actions";
import { Button } from "@/components/ui/button";
import { Id } from "@/convex/_generated/dataModel";
import { useRenameModal } from "@/store/use-rename-modal";

interface InfoProps {
  boardId: string;
  toggleEditor: ()=> void;
};

const TabSeparator = () => {
  return (
    <div className="text-neutral-300 px-1.5">
      |
    </div>
  );
};

export const Info = ({
  boardId,
  toggleEditor
}: InfoProps) => {
  const { onOpen } = useRenameModal();

  const data = useQuery(api.board.get, {
    id: boardId as Id<"boards">,
  });

  if (!data) return <InfoSkeleton />;

  return (
    <div className="fixed top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md max-w-[50vw]">
      <Hint label="Go to boards" side="bottom" sideOffset={10}>
        <Button asChild variant="board" className="px-2">
          <Link href="/">
            <Image
              src="/logo.svg"
              alt="DrawCode logo"
              height={40}
              width={40}
            />
            <span className={cn(
              "font-semibold text-xl ml-2 text-black font-mono hidden md:flex",
            )}>
              DrawCode
            </span>
          </Link>
        </Button>
      </Hint>
      <TabSeparator />
      <Hint label="Edit title" side="bottom" sideOffset={10}>
        <Button
          size={"sm"}
          variant="board"
          className="text-base font-normal px-2 flex-1 truncate"
          onClick={() => onOpen(data._id, data.title)}
        >
          {data.title}
        </Button>
      </Hint>
      <TabSeparator />
      <Hint label="Toggle code editor" side="bottom" sideOffset={10}>
        <Button
          size={"sm"}
          variant="board"
          className="text-base font-normal px-2 flex-1 truncate"
          onClick={toggleEditor}
        >
          Editor
        </Button>
      </Hint>
      <TabSeparator />
      <Actions
        id={data._id}
        title={data.title}
        side="bottom"
        sideOffset={10}
      >
        <div>
          <Hint label="Main menu" side="bottom" sideOffset={10}>
            <Button size="icon" variant="board">
              <Menu />
            </Button>
          </Hint>
        </div>
      </Actions>
    </div>
  );
};

export const InfoSkeleton = () => {
  return (
    <div 
      className="absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md w-[300px]"
    />
  );
};