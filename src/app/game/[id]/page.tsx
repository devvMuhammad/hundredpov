import { createClient } from "@/lib/supabase/server";
import Game from "@/components/Game";
import { redirect } from "next/navigation";

async function fetchGameData(gameId: string) {
  const supabase = await createClient();

  // Fetch game data with host info
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

  // Fetch game slots
  const { data: slotsData } = await supabase
    .from('game_slots')
    .select('slot_index, players:player_info(id,twitch_username, pubg_username, platform)')
    .eq('game_id', game.id)
    .order('slot_index');

  // Get current user
  const { data: { user } } = await supabase.auth.getUser();

  const transformedSlots = slotsData?.map(slot => ({
    slot_index: slot.slot_index,
    players: slot.players.map(player => ({
      id: player.id, // Using twitch username as ID
      name: player.pubg_username,
      twitchName: player.twitch_username,
      avatarUrl: `https://twitch.tv/${player.twitch_username}/profile_image`
    }))
  })) || [];

  const transformedGame = {
    ...game,
    host: game.host as unknown as {
      id: string;
      name: string;
      avatar_url: string;
    }
  };


  return {
    game: transformedGame,
    slots: transformedSlots || [],
    userId: user?.id
  };
}

export default async function GamePage({ params }: { params: Promise<{ id: string }> }) {
  const { id: gameId } = await params;
  const { game, slots, userId } = await fetchGameData(gameId);

  return <Game game={game} userId={userId} slots={slots} />;
}