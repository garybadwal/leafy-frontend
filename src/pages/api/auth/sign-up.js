"use server";

import { createAPIResponse } from "@/lib/config";
import { createClient } from "@/lib/supabase/api";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json(createAPIResponse({ status: 405, message: "Method not allowed" })); // Ensure it's a POST request
  }

  try {
    // Extract form data from the request body
    const { first_name, last_name, email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json(
        createAPIResponse({
          status: 400,
          message:
            "Oops! There is an error while submitting your data, Please validate data and try again.",
          data: {
            first_name: ["This field is required"],
            last_name: ["This field is required"],
            email: ["This field is required"],
            password: ["This field is required"],
          },
        })
      );
    }

    // Initialize the Supabase client
    const supabase = await createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );

    // Sign in with Supabase
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: first_name,
          last_name: last_name,
        },
      },
    });

    if (error) {
      if (error?.code == "user_already_exists") {
        return res.status(400).json(
          createAPIResponse({
            status: 400,
            message:
              "Oops! There is an error while submitting your data, Please validate data and try again.",
            data: {
              email: ["This email is taken, please try with some other email."],
            },
          })
        );
      } else {
        return res.status(error?.status).json(
          createAPIResponse({
            status: error?.status,
            message: error?.code,
          })
        );
      }
    }

    // Redirect on success
    return res.status(200).json(
      createAPIResponse({
        status: 200,
        message:
          "Congratulations! Your account has been created. Get started by logging in.",
      })
    );
  } catch (err) {
    console.error("Sign-in API error:", err);
    return res.status(500).json(
      createAPIResponse({
        status: 500,
        message: "Internal server error",
        data: {
          error: err,
        },
      })
    );
  }
}
