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