"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { createClient } from "../supabase/client";
import { AuthContextType, SessionData, UserProfile } from "@/types";

const SessionContext = createContext<AuthContextType>({
  session: null,
  isLoading: true,
  user: null,
  signOut: async () => { },
});

const supabase = createClient();

export const useSession = () => useContext(SessionContext);

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<SessionData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {


    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session) {
          setSession(session as SessionData);
          setUser({
            id: session.user.id,
            email: session.user.email || '',
            name: session.user.user_metadata?.name || 'User',
            avatar_url: session.user.user_metadata?.avatar_url,
            created_at: session.user.created_at,
          });
        } else {
          setSession(null);
          setUser(null);
        }
        setIsLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    setSession(null);
    setUser(null);
  };

  const value = {
    session,
    isLoading,
    user,
    signOut,
  };

  return (
    <SessionContext.Provider value={value}>
      {children}
    </SessionContext.Provider>
  );
} 