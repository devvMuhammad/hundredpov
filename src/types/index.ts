import { Session as SupabaseSession } from "@supabase/supabase-js";

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  avatar_url?: string;
  created_at: string;
  updated_at?: string;
}

export interface SessionData extends SupabaseSession {
  user: SupabaseSession['user'] & {
    user_metadata: {
      name: string;
      avatar_url?: string;
    };
  };
}

export interface AuthContextType {
  session: SessionData | null;
  isLoading: boolean;
  user: UserProfile | null;
  signOut: () => Promise<void>;
}
