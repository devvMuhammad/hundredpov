import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export type GameStatus = 'open' | 'live' | 'completed';

export interface GameData {
  id: string;
  name: string;
  description: string | null;
  map_name: string;
  platform: string;
  game_mode: 'tpp' | 'fpp';
  match_type: string;
  status: GameStatus;
  created_at: string;
  updated_at: string;
  host_id: string;
  region: string;
  host: {
    id: string;
    name: string;
    avatar_url: string;
  };
}

export interface GameSlot {
  slot_index: number;
  players: {
    id: string;
    name: string;
    twitchName: string;
    avatarUrl: string;
  }[];
}

export async function fetchGame(gameId: string): Promise<GameData> {
  const supabase = await createClient();

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
      host:player_info!host_id(
        id,
        name:twitch_username,
        avatar_url
      )`)
    .eq('id', gameId)
    .single();

  if (error || !game) {
    redirect("/lobby");
  }

  return {
    ...game,
    host: game.host as unknown as {
      id: string;
      name: string;
      avatar_url: string;
    }
  };
}

export async function fetchGameSlots(gameId: string): Promise<GameSlot[]> {
  const supabase = await createClient();

  const { data: slotsData, error } = await supabase
    .from('game_slots')
    .select('slot_index, players:player_info(id,twitch_username, pubg_username, platform)')
    .eq('game_id', gameId)
    .order('slot_index');

  if (error) {
    console.error('Error fetching game slots:', error);
    return [];
  }

  // Group slots by slot_index and transform player data
  const groupedSlots = slotsData.reduce((acc: { [key: number]: GameSlot }, slot) => {
    if (!acc[slot.slot_index]) {
      acc[slot.slot_index] = {
        slot_index: slot.slot_index,
        players: []
      };
    }

    if (slot.players) {
      acc[slot.slot_index].players.push({
        id: slot.players.id,
        name: slot.players.pubg_username || 'Unknown',
        twitchName: slot.players.twitch_username || 'Unknown',
        avatarUrl: slot.players.twitch_username
          ? `https://twitch.tv/${slot.players.twitch_username}/profile_image`
          : '/default-avatar.png'
      });
    }

    return acc;
  }, {});

  return Object.values(groupedSlots).sort((a, b) => a.slot_index - b.slot_index);
}

export async function getCurrentUser() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}
