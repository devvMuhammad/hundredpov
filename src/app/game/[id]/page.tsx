import { createClient } from "@/lib/supabase/server";
import Game from "@/components/Game";
import { redirect } from "next/navigation";

export default async function GamePage({ params }: { params: Promise<{ id: string }> }) {
  const supabase = await createClient();

  // Fetch game data with host info
  const { id: gameId } = await params;
  const { data: game, error } = await supabase
    .from('games')
    .select(`
      name,
      description,
      map_name,
      platform,
      game_mode,
      match_type,
      status,
      created_at,
      updated_at,
      host_id,
      region,
      host:profiles(
        id,
        name,
        avatar_url
      )`)
    .eq('id', gameId)
    .single();
  console.log("game  is here", game);

  if (error || !game) {
    redirect("/lobby");
  }

  return <Game game={game} />;
}