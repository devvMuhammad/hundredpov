'use server';

import { createClient } from "@/lib/supabase/server";

export type GameCategory = 'open' | 'live' | 'completed';

export type Game = {
  id: number;
  name: string;
  description: string;
  map_name: string;
  platform: string;
  game_mode: 'tpp' | 'fpp';
  match_type: 'solo' | 'duo' | 'squad';
  status: GameCategory;
  created_at: string;
  updated_at: string;
  host_id: string;
  region: string;
  host: {
    id: string;
    name: string;
    avatar_url: string;
  };
};

export async function fetchGames(category: GameCategory): Promise<Game[]> {
  const supabase = await createClient();

  const { data: games, error } = await supabase
    .from('games')
    .select(`
      *,
      host:profiles!host_id(
        id,
        name,
        avatar_url
      )
    `)
    .eq('status', category)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching games:', error);
    throw error;
  }

  console.log("games are", category, games.length);
  return games || [];
} 