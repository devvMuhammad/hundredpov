'use server';

import { createClient } from "@/lib/supabase/server"

export async function submitOnboarding(formData: {
  twitch_username: string;
  pubg_username: string;
  platform: string;
}) {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('User not authenticated');
  }

  const { data, error } = await supabase
    .from('player_info')
    .upsert({
      id: user.id,
      twitch_username: formData.twitch_username,
      pubg_username: formData.pubg_username,
      platform: formData.platform,
      updated_at: new Date().toISOString()
    });

  if (error) {
    throw new Error(error.message, { "cause": error.cause });
  }

  return data;
} 