import { PropsWithChildren } from "react";
import { createClient } from "@/lib/supabase/server";
import { LobbyPlayerInfoCard } from "@/components/lobby/LobbyPlayerInfoCard";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

async function getPlayerInfo() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: playerInfo } = await supabase
    .from('player_info')
    .select('*')
    .eq('id', user.id)
    .single();

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  return {
    user: user || null,
    playerInfo: playerInfo || null,
    profile: profile || null
  };
}

export default async function LobbyLayout({ children }: PropsWithChildren) {
  const data = await getPlayerInfo();

  return (
    <div className="min-h-screen bg-gaming-darker text-white pt-20 md:pt-32 pb-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Game Lobby</h1>
          {data?.user && (
            <Link href="/host-game">
              <Button className="bg-pubg hover:bg-pubg-light text-white font-medium flex items-center gap-2">
                <PlusCircle className="h-4 w-4" />
                Host Your Own Game
              </Button>
            </Link>
          )}
        </div>
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left column - Main content */}
          {children}

          {/* Right column - Player info card */}
          <div className="w-full md:w-1/4 mt-6 md:mt-0">
            <LobbyPlayerInfoCard
              user={data?.user || null}
              playerInfo={data?.playerInfo || null}
              profile={data?.profile || null}
            />
          </div>
        </div>
      </div>
    </div>
  );
}