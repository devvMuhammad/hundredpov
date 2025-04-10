'use server'

import { revalidatePath } from 'next/cache'
import { isRedirectError } from 'next/dist/client/components/redirect-error';
import { createClient } from "@/lib/supabase/server"

export async function login({ email, password }: { email: string; password: string }) {
  try {
    const supabase = await createClient()

    const { error, data } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      throw new Error(error.message || "Failed to sign in. Please check your credentials.")
    }

    revalidatePath('/', 'layout')
    return { success: true, data };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    throw error;
  }
}

export async function signup({
  name, email, password
}: { name: string; email: string; password: string; }) {
  try {
    const supabase = await createClient()

    const { error, data } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          avatar_url: null // We can add avatar URL later if needed
        }
      },
    })

    if (error) {
      throw new Error(error.message || "Failed to create account. Please try again.")
    }

    revalidatePath('/', 'layout')
    return { success: true, data };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    throw error;
  }
}

export async function signOut() {
  try {
    const supabase = await createClient()
    const { error } = await supabase.auth.signOut()

    if (error) {
      throw new Error(error.message || "Failed to sign out.")
    }

    revalidatePath('/', 'layout')
    return { success: true };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    throw error;
  }
}