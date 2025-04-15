'use server';

import { createClient } from "@/lib/supabase/server";

export type CreateGameData = {
  name: string;
  description: string;
  map_name: string;
  platform: string;
  game_mode: 'tpp' | 'fpp';
  match_type: 'solo' | 'duo' | 'squad';
};

export async function createGame(formData: CreateGameData) {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    throw new Error('User not authenticated');
  }

  const { data, error } = await supabase
    .from('games')
    .insert({
      ...formData,
      host_id: user.id,
      status: 'open'
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export type GameCategory = 'open' | 'live' | 'completed';


export async function fetchGames(category: GameCategory) {
  const supabase = await createClient();

  const { data: games, error } = await supabase
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
    .eq('status', category)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching games:', error);
    throw error;
  }

  console.log("games are", games);
  return games || [];
} 