"use server";

import { createClient } from "@/lib/supabase/server";

export const signInAction = async (data) => {
  const { email, password } = data;
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { status: 400, error: {code: error?.code} };
  }

  return { status: 200 };
};

export const signOutAction = async () => {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();
  if (error) {
    return { status: 400, error: {code: error?.code} };
  }

  return { status: 200 };
};
