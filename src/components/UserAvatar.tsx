"use client";

import { useSession } from "@/lib/providers/session-provider";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, Settings } from "lucide-react";
import Link from "next/link";

export default function UserAvatar() {
  const { user, isLoading, signOut } = useSession();

  if (isLoading) {
    return <Skeleton className="h-10 w-20 rounded-full bg-gaming-light" />;
  }

  if (!user) {
    return (
      <div className="flex items-center space-x-4">
        <Link href="/login">
          <Button variant="ghost" className="text-gray-300 hover:text-white">Login</Button>
        </Link>
        <Link href="/signup">
          <Button className="bg-pubg hover:bg-pubg-light text-white">Sign Up</Button>
        </Link>
      </div>
    );
  }

  // Get first character of name for avatar fallback
  const nameInitial = user.name.charAt(0).toUpperCase();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="h-10 w-10 cursor-pointer bg-gaming-light border border-pubg/20">
          <AvatarFallback className="bg-pubg text-white">
            {nameInitial}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-gaming-darker border border-pubg/20 text-white w-56">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-xs leading-none text-gray-400">{user.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-pubg/20" />
        <Link href="/settings">
          <DropdownMenuItem className="cursor-pointer text-gray-300 hover:text-white hover:bg-gaming-light">
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
        </Link>
        <DropdownMenuItem
          className="cursor-pointer text-red-400 hover:text-red-300 hover:bg-gaming-light"
          onClick={() => signOut()}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 