import { PropsWithChildren } from "react";
import { createClient } from "@/lib/supabase/server";
import { LobbyPlayerInfoCard } from "@/components/lobby/LobbyPlayerInfoCard";

async function getPlayerInfo() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { user: null, playerInfo: null, profile: null };
  }

  const { data: playerInfo } = await supabase
    .from('player_info')
    .select('*')
    .eq('user_id', user.id)
    .single();

  const { data: profile } = await supabase
    .from('profiles')
    .select('name, avatar_url')
    .eq('id', user.id)
    .single();

  return {
    user: user ? { id: user.id } : null,
    playerInfo,
    profile
  };
}

export default async function LobbyLayout({ children }: PropsWithChildren) {
  const data = await getPlayerInfo();

  return (
    <div className="min-h-screen bg-gaming-darker text-white pt-20 pb-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left column - Main content */}
          <div className="w-full md:w-3/4">
            {children}
          </div>

          {/* Right column - Player info card */}
          <div className="w-full md:w-1/4 mt-6 md:mt-0">
            <LobbyPlayerInfoCard
              user={data.user}
              playerInfo={data.playerInfo}
              profile={data.profile}
            />
          </div>
        </div>
      </div>
    </div>
  );
}