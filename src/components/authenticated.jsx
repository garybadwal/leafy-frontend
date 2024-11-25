import { navigate } from "@/hooks/navigate";
import { createClient } from "@/lib/supabase/client";
import { usePathname } from "next/navigation";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext({ user: null, loading: true });

export default function Authenticated({ children }) {
  const pathname = usePathname();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const publicRoutes = useMemo(() => ['/', '/sign-in', '/sign-up'], [])
  const isPublicRoute = useMemo(() => publicRoutes.includes(pathname), [publicRoutes, pathname])

  const handleAuthStateChange = useCallback(async (event, session) => {
    if (event === 'SIGNED_IN') {
      setUser(session.user)
      if (isPublicRoute) {
        navigate('/dashboard')
      }
    } else if (event === 'SIGNED_OUT') {
      setUser(null)
      if (!isPublicRoute) {
        navigate('/sign-in')
      }
    }
    setLoading(false)
  }, [isPublicRoute])

  useEffect(() => {
    const supabase = createClient();
    const { data: { subscription } } = supabase.auth.onAuthStateChange(handleAuthStateChange)

    return () => {
      subscription.unsubscribe()
    }
  }, [handleAuthStateChange]);

  useEffect(() => {
    const checkUser = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      setLoading(false)

      if (user && isPublicRoute && pathname !== '/') {
        navigate('/dashboard')
      } else if (!user && !isPublicRoute) {
        navigate('/sign-in')
      }
    }

    checkUser()
  }, [isPublicRoute, pathname])

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
