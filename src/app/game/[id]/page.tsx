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
      id,
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
      host:profiles!host_id(
        id,
        name,
        avatar_url
      )`)
    .eq('id', gameId)
    .single();

  if (error || !game) {
    redirect("/lobby");
  }

  const { data } = await supabase.auth.getUser();

  const { data: slotsData } = await supabase
    .from('game_slots')
    .select('slot_index, players:player_info(twitch_username, pubg_username, platform)')
    .eq('game_id', game.id)
    .order('slot_index');

  const transformedGame = {
    ...game,
    host: game.host as unknown as {
      id: string;
      name: string;
      avatar_url: string;
    }
  }

  return <Game game={transformedGame} userId={data.user?.id} gameSlots={slotsData || []} />;
}