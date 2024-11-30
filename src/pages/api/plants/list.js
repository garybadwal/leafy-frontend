import { createClient } from "@/lib/supabase/server";
import { createAPIResponse } from "@/lib/config";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json(createAPIResponse({ status: 405, message: "Method not allowed" }));
  }

  const supabase = await createClient(req);

  // Get the current user session
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    return res.status(401).json(createAPIResponse({ status: 401, message: "Unauthorized: User not logged in" }));
  }

  // Get plants for the logged-in user
  const { data: plants, error } = await supabase
    .from("plants")
    .select("*")
    .eq("user", user.id);

  if (error) {
    return res.status(500).json(createAPIResponse({ status: 500, message: "Failed to fetch plant information" }));
  }

  return res.status(200).json(createAPIResponse({ status: 200, message: "Plant information fetched successfully", data: plants }));
}

