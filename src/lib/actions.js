"use server";

import { createBackendClient as createClient } from "@/lib/supabase/server";

export const signInAction = async (data) => {
  const { email, password } = data;
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { status: 400, error: { code: error?.code } };
  }

  return { status: 200 };
};

export const signOutAction = async () => {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();
  if (error) {
    return { status: 400, error: { code: error?.code } };
  }

  return { status: 200 };
};

export const updateUserAction = async (details) => {
  const { first_name, last_name } = details;
  const supabase = await createClient();

  const { data, error } = await supabase.auth.updateUser({
    data: {
      first_name,
      last_name,
    },
  });
  
  if (error) {
    return { status: error?.status, error: { code: error?.code } };
  }

  return { status: 200 };
};
