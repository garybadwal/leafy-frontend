import { navigate } from "@/hooks/navigate";
import { createClient } from "@/lib/supabase/client";
import { usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext({ user: null, loading: true });

export default function Authenticated({ children }) {
  const pathname = usePathname();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const supabase = await createClient();
      const { data } = await supabase.auth.getUser();
      setUser(data?.user);

      if (!data?.user && !["/", "/sign-in", "/sign-up"].includes(pathname)) {
        navigate("/sign-in");
      }

      if (data?.user && ["/sign-in", "/sign-up"].includes(pathname)) {
        navigate("/dashboard");
      }

      setLoading(false);
    };

    if (loading) {
      getUser();
    }
  }, [loading]);

  useEffect(() => {
    async function getLoader() {
      const { reuleaux } = await import("ldrs");
      reuleaux.register();
    }
    getLoader();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {loading ? (
        <div className="flex flex-col w-full gap-3 justify-center items-center min-h-screen">
          <l-reuleaux
            size="40"
            stroke="4"
            stroke-length="0.15"
            bg-opacity="0.1"
            speed="1"
            color="black"
          />
        </div>
      ) : (
        <>{children}</>
      )}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
