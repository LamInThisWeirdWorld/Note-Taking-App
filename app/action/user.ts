"use server"

import { createClient } from "../auth/server"
import { handleError } from "@/lib/utils"

export async function sendMagicLink(email: string) {
  const supabase = await createClient();

  // supabase-js v2: use signInWithOtp for magic links
  const { data, error } = await supabase.auth.signInWithOtp({ email });

  if (error) {
    console.error('sendMagicLink error:', error);
    return { success: false, error };
  }

  return { success: true, data };
}

export const loginAction = async (email: string, password: string ) => {
    try {
        const { auth } = await createClient();

        const { error } = await auth.signInWithPassword ({
            email,
            password,
        });

        if (error) throw error;

        return { errorMessage: null };
    } catch (error) {
        return handleError(error);
    }
}

export const signUpAction = async (email: string, password: string ) => {
    try {
        const { auth } = await createClient();

        const { data, error } = await auth.signUp ({
            email,
            password,
        });

        console.log(process.env.SUPABASE_URL);
        console.log(process.env.SUPABASE_PUBLISHABLE_KEY);

        console.log("SignUp data:", email, password, data);

        if (error) throw error;

        const userId = data.user?.id;
        if (!userId) throw new Error("Error signing up");

        // Add user to database

        return { errorMessage: null };
    } catch (error) {
        return handleError(error);
    }
}