"use client";

import { connectionIdToColor } from "@/lib/utils";
import { useOthers, useSelf } from "@/liveblocks.config";

import { UserAvatar } from "./user-avatar";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";

const MAX_SHOWN_USERS = 2;

export const Participants = () => {
  const users = useOthers();
  const currentUser = useSelf();
  const allUsers = users.slice();
  allUsers.push(currentUser);
  let usersMapped: { id: number; name: string ; designation: string; image: string }[]= [];
  allUsers.map((user,index)=>{
    usersMapped.push({
      id: index,
      name: user.info?.name??"Team member",
      designation: "Team member",
      image:user.info?.picture??"./placeholder.jpg"
    })
  })
  return (
    <div className="absolute bottom-12 right-[50%] rounded-md p-3 flex items-center z-10">
      <div className="flex gap-x-2">
              <AnimatedTooltip items={usersMapped} />

        {/* {users.slice(0, MAX_SHOWN_USERS)
          .map(({ connectionId, info }) => {
            return (
              <UserAvatar
                borderColor={connectionIdToColor(connectionId)}
                key={connectionId}
                src={info?.picture}
                name={info?.name}
                fallback={info?.name?.[0] || "T"}
              />
            )
        })}
        {currentUser && (
          <UserAvatar
            borderColor={connectionIdToColor(currentUser.connectionId)}
            src={currentUser.info?.picture}
            name={`${currentUser.info?.name} (You)`}
            fallback={currentUser.info?.name?.[0]}
          />
        )}

        {hasMoreUsers && (
          <UserAvatar
            name={`${users.length - MAX_SHOWN_USERS} more`}
            fallback={`+${users.length - MAX_SHOWN_USERS}`}
          />
        )} */}
      </div>
    </div>
  );
};

export const ParticipantsSkeleton = () => {
  return (
    <div className="absolute h-12 top-2 right-2 bg-white rounded-md p-3 flex items-center shadow-md w-[100px]" />
  );
};